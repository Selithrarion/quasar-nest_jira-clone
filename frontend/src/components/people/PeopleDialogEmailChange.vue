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
    <div v-if="step === 1" class="q-mb-md">
      <p>
        Введите в поле ваш новый адрес электронной почты. После этого введите код из пиьсма, которое придёт в течение
        пяти минут на указанный адрес
      </p>
      <p>Ваш текущий адрес - {{ userEmail }}</p>
    </div>

    <q-input
      v-if="step === 1"
      v-model="form.email"
      label="Новый адрес электронной почты"
      debounce="500"
      :rules="[rules.required, rules.email, rules.uniqueEmail, notOldEmail]"
      lazy-rules
      filled
    />
    <q-input
      v-if="step === 2"
      v-model="form.code"
      label="Код"
      :hint="`Код указан в письме, отправленный на адрес ${form.email}`"
      filled
      @keyup="validateCodeEnter"
    />
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';

import { useStore } from 'src/store';
import useLoading from 'src/composables/common/useLoading';
import useFormValidation from 'src/composables/form/useFormValidation';
import useInputValidation from 'src/composables/form/useInputValidation';

import userRepository from 'src/repositories/userRepository';

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
        if (userID.value) await userRepository.sendEmailChange(userID.value);
        step.value = 2;
      } finally {
        loading.stop();
      }
    }

    async function validateCode() {
      try {
        loading.start();
        if (userID.value) await userRepository.validateEmailChangeCode(userID.value, form.code);
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

    function notOldEmail(v: string) {
      return v !== userEmail.value || 'Это ваш текущий адрес';
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

      notOldEmail,
    };
  },
});
</script>
