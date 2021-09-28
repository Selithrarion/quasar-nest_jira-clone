<template>
  <BaseLoader v-if="loading.active.value" page-margin />

  <div v-else class="people-detail">
    <q-page>
      <header
        class="people-detail__header"
        :class="{ 'cursor-pointer': canEditDetail }"
        :style="{
          background: `linear-gradient(90deg, ${currentItemDetail.color} 0%, rgb(250, 250, 255) 100%)`,
        }"
        @click="canEditDetail ? (isHeaderMenu = !isHeaderMenu) : null"
      >
        <BaseLoader v-if="loading.custom.header" color="white" thickness="0.18" center />
        <q-img v-if="pageHeaderURL" :src="pageHeaderURL" height="200px" alt="Header image">
          <template #loading>
            <BaseLoader color="white" thickness="0.18" center />
          </template>
        </q-img>

        <div
          v-if="canEditDetail"
          class="header-hover absolute-full select-none flex-center column gap-1 text-white relative-position"
        >
          <q-icon name="image" size="2rem" />
          Update header image

          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-show="isHeaderMenu" class="header-menu bg-white rounded-md" @click.stop="isHeaderMenu = false">
              <q-list class="text-grey-7" padding dense>
                <BaseItem>
                  <q-item-section style="margin-top: -8px">
                    <q-file
                      class="header-file-input"
                      label="Загрузить изображение"
                      borderless
                      dense
                      @update:model-value="uploadHeaderFile"
                    />
                  </q-item-section>
                </BaseItem>
                <BaseItem label="Удалить изображение" @click="deleteHeaderImage" />
              </q-list>
            </div>
          </transition>
        </div>
      </header>

      <div class="people-detail__content q-col-gutter-lg q-my-lg big-side-padding">
        <PeopleDetailSideUser v-if="isUserPageType" :user="currentUser" :can-edit="canEditDetail" />
        <PeopleDetailSideTeam v-else :team="currentTeam" :can-edit="canEditDetail" />

        <main class="flex-grow-2">
          <!--TODO: fix long name-->
          <PeopleDetailActivitySection
            title="Назначенные задачи"
            :items="currentItemDetail.assignedIssues"
            :is-own-profile="isOwnProfile"
            :is-user-profile="isUserPageType"
            show-title-caption
            @item-click="openProjectIssue"
          >
            <template #itemPrepend="{ item }">
              <q-item-section side>
                <ProjectBoardIconIssueType :type="item.typeID" />
              </q-item-section>
            </template>
            <template #itemCaptionName="{ item }">
              {{ getProjectNameByID(item.projectID) }}
            </template>
          </PeopleDetailActivitySection>

          <PeopleDetailActivitySection
            title="Наблюдаемые задачи"
            :items="currentItemDetail.watchingIssues"
            :is-own-profile="isOwnProfile"
            :is-user-profile="isUserPageType"
            show-title-caption
            @item-click="openProjectIssue"
          >
            <template #itemPrepend="{ item }">
              <q-item-section side>
                <ProjectBoardIconIssueType :type="item.typeID" />
              </q-item-section>
            </template>
            <template #itemCaptionName="{ item }">
              {{ getProjectNameByID(item.projectID) }}
            </template>
          </PeopleDetailActivitySection>

          <PeopleDetailActivitySection
            v-if="isUserPageType"
            title="Любимые проекты"
            :items="currentItemDetail.favoriteProjects"
            :is-own-profile="isOwnProfile"
            :is-user-profile="isUserPageType"
            @item-click="openProject"
          >
            <template #itemPrepend="{ item }">
              <q-item-section side>
                <BaseAvatar :src="item.avatar && item.avatar.url" :item-name="item.name" :item-color="item.color" />
              </q-item-section>
            </template>
            <!--TODO: pluralization-->
            <template #itemCaption="{ item }"> {{ item.users.length }} участников </template>
          </PeopleDetailActivitySection>

          <div class="flex-center-between">
            <h6 class="text-body1 text-weight-medium q-mb-md">Ссылки</h6>
            <BaseButton icon="add" tooltip="Добавить ссылку" padding="4px" flat />
          </div>

          <q-card>
            <q-card-section class="text-center q-py-xl">
              <img
                src="https://jira-frontend-static.prod.public.atl-paas.net/assets/TeamLinksEmpty.2852332cbdde6085fba107f14676c7a6.8.svg"
                alt="Building"
                style="height: 240px"
              />
            </q-card-section>

            <q-card-section class="column gap-2">
              <div>Расскажите, удобно ли вам пользоваться функциями профилей и поиска внутри этого каталога.</div>
              <div class="text-center">
                <BaseButton label="Отправить отзыв по Atlassian" secondary-color unelevated />
              </div>
            </q-card-section>
          </q-card>
        </main>
      </div>
    </q-page>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useLoading from 'src/composables/common/useLoading';

import PeopleDetailSideUser from 'components/people/detail/PeopleDetailSideUser.vue';
import PeopleDetailSideTeam from 'components/people/detail/PeopleDetailSideTeam.vue';
import PeopleDetailActivitySection from 'components/people/detail/PeopleDetailActivitySection.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';

import { IssueModel } from 'src/models/project/issue.model';
import { ProjectModel } from 'src/models/project/project.model';

export default defineComponent({
  name: 'PeopleDetail',

  components: {
    PeopleDetailSideUser,
    PeopleDetailSideTeam,
    PeopleDetailActivitySection,
    ProjectBoardIconIssueType,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const loading = useLoading({ default: true });

    const currentUserID = computed(() => Number(route.params.userID));
    const currentTeamID = computed(() => Number(route.params.teamID));
    const currentUser = computed(() => store.state.people.userDetail);
    const currentTeam = computed(() => store.state.people.teamDetail);

    const isUserPageType = computed(() => {
      return !route.path.includes('team');
    });
    const isTeamPageType = computed(() => {
      return !isUserPageType.value;
    });

    const currentItemDetail = computed(() => (isUserPageType.value ? currentUser.value : currentTeam.value));
    const currentItemDetailID = computed(() => (isUserPageType.value ? currentUserID.value : currentTeamID.value));
    const availableProjects = computed(() => store.state.project.projects);

    const currentAccount = computed(() => store.state.user.currentUser);
    const isOwnProfile = computed(() => currentAccount.value?.id === currentUserID.value);
    const isTeamMember = computed(() => currentTeam.value?.users.findIndex((u) => u.id === currentAccount.value?.id));
    const canEditDetail = computed(() => {
      if (isUserPageType.value) return isOwnProfile.value;
      else return isTeamMember.value;
    });

    const pageHeaderURL = computed(() => {
      return currentItemDetail.value?.avatar?.url;
    });

    async function fetchItemDetail() {
      if (isUserPageType.value) await store.dispatch('people/getUserByID', currentUserID.value);
      else await store.dispatch('people/getTeamByID', currentTeamID.value);
    }

    onBeforeMount(async () => {
      await fetchItemDetail();
      loading.stop();
    });

    onMounted(async () => {
      if (!availableProjects.value) await store.dispatch('project/getAll');
    });

    watch(currentItemDetailID, async () => {
      loading.start();
      await fetchItemDetail();
      loading.stop();
    });

    const isHeaderMenu = ref(false);
    const headerImage = ref(null);
    async function uploadHeaderFile(file: File) {
      try {
        loading.start('header');
        if (isUserPageType.value) await store.dispatch('people/uploadUserImage', { file, type: 'header' });
        else await store.dispatch('people/uploadTeamImage', { file, id: currentTeamID.value, type: 'header' });
      } finally {
        loading.stop('header');
      }
    }
    async function deleteHeaderImage() {
      try {
        loading.start('header');
        if (isUserPageType.value) await store.dispatch('people/deleteUserHeader');
        else await store.dispatch('people/deleteTeamHeader', currentTeamID);
      } finally {
        loading.stop('header');
      }
    }

    function getProjectNameByID(projectID: number) {
      return availableProjects.value?.find((p) => p.id === projectID)?.name;
    }
    async function openProjectIssue(issue: IssueModel) {
      await router.push(`/projects/${issue.projectID}/issues/${issue.id}`);
    }
    async function openProject(project: ProjectModel) {
      await router.push(`/projects/${project.id}`);
    }

    return {
      loading,

      currentUser,
      currentTeam,

      availableProjects,

      isUserPageType,
      isTeamPageType,

      currentItemDetail,

      isOwnProfile,
      isTeamMember,
      canEditDetail,

      pageHeaderURL,

      isHeaderMenu,
      headerImage,
      uploadHeaderFile,
      deleteHeaderImage,

      getProjectNameByID,
      openProjectIssue,
      openProject,
    };
  },
});
</script>

<style lang="scss" scoped>
.people-detail {
  &__header {
    position: relative;
    height: 200px;
    box-shadow: 0 0 4px 0 rgba(15, 68, 109, 0.18) inset;
    .header-hover {
      opacity: 0;
      background: rgba(37, 53, 126, 0.4);
      transition: background 1000ms ease, opacity 300ms ease;
      &:hover {
        opacity: 1;
      }
    }
    .header-menu {
      position: absolute;
      top: 170px;
      box-shadow: $shadow-15;
    }
    .header-file-input {
      height: 32px;
    }
  }

  &__content {
    display: flex;
    @media screen and (max-width: $breakpoint-sm-max) {
      flex-flow: column;
    }
  }
}
</style>
