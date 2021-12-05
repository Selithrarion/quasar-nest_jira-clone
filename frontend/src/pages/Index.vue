<template>
  <q-page class="work-page">
    <CommonPageTitle :title="t('work.title')" />

    <BaseLoader v-if="!availableProjects" page-margin />
    <div v-else class="q-px-xl q-py-md bg-grey-1">
      <WorkProjectHeader />

      <WorkProjectList v-if="availableProjects.length">
        <WorkProjectCard v-for="project in availableProjects" :key="project.id" :project="project" />
      </WorkProjectList>
      <div v-else class="row items-center gap-4">
        {{ t('work.noProjects') }}
        <BaseButton :label="t('common.create')" color="primary" @click="openAllProjects" />
      </div>
    </div>

    <CommonDialogConfirmEmail
      :model-value="dialog.openedName.value === 'confirmEmail'"
      :content-loading="dialog.loading.value"
      :success="isEmailConfirmSuccess"
      @close="dialog.close"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { useI18n } from 'vue-i18n';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import CommonPageTitle from 'components/common/CommonPageTitle.vue';
import CommonDialogConfirmEmail from 'components/common/CommonDialogConfirmEmail.vue';
import WorkProjectHeader from 'components/work/WorkProjectHeader.vue';
import WorkProjectList from 'components/work/WorkProjectList.vue';
import WorkProjectCard from 'components/work/WorkProjectCard.vue';

import userRepository from 'src/repositories/userRepository';

export default defineComponent({
  name: 'WorkIndex',

  components: {
    CommonPageTitle,
    CommonDialogConfirmEmail,
    WorkProjectHeader,
    WorkProjectList,
    WorkProjectCard,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const { t } = useI18n();
    const dialog = useDialog();
    const loading = useLoading();

    const availableProjects = computed(() => store.state.project.projects);
    async function openAllProjects() {
      return await router.push({ path: '/projects', query: { instantCreate: 1 } });
    }

    onBeforeMount(async () => {
      if (!availableProjects.value) await store.dispatch('project/getAll');
      await tryConfirmEmail();
    });

    const isEmailConfirmSuccess = ref(false);
    async function tryConfirmEmail() {
      const isEmailConfirmed = store.state.user.currentUser?.isEmailConfirmed;
      if (!route.query.token || isEmailConfirmed) return;

      try {
        dialog.open('confirmEmail');
        dialog.startLoading();
        await userRepository.confirmEmail(String(route.query.token));
        isEmailConfirmSuccess.value = true;
      } finally {
        dialog.stopLoading();
      }
    }

    return {
      dialog,
      loading,
      t,

      availableProjects,
      openAllProjects,

      isEmailConfirmSuccess,
    };
  },
});
</script>
