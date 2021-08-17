<template>
  <BaseLoader v-if="loading.active.value" page-margin />

  <div v-else class="people-detail">
    <q-page>
      <header class="relative-position" @click="isHeaderMenu = !isHeaderMenu">
        <div class="header-hover select-none flex-center column gap-1 text-white relative-position">
          <q-icon name="image" size="2rem" />
          Update your header image

          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-show="isHeaderMenu" class="header-menu bg-white rounded-md" @click.stop="isHeaderMenu = false">
              <q-list class="text-grey-7" padding dense>
                <BaseItem>
                  <q-item-section style="margin-top: -8px">
                    <q-file
                      v-model="headerImage"
                      class="header-file-input"
                      label="Загрузить изображение"
                      borderless
                      dense
                    />
                  </q-item-section>
                </BaseItem>
                <BaseItem label="Удалить изображение" @click="deleteHeaderImage" />
              </q-list>
            </div>
          </transition>
        </div>
      </header>

      <div class="row big-side-padding q-col-gutter-lg q-my-lg">
        <PeopleDetailSideUser v-if="isUserPageType" :user="currentUser" />
        <PeopleDetailSideTeam v-else :team="currentTeam" />

        <div class="col-8">
          <h6 class="q-mt-none text-body1 text-weight-medium q-mb-md">В работе</h6>
          <q-card class="row flex-2 q-py-md">
            <q-card-section class="q-pl-xl col-3">
              <img
                src="https://jira-frontend-static.prod.public.atl-paas.net/assets/WorkListEmpty.4f661661cc7870531cec33801ddb8b45.8.svg"
                alt="Charts"
                style="max-width: 144px; max-height: 144px"
              />
            </q-card-section>
            <q-card-section class="col-9">
              <h6 class="text-weight-regular q-my-md">Здесь ничего нет</h6>
              <p>
                Здесь показаны все объекты, которые команда создала, изменила или прокомментировала за последние 90
                дней.
              </p>
            </q-card-section>
          </q-card>

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
        </div>
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

export default defineComponent({
  name: 'PeopleTeam',

  components: {
    PeopleDetailSideUser,
    PeopleDetailSideTeam,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const loading = useLoading({ default: true });

    const isUserPageType = computed(() => {
      return !route.path.includes('team');
    });
    const currentUserID = computed(() => Number(route.params.userID));
    const currentTeamID = computed(() => Number(route.params.teamID));
    const currentUser = computed(() => store.state.people.userDetail);
    const currentTeam = computed(() => store.state.people.teamDetail);
    const availableProjects = computed(() => store.state.project.projects);

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

    watch(currentUserID, async () => {
      loading.start();
      await fetchItemDetail();
      loading.stop();
    });

    const isHeaderMenu = ref(false);
    const headerImage = ref(null);
    function deleteHeaderImage() {
      return;
    }

    return {
      loading,

      isUserPageType,
      currentUser,
      currentTeam,
      availableProjects,

      isHeaderMenu,
      headerImage,
      deleteHeaderImage,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  height: 200px;
  background: linear-gradient(90deg, rgb(144, 218, 255) 0%, rgb(235, 250, 255) 100%);
  box-shadow: 0 0 4px 0 rgba(15, 68, 109, 0.18) inset;
  cursor: pointer;
  .header-hover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: rgba(23, 76, 112, 0.56);
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
</style>
