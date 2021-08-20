<template>
  <BaseDialog
    title="Изменить электронную почту"
    :confirm-text="computedConfirmText"
    :loading="loading.active.value"
    :show-back-button="step > 1"
    :hide-close-button="step > 1"
    @back="step--"
    @confirm="handleConfirm"
  >
    <div class="column gap-2">
      <div v-if="step === 1" class="q-mb-md">
        <p>
          Введите в поле ваш новый адрес электронной почты. После этого введите код из пиьсма, которое придёт в течение
          пяти минут на указанный адрес
        </p>
        <p>Ваш текущий адрес - {{ userEmail }}</p>
      </div>

      <q-form v-model="valid">
        <q-input
          v-if="step === 1"
          v-model="form.email"
          label="Новый адрес электронной почты"
          lazy-rules
          filled
          :rules="[rules.required, rules.email]"
        />
        <q-input
          v-if="step === 2"
          v-model="form.code"
          label="Код"
          :hint="`Код указан в письме, отправленный на адрес ${form.email}`"
          filled
          @keyup="validateCodeEnter"
        />
      </q-form>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';

import { useStore } from 'src/store';
import useLoading from 'src/composables/common/useLoading';
import useFormValidation from 'src/composables/form/useFormValidation';
import useInputValidation from 'src/composables/form/useInputValidation';

import userService from 'src/service/userService';

export default defineComponent({
  name: 'PeopleDialogEmailChange',

  setup() {
    const store = useStore();
    const loading = useLoading();
    const rules = useFormValidation();
    const { getIsNumberKey } = useInputValidation();

    const userID = computed(() => store.state.user.currentUser?.id);
    const userEmail = computed(() => store.state.user.currentUser?.email);
    const computedConfirmText = computed(() => {
      if (step.value === 1) return 'Отправить код';
      else return 'Проверить код';
    });
    async function handleConfirm() {
      if (step.value === 1) await sendEmail();
      else await validateCode();
    }

    const step = ref(1);
    const valid = ref(false);
    const form = reactive({
      email: '',
      code: '',
    });

    async function sendEmail() {
      if (!valid.value) return;

      try {
        loading.start();
        if (userID.value) await userService.sendEmailChange(userID.value);
        step.value = 2;
      } finally {
        loading.stop();
      }
    }

    async function validateCode() {
      try {
        loading.start();
        if (userID.value) await userService.validateEmailChangeCode(userID.value, form.code);
        step.value = 2;
      } finally {
        loading.stop();
      }
    }
    async function validateCodeEnter($event: KeyboardEvent) {
      const isNumber = getIsNumberKey($event);
      if (!isNumber) $event.preventDefault();

      const notSend = ['Backspace', 'Delete'];
      if (notSend.includes($event.key)) return;

      const target = $event.target as HTMLInputElement;
      const isNeededCodeLength = target.value?.length === 6;
      if (isNeededCodeLength) {
        target.blur();
        await validateCode();
      }
    }

    return {
      rules,
      loading,

      userEmail,
      computedConfirmText,

      step,
      valid,
      form,
      handleConfirm,
      validateCodeEnter,
    };
  },
});
</script>
