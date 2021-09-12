<template>
  <q-page class="work-page">
    <CommonPageTitle title="Ваша работа" />

    <BaseLoader v-if="!availableProjects" page-margin />
    <div v-else class="q-px-xl q-py-md bg-grey-1">
      <WorkProjectHeader />

      <WorkProjectList>
        <WorkProjectCard v-for="project in availableProjects" :key="project.id" :project="project" />
      </WorkProjectList>
    </div>

    <CommonDialogConfirmEmail
      v-if="dialog.openedName.value === 'confirmEmail'"
      :content-loading="dialog.loading.value"
      :success="isEmailConfirmSuccess"
      @close="dialog.close"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'src/store';
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
    const route = useRoute();
    const store = useStore();
    const dialog = useDialog();
    const loading = useLoading();

    const availableProjects = computed(() => store.state.project.projects);

    onBeforeMount(async () => {
      if (!availableProjects.value) await store.dispatch('project/getAll');
      await tryConfirmEmail();
    });

    const isEmailConfirmSuccess = ref(false);
    async function tryConfirmEmail() {
      const emailConfirmationToken = String(route.query.token);
      if (emailConfirmationToken) {
        try {
          dialog.open('confirmEmail');
          dialog.startLoading();
          await userRepository.confirmEmail(emailConfirmationToken);
          isEmailConfirmSuccess.value = true;
        } finally {
          dialog.stopLoading();
        }
      }
    }

    return {
      dialog,
      loading,

      availableProjects,
      isEmailConfirmSuccess,
    };
  },
});
</script>
