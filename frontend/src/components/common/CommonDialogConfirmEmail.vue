<template>
  <BaseDialog title="Подтверждение Email" hide-confirm-button v-bind="$attrs">
    <div class="flex-center column gap-6 text-center">
      <q-icon v-if="success || isResendSuccess" name="check_circle" size="48px" color="green-6" />
      <q-icon v-else name="error" size="48px" color="orange-6" />

      <div v-if="success">Вы успешно подтвердили свой Email</div>
      <div v-else-if="isResendSuccess">
        Письмо было отправлено повторно на вашу почту
        <div>{{ currentUserEmail }}</div>
      </div>

      <template v-else>
        <div>
          Что-то пошло не так и Email не был подтверждён. Возможно ссылка подтверждения истекла или Email уже
          подтверждён
        </div>
        <BaseButton label="Отправить ещё раз" :loading="loading.active.value" @click="resend" />
      </template>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'src/store';
import userRepository from 'src/repositories/userRepository';
import useLoading from 'src/composables/common/useLoading';

export default defineComponent({
  name: 'CommonDialogConfirmEmail',

  props: {
    success: Boolean,
  },

  setup() {
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
      loading,
      currentUserEmail,
      isResendSuccess,
      resend,
    };
  },
});
</script>
