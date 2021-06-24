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

        <q-separator class="q-my-sm" />

        <q-item
          v-for="item in sidebarItems"
          :key="item.label"
          class="items-center q-pa-sm"
          clickable
          @click="handleSidebarItemClick(item)"
        >
          <div class="flex-center-between no-wrap w-full">
            <div class="row items-center gap-3">
              <q-icon class="text-blue-grey-6" :name="item.icon" size="sm" />
              <div>{{ item.label }}</div>
            </div>
          </div>
        </q-item>
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

    <q-page class="project-detail q-px-xl q-py-lg">12321 </q-page>

    <ProjectDetailDialogSelectBoard
      :show="dialog.opened.value === 'selectBoard'"
      :project-name="project.name"
      :boards="project.boards"
      :selected-board="selectedBoard"
      @close="dialog.close"
      @select="selectBoard"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useDialog from 'src/composables/common/useDialog';
import useLocalStorage from 'src/composables/common/useLocalStorage';

import LayoutSidebar from 'components/layout/LayoutSidebar.vue';
import ProjectDetailDialogSelectBoard from 'components/project/detail/ProjectDetailDialogSelectBoard.vue';

import SidebarItemInterface from 'src/models/sidebarItem.interface';
import BoardInterface from 'components/project/models/board.interface';

export default defineComponent({
  name: 'ProjectDetail',

  components: {
    LayoutSidebar,
    ProjectDetailDialogSelectBoard,
  },

  setup() {
    const router = useRouter();
    const dialog = useDialog();
    const storage = useLocalStorage('projectDetail__');

    const sidebarItems: SidebarItemInterface[] = [
      {
        label: 'Дорожная карта',
        icon: 'view_day',
        dialog: true,
      },
      {
        label: 'Доска задач',
        icon: 'view_week',
        dialog: true,
      },
      {
        label: 'Доска задач',
        icon: 'view_week',
        dialog: true,
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
      if (item.url) await router.push(item.url);
      else if (item.dialog) dialog.open(item.icon);
    }

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
        },
        {
          id: 2,
          name: 'Frontend',
        },
        {
          id: 3,
          name: 'Backend',
        },
        {
          id: 4,
          name: 'Testing',
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

    function selectBoard(board: BoardInterface) {
      selectedBoard.value = board;
      storage.save(board.id, 'selectedBoardID');
    }
    function loadSavedBoard() {
      const savedBoard = storage.load('selectedBoardID') as number;
      const defaultBoard = project.boards[0];
      if (savedBoard) {
        const boardObject = project.boards.find((b) => b.id === savedBoard);
        selectedBoard.value = boardObject || defaultBoard;
      }
    }

    onMounted(() => {
      loadSavedBoard();
    });

    return {
      dialog,
      sidebarItems,
      handleSidebarItemClick,

      project,
      selectedBoard,
      selectBoard,
    };
  },
});
</script>

<style lang="sass" scoped></style>
