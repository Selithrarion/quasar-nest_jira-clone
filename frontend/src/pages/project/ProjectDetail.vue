<template>
  <BaseLoader v-if="loading.active.value" page-margin />

  <div v-else>
    <LayoutSidebar
      title="Jira project"
      subtitle="Проект по разработке ПО"
      avatar="https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg"
    >
      <q-list class="select-none">
        <BaseItem class="q-pa-sm" @click="dialog.open('selectBoard')">
          <div class="flex-center-between no-wrap full-width">
            <div class="row items-center gap-3">
              <q-icon class="text-blue-grey-6" name="table_view" size="sm" />
              <div>
                <div class="text-weight-medium">{{ selectedBoard.name }}</div>
                <div class="text-caption">Доска</div>
              </div>
            </div>
            <q-icon name="expand_more" size="xs" />
          </div>
        </BaseItem>

        <div v-for="item in sidebarItems" :key="item.label">
          <BaseItem class="items-center q-pa-sm" @click="handleSidebarItemClick(item)">
            <div class="flex-center-between no-wrap full-width">
              <div class="row items-center gap-3">
                <q-icon class="text-blue-grey-6" :name="item.icon" size="sm" />
                <div>{{ item.label }}</div>
              </div>
            </div>
          </BaseItem>

          <q-separator v-if="item.lastInGroup" class="q-my-sm" />
        </div>
      </q-list>

      <template #footer>
        <div class="column gap-1 text-center text-caption">
          <div>Это проект управляемый компанией</div>
          <a
            class="text-blue-grey-8"
            href="https://support.atlassian.com/jira-software-cloud/docs/work-in-jira-software-cloud-agile-projects/"
          >
            Подробнее
          </a>
        </div>
      </template>
    </LayoutSidebar>

    <q-page class="project-detail q-px-xl q-py-lg">
      <q-breadcrumbs class="text-blue-grey-5" active-color="blue-8">
        <q-breadcrumbs-el label="Проекты" to="/projects" />
        <q-breadcrumbs-el :label="project.name" :to="{ name: 'board', params: { id: selectedBoard.id } }" />
        <q-breadcrumbs-el :label="selectedBoard.name" :to="{ name: 'board', params: { id: selectedBoard.id } }" />
      </q-breadcrumbs>

      <div class="flex-center-between gap-6">
        <h5 class="q-mt-sm q-mb-lg text-weight-bold">{{ pageName }}</h5>

        <div class="row gap-4">
          <BaseButton icon="bolt" padding="4px" tooltip="Автоматизация" disable flat />

          <BaseButtonFavorite
            padding="4px"
            tooltip-add="Пометить доску"
            :favorite="selectedBoard.favorite"
            :round="false"
            @click="toggleSelectedBoardFavorite"
          />

          <q-btn-dropdown class="btn--secondary" label="Выпуск" :menu-offset="[0, 8]" no-caps flat>
            <q-list v-close-popup dense padding>
              <BaseItem label="Новая версия" />
            </q-list>
          </q-btn-dropdown>

          <BaseButton icon="share" padding="4px" tooltip="Поделиться" flat>
            <q-menu class="q-px-lg q-py-md column gap-3" style="width: 350px" :offset="[0, 8]">
              <div class="text-subtitle1 text-weight-medium">Поделиться</div>

              <q-input label="Введите имя, команду или адрес эл. почты" filled dense />
              <q-input label="Введите сообщение" filled dense />

              <div class="flex-center-between gap-2">
                <CommonClipboard text="123">
                  <BaseButton padding="4px" flat>
                    <q-icon name="link" size="20px" />
                    <span>Копировать ссылку</span>
                  </BaseButton>
                </CommonClipboard>

                <BaseButton v-close-popup label="Отправить" color="primary" unelevated />
              </div>
            </q-menu>
          </BaseButton>
        </div>
      </div>

      <div class="row gap-4 q-pb-lg">
        <CommonSearch v-model="search" client-search append-icon />

        <CommonAvatarsWrapper margin="small" hover-effects>
          <q-avatar v-for="user in project.users" :key="user.id" size="36px" @click="toggleUserSelection(user)">
            <img :src="user.avatarURL || require('src/assets/img/default-avatar-1.png')" :alt="`${user.name} Avatar`" />
            <BaseTooltip> {{ user.name }} </BaseTooltip>
          </q-avatar>
          <q-avatar class="bg-blue-grey-1" size="36px">
            <q-icon name="person" size="20px" />
            <BaseTooltip> Не назначено </BaseTooltip>
          </q-avatar>
        </CommonAvatarsWrapper>

        <BaseButton label="Только мои задачи" secondary-color unelevated />
        <BaseButton label="Последние обновления" secondary-color unelevated />

        <q-separator v-if="selectedUsersFilter.length" vertical />
        <BaseButton v-if="selectedUsersFilter.length" label="Очистить всё" dense flat />
      </div>

      <router-view :project="project" :selected-board-id="selectedBoard.id" />
    </q-page>

    <ProjectBoardDialogSelect
      v-if="dialog.openedName.value === 'selectBoard'"
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
        await selectBoard(board);
      }
    }

    async function selectBoard(board: BoardModel) {
      store.commit('project/SET_BOARD_DETAIL', board);
      storage.save(board.id, 'selectedBoardID');
      await openBoardByID(board.id);
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
        label: 'Дорожная карта',
        icon: 'view_day',
        routeName: 'roadmap',
      },
      {
        label: 'Доска задач',
        icon: 'view_week',
        routeName: 'board',
        action: openSelectedBoard,
      },
      {
        label: 'Отчёты',
        icon: 'show_chart',
        dialog: true,
        lastInGroup: true,
      },
      {
        label: 'Задачи',
        icon: 'splitscreen',
        dialog: true,
      },
      {
        label: 'Компоненты',
        icon: 'call_to_action',
        dialog: true,
      },
      {
        label: 'Код',
        icon: 'code',
        dialog: true,
      },
      {
        label: 'Развёртывания',
        icon: 'cloud_upload',
        dialog: true,
      },
      {
        label: 'Релизы',
        icon: 'sailing',
        dialog: true,
      },
      {
        label: 'Страницы проекта',
        icon: 'article',
        dialog: true,
      },
      {
        label: 'Учёт времени',
        icon: 'schedule',
        dialog: true,
      },
      {
        label: 'Настройки проекта',
        icon: 'settings',
        dialog: true,
      },
    ];
    async function handleSidebarItemClick(item: SidebarItemModel) {
      if (item.routeName) await router.push({ name: item.routeName });
      else if (item.dialog) dialog.open(item.icon);
      else if (item.action) item.action();
    }

    const search = ref('');
    const pageName = computed(() => route.meta.name);

    const selectedUsersFilter = reactive([]);
    function toggleUserSelection(userID: number) {
      console.log(userID);
    }

    return {
      dialog,
      loading,

      project,
      availableProjects,
      selectedBoard,
      selectBoard,
      toggleSelectedBoardFavorite,

      sidebarItems,
      handleSidebarItemClick,

      search,
      pageName,
      selectedUsersFilter,
      toggleUserSelection,
    };
  },
});
</script>
