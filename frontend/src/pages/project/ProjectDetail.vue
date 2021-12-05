<template>
  <BaseLoader v-if="loading.active.value" page-margin />

  <div v-else>
    <LayoutSidebar
      :title="project.name"
      :subtitle="t('project.softwareDevProject')"
      :avatar="project.avatar && project.avatar.url"
      :color="project.color"
    >
      <q-list class="select-none">
        <BaseItem class="q-pa-sm" @click="dialog.open('selectBoard')">
          <div class="flex-center-between no-wrap full-width">
            <div class="row items-center gap-3">
              <q-icon class="text-blue-grey-6" name="table_view" size="sm" />
              <div>
                <div class="text-weight-medium">{{ selectedBoard.name }}</div>
                <div class="text-caption">{{ t('project.board') }}</div>
              </div>
            </div>
            <q-icon name="expand_more" size="xs" />
          </div>
        </BaseItem>

        <div v-for="item in sidebarItems" :key="item.label">
          <q-separator v-if="item.separator" class="q-my-sm" />

          <BaseItem v-else class="items-center q-pa-sm" @click="handleSidebarItemClick(item)">
            <div class="flex-center-between no-wrap full-width">
              <div class="row items-center gap-3">
                <q-icon class="text-blue-grey-6" :name="item.icon" size="sm" />
                <div>{{ item.label }}</div>
              </div>
            </div>
          </BaseItem>
        </div>
      </q-list>

      <template #footer>
        <div class="column gap-1 text-center text-caption">
          <div>{{ t('project.companyType') }}</div>
          <a
            class="text-blue-grey-8"
            href="https://support.atlassian.com/jira-software-cloud/docs/work-in-jira-software-cloud-agile-projects/"
          >
            {{ t('common.detail') }}
          </a>
        </div>
      </template>
    </LayoutSidebar>

    <q-page class="project-detail q-px-xl q-py-lg">
      <q-breadcrumbs class="text-blue-grey-5" active-color="blue-8">
        <q-breadcrumbs-el :label="t('project.projects')" to="/projects" />
        <q-breadcrumbs-el :label="project.name" :to="{ name: 'board', params: { id: selectedBoard.id } }" />
        <q-breadcrumbs-el
          v-if="selectedSidebarTab.routeName === 'board'"
          :label="selectedBoard.name"
          :to="{ name: 'board', params: { id: selectedBoard.id } }"
        />
      </q-breadcrumbs>

      <div class="flex-center-between gap-6">
        <h5 class="q-mt-sm q-mb-lg text-weight-bold">{{ pageName }}</h5>

        <div v-if="!selectedSidebarTab.hideHeaderTitleRowActions" class="row gap-4">
          <BaseButton icon="bolt" padding="4px" :tooltip="t('project.automation')" disable flat />

          <BaseButtonFavorite
            padding="4px"
            :tooltip-add="t('project.markBoard')"
            :favorite="selectedBoard.favorite"
            :round="false"
            @click="toggleSelectedBoardFavorite"
          />

          <q-btn-dropdown class="btn--secondary" :label="t('project.release')" :menu-offset="[0, 8]" no-caps flat>
            <q-list v-close-popup dense padding>
              <BaseItem :label="t('project.newVersion')" />
            </q-list>
          </q-btn-dropdown>

          <BaseButton icon="share" padding="4px" :tooltip="t('common.share')" flat>
            <q-menu class="q-px-lg q-py-md column gap-3" style="width: 350px" :offset="[0, 8]">
              <div class="text-subtitle1 text-weight-medium">{{ t('common.share') }}</div>

              <q-input :label="t('project.enterNameTeamOrEmail')" filled dense />
              <q-input :label="t('project.enterMessage')" filled dense />

              <div class="flex-center-between gap-2">
                <CommonClipboard text="123">
                  <BaseButton padding="4px" flat>
                    <q-icon name="link" size="20px" />
                    <span>{{ t('project.copyLink') }}</span>
                  </BaseButton>
                </CommonClipboard>

                <BaseButton v-close-popup :label="t('common.send')" color="primary" unelevated />
              </div>
            </q-menu>
          </BaseButton>
        </div>
      </div>

      <div v-if="!selectedSidebarTab.hideHeaderActions" class="row gap-4 q-pb-lg">
        <CommonSearch v-model="search" client-search append-icon />

        <CommonAvatarsWrapper margin="small" hover-effects>
          <BaseAvatar
            v-for="user in project.users"
            :key="user.id"
            size="36px"
            icon-size="20px"
            :src="user.avatar && user.avatar.url"
            :item-name="user.username"
            :item-color="user.color"
            @click="toggleUserSelection(user)"
          />
          <BaseAvatar size="36px" color="blue-grey-1" :tooltip="t('common.notAssigned')" icon-size="20px" show-icon />
        </CommonAvatarsWrapper>

        <BaseButton :label="t('project.onlyMyTasks')" secondary-color unelevated />
        <BaseButton :label="t('common.lastUpdates')" secondary-color unelevated />

        <q-separator v-if="selectedUsersFilter.length" vertical />
        <BaseButton v-if="selectedUsersFilter.length" :label="t('common.clearAll')" dense flat />
      </div>

      <router-view :key="routePath" :project="project" :selected-board-id="selectedBoard.id" />
    </q-page>

    <ProjectBoardDialogSelect
      :model-value="dialog.openedName.value === 'selectBoard'"
      :project="project"
      :available-projects="availableProjects"
      :boards="project.boards"
      :selected-board="selectedBoard"
      @close="dialog.close"
      @select="selectBoard"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, onBeforeMount, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';
import useLocalStorage from 'src/composables/common/useLocalStorage';
import useLoading from 'src/composables/common/useLoading';

import LayoutSidebar from 'components/layout/LayoutSidebar.vue';

import CommonSearch from 'components/common/CommonSearch.vue';
import CommonAvatarsWrapper from 'components/common/CommonAvatarsWrapper.vue';
import CommonClipboard from 'components/common/CommonClipboard.vue';

import ProjectBoardDialogSelect from 'components/project/board/dialog/ProjectBoardDialogSelect.vue';

import { SidebarItemModel } from 'src/models/common/sidebarItem.model';
import { BoardModel } from 'src/models/project/board.model';

export default defineComponent({
  name: 'ProjectDetail',

  components: {
    LayoutSidebar,

    CommonSearch,
    CommonAvatarsWrapper,
    CommonClipboard,

    ProjectBoardDialogSelect,
  },

  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const dialog = useDialog();
    const storage = useLocalStorage('projectDetail__');
    const loading = useLoading({ default: true });

    const project = computed(() => store.state.project.projectDetail);
    const availableProjects = computed(() => store.state.project.projects);
    const selectedBoard = computed(() => store.state.project.boardDetail);

    const currentProjectID = computed(() => Number(route.params.projectID));
    onBeforeMount(async () => {
      await store.dispatch('project/getByID', currentProjectID.value);
      await loadBoard();
      loading.stop();
    });

    onMounted(async () => {
      if (!availableProjects.value) await store.dispatch('project/getAll');
    });

    watch(currentProjectID, async (value: number) => {
      if (!value) return;
      loading.start();
      await store.dispatch('project/getByID', value);
      loading.stop();
    });

    async function loadBoard() {
      const availableBoards = project.value?.boards;
      if (!availableBoards) return;

      const currentUrlBoardID = Number(route.params.boardID);
      if (currentUrlBoardID) {
        const board = availableBoards.find((b) => b.id === currentUrlBoardID);
        if (board) await selectBoard(board);
      } else {
        const savedBoard = (await storage.load('selectedBoardID')) as number;

        const defaultBoard = availableBoards[0];
        const boardObject = availableBoards.find((b) => b.id === savedBoard);

        const board = boardObject || defaultBoard;

        const isRedirect = route.path.includes('/board') || route.name === 'projectDetail';
        await selectBoard(board, isRedirect);
      }
    }

    async function selectBoard(board: BoardModel, isRedirect = true) {
      store.commit('project/SET_BOARD_DETAIL', board);
      storage.save(board.id, 'selectedBoardID');

      if (isRedirect) await openBoardByID(board.id);
    }
    async function toggleSelectedBoardFavorite() {
      await store.dispatch('project/toggleBoardFavorite', selectedBoard.value?.id);
    }

    async function openBoardByID(boardID: number) {
      await router.replace({ name: 'boardDetail', params: { boardID }, query: { ...route.query } });
    }
    async function openSelectedBoard() {
      const boardID = selectedBoard.value?.id;
      if (boardID) await openBoardByID(boardID);
    }

    const sidebarItems: SidebarItemModel[] = [
      {
        label: 'Roadmap',
        icon: 'view_day',
        routeName: 'roadmap',
      },
      {
        label: 'Board',
        icon: 'view_week',
        routeName: 'board',
        action: openSelectedBoard,
      },
      {
        label: 'Reports',
        icon: 'show_chart',
        dialog: true,
      },
      {
        separator: true,
      },
      {
        label: 'Issues',
        icon: 'splitscreen',
        routeName: 'issues',
        hideHeaderTitleRowActions: true,
        hideHeaderActions: true,
      },
      {
        label: 'Components',
        icon: 'call_to_action',
        dialog: true,
      },
      {
        label: 'Code',
        icon: 'code',
        dialog: true,
      },
      {
        label: 'Cloud upload',
        icon: 'cloud_upload',
        dialog: true,
      },
      {
        label: 'Releases',
        icon: 'sailing',
        dialog: true,
      },
      {
        label: 'Project pages',
        icon: 'article',
        dialog: true,
      },
      {
        label: 'Time tracking',
        icon: 'schedule',
        dialog: true,
      },
      {
        label: 'Project settings',
        icon: 'settings',
        dialog: true,
      },
    ];
    async function handleSidebarItemClick(item: SidebarItemModel) {
      if (item.routeName) await router.push({ name: item.routeName });
      else if (item.dialog && item.icon) dialog.open(item.icon);
      else if (item.action) item.action();
    }
    const selectedSidebarTab = computed(() => {
      let selectedItem = {};
      sidebarItems.forEach((item) => {
        if (item.routeName && route.path.includes(item.routeName)) selectedItem = item;
      });
      return selectedItem;
    });

    const search = ref('');
    const pageName = computed(() => route.meta.name);

    const selectedUsersFilter = reactive([]);
    function toggleUserSelection(userID: number) {
      console.log(userID);
    }

    return {
      t,
      dialog,
      loading,

      project,
      availableProjects,
      selectedBoard,
      selectBoard,
      toggleSelectedBoardFavorite,

      sidebarItems,
      handleSidebarItemClick,
      selectedSidebarTab,
      routePath: route.path,

      search,
      pageName,
      selectedUsersFilter,
      toggleUserSelection,
    };
  },
});
</script>
