<template>
  <BaseDialog :title="t('email.confirmation')" hide-confirm-button v-bind="$attrs">
    <div class="flex-center column gap-6 text-center">
      <q-icon v-if="success || isResendSuccess" name="check_circle" size="48px" color="green-6" />
      <q-icon v-else name="error" size="48px" color="orange-6" />

      <div v-if="success">{{ t('email.confirmSuccess') }}</div>
      <div v-else-if="isResendSuccess">
        {{ t('email.confirmResend') }}
        <div>{{ currentUserEmail }}</div>
      </div>

      <template v-else>
        <div>
          {{ t('email.confirmError') }}
        </div>
        <BaseButton :label="t('email.resend')" :loading="loading.active.value" @click="resend" />
      </template>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'src/store';
import userRepository from 'src/repositories/userRepository';
import useLoading from 'src/composables/common/useLoading';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'CommonDialogConfirmEmail',

  props: {
    success: Boolean,
  },

  setup() {
    const { t } = useI18n();
    const store = useStore();
    const loading = useLoading();
    const currentUserEmail = computed(() => store.state.user.currentUser?.email);

    const isResendSuccess = ref(false);
    async function resend() {
      loading.start();
      await userRepository.resendEmailConfirmation();
      isResendSuccess.value = true;
      loading.stop();
    }
    return {
      t,
      loading,
      currentUserEmail,
      isResendSuccess,
      resend,
    };
  },
});
</script>
