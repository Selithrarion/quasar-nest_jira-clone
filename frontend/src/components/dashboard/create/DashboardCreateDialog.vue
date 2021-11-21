<template>
  <BaseDialog title="Dashboard creation" :actions="false" medium @close="close">
    <DashboardCreateForm :loading="loading.active.value" @close="close" @submit.prevent="createDashboard" />
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import useLoading from 'src/composables/common/useLoading';

import DashboardCreateForm from 'components/dashboard/create/DashboardCreateForm.vue';
import { DashboardDTO } from 'src/models/dashboard/dashboard.model';

export default defineComponent({
  name: 'DashboardCreateDialog',

  components: { DashboardCreateForm },

  emits: ['close'],

  setup(props, { emit }) {
    const router = useRouter();
    const loading = useLoading();

    async function createDashboard(payload: DashboardDTO) {
      try {
        loading.start();
        console.log(payload)
        // const dashboard: DashboardInterface = await new Promise((res) => {
        //   setTimeout(() => {
        //     res({});
        //   }, 1000);
        // });
        await openCreatedDashboard(123123123);
      } finally {
        loading.stop();
      }
    }
    async function openCreatedDashboard(dashboardID: number) {
      await router.push(`/dashboards/${dashboardID}`);
    }
    function close() {
      emit('close');
    }

    return { createDashboard, loading, close };
  },
});
</script>
