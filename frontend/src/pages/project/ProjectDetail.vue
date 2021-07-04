<template>
  <div>
    <LayoutSidebar
      title="Jira project"
      subtitle="Проект по разработке ПО"
      avatar="https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg"
    >
      <q-list class="select-none">
        <q-item class="q-pa-sm" clickable @click="dialog.open('selectBoard')">
          <div class="flex-center-between no-wrap w-full">
            <div class="row items-center gap-3">
              <q-icon class="text-blue-grey-6" name="table_view" size="sm" />
              <div>
                <div class="text-weight-medium">{{ selectedBoard.name }}</div>
                <div class="text-xs">Доска</div>
              </div>
            </div>
            <q-icon name="expand_more" size="xs" />
          </div>
        </q-item>

        <div v-for="item in sidebarItems" :key="item.label">
          <q-item class="items-center q-pa-sm" clickable @click="handleSidebarItemClick(item)">
            <div class="flex-center-between no-wrap w-full">
              <div class="row items-center gap-3">
                <q-icon class="text-blue-grey-6" :name="item.icon" size="sm" />
                <div>{{ item.label }}</div>
              </div>
            </div>
          </q-item>

          <q-separator v-if="item.lastInGroup" class="q-my-sm" />
        </div>
      </q-list>

      <template #footer>
        <div class="column gap-1 text-center text-xs">
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
          <q-btn icon="bolt" padding="4px" disable flat>
            <BaseTooltip label="Автоматизация" />
          </q-btn>

          <BaseButtonFavorite
            padding="4px"
            :favorite="selectedBoard.favorite"
            :round="false"
            @click="toggleSelectedBoardFavorite"
          />

          <q-btn-dropdown class="btn--secondary" label="Выпуск" :menu-offset="[0, 8]" no-caps flat>
            <q-list v-close-popup dense padding>
              <q-item clickable>
                <q-item-section> Новая версия </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn icon="share" padding="4px" flat>
            <BaseTooltip label="Поделиться" />

            <q-menu class="q-px-lg q-py-md column gap-3" style="width: 350px" :offset="[0, 8]">
              <div class="text-subtitle1 text-weight-medium">Поделиться</div>

              <q-input label="Введите имя, команду или адрес эл. почты" filled dense />
              <q-input label="Введите сообщение" filled dense />

              <div class="flex-center-between gap-2">
                <CommonClipboard text="123">
                  <q-btn padding="4px" no-caps flat>
                    <q-icon name="link" size="20px" />
                    <span>Копировать ссылку</span>
                  </q-btn>
                </CommonClipboard>

                <q-btn v-close-popup label="Отправить" color="primary" unelevated no-caps />
              </div>
            </q-menu>
          </q-btn>
        </div>
      </div>

      <div class="row gap-4 q-pb-lg">
        <CommonSearch v-model="search" client-search append-icon />

        <CommonAvatarsWrapper margin="small" hover-effects>
          <q-avatar v-for="avatar of 4" :key="avatar" size="36px" @click="toggleUserSelection(avatar)">
            <img
              src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
              alt="User Avatar"
            />
            <BaseTooltip> % имя % </BaseTooltip>
          </q-avatar>
          <q-avatar class="bg-blue-grey-1" size="36px">
            <q-icon name="person" size="20px" />
            <BaseTooltip> Не назначено </BaseTooltip>
          </q-avatar>
        </CommonAvatarsWrapper>

        <q-btn class="btn--secondary" label="Только мои задачи" unelevated no-caps />
        <q-btn class="btn--secondary" label="Последние обновления" unelevated no-caps />

        <q-separator v-if="selectedUsersFilter.length" vertical />
        <q-btn v-if="selectedUsersFilter.length" label="Очистить всё" no-caps dense flat />
      </div>

      <router-view />
    </q-page>

    <ProjectBoardDialogSelect
      :show="dialog.openedName.value === 'selectBoard'"
      :project-name="project.name"
      :boards="project.boards"
      :selected-board="selectedBoard"
      @close="dialog.close"
      @select="selectBoard"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useDialog from 'src/composables/common/useDialog';
import useLocalStorage from 'src/composables/common/useLocalStorage';

import LayoutSidebar from 'components/layout/LayoutSidebar.vue';

import BaseTooltip from 'components/base/BaseTooltip.vue';
import BaseButtonFavorite from 'components/base/button/BaseButtonFavorite.vue';
import CommonSearch from 'components/common/CommonSearch.vue';
import CommonAvatarsWrapper from 'components/common/CommonAvatarsWrapper.vue';
import CommonClipboard from 'components/common/CommonClipboard.vue';

import ProjectBoardDialogSelect from 'components/project/board/dialog/ProjectBoardDialogSelect.vue';

import { SidebarItemInterface } from 'src/models/sidebarItem.interface';
import { BoardInterface } from 'components/project/models/board.interface';

export default defineComponent({
  name: 'ProjectDetail',

  components: {
    LayoutSidebar,

    BaseTooltip,
    BaseButtonFavorite,
    CommonSearch,
    CommonAvatarsWrapper,
    CommonClipboard,

    ProjectBoardDialogSelect,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const dialog = useDialog();
    const storage = useLocalStorage('projectDetail__');

    const project = reactive({
      id: 1,
      name: 'Jira project',
      key: 'JP',
      type: 'Software',
      favorite: true,
      boards: [
        {
          id: 1,
          name: 'Full',
          favorite: false,
        },
        {
          id: 2,
          name: 'Frontend',
          favorite: true,
        },
        {
          id: 3,
          name: 'Backend',
          favorite: false,
        },
        {
          id: 4,
          name: 'Testing',
          favorite: false,
        },
      ],
      avatarURLs: {
        x16: 'https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg',
        x24: 'https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg',
        x32: 'https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg',
        x48: 'https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg',
      },
      leader: {
        id: 1,
        name: 'Jira Jira',
        avatarURLs: {
          x16: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
          x24: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
          x32: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
          x48: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
        },
        email: 'jirajiraemail@gmail.com',
        locale: 'ru_RU',
        isActive: true,
      },
    });

    const selectedBoard = ref(project.boards[0]);

    async function selectBoard(board: BoardInterface) {
      selectedBoard.value = board;
      storage.save(board.id, 'selectedBoardID');
      await openBoardByID(board.id);
    }
    function loadSavedBoard() {
      const savedBoard = storage.load('selectedBoardID') as number;
      const defaultBoard = project.boards[0];
      if (savedBoard) {
        const boardObject = project.boards.find((b) => b.id === savedBoard);
        selectedBoard.value = boardObject || defaultBoard;
      }
    }

    async function openBoardByID(boardID: number) {
      await router.push({ name: 'board', params: { id: boardID } });
    }
    async function openSelectedBoard() {
      const boardID = selectedBoard.value.id;
      await openBoardByID(boardID);
    }

    onMounted(() => {
      loadSavedBoard();
    });

    const sidebarItems: SidebarItemInterface[] = [
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
        label: 'Копмпоненты',
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
    async function handleSidebarItemClick(item: SidebarItemInterface) {
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

    function toggleSelectedBoardFavorite() {
      selectedBoard.value.favorite = !selectedBoard.value.favorite;
    }

    return {
      dialog,

      project,
      selectedBoard,
      selectBoard,

      sidebarItems,
      handleSidebarItemClick,

      search,
      pageName,
      selectedUsersFilter,
      toggleUserSelection,
      toggleSelectedBoardFavorite,
    };
  },
});
</script>

<style lang="sass" scoped></style>
