<template>
  <q-page class="column flex-center gap-6 q-pa-lg" style="background: linear-gradient(to left, #f6f6fb, #f1f6ff)">
    <h6 class="no-margin">{{ authTypes[type].title }}</h6>

    <q-form class="row items-center full-width" @submit="authTypes[type].action">
      <q-card class="col-xs-12 col-sm-8 col-md-4 col-lg-3 shadow-10">
        <q-card-section v-if="loading.active.value">
          <BaseLoader class="q-my-xl" />
        </q-card-section>

        <div v-else>
          <div v-show="step === AuthStepEnum.AUTH">
            <q-card-section class="column gap-3">
              <q-input
                v-if="authTypes[type].fields.includes('name')"
                v-model="form.name"
                label="Отображаемое имя"
                :rules="[rules.required, rules.max64]"
                hide-bottom-space
                lazy-rules
                filled
              />
              <q-input
                v-if="authTypes[type].fields.includes('username')"
                v-model="form.username"
                label="Имя пользователя"
                debounce="500"
                :rules="[rules.required, rules.max24, type === 'register' ? rules.uniqueUsername : null]"
                hide-bottom-space
                lazy-rules
                filled
              />
              <q-input
                v-if="authTypes[type].fields.includes('email')"
                v-model="form.email"
                label="Email"
                debounce="500"
                :rules="[rules.required, rules.email, type === 'register' ? rules.uniqueEmail : null]"
                hide-bottom-space
                lazy-rules
                filled
              />

              <q-input
                v-if="authTypes[type].fields.includes('password')"
                v-model="form.password"
                label="Пароль"
                :type="isHidePassword ? 'password' : 'text'"
                :rules="[rules.required]"
                hide-bottom-space
                lazy-rules
                filled
              >
                <template #append>
                  <q-icon
                    :name="isHidePassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isHidePassword = !isHidePassword"
                  />
                </template>
              </q-input>
              <q-input
                v-if="authTypes[type].fields.includes('passwordRepeat')"
                v-model="form.passwordRepeat"
                label="Подтвердите пароль"
                :type="isHidePassword ? 'password' : 'text'"
                :rules="[rules.required, equalPasswords]"
                hide-bottom-space
                filled
              >
                <template #append>
                  <q-icon
                    :name="isHidePassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isHidePassword = !isHidePassword"
                  />
                </template>
              </q-input>
            </q-card-section>

            <q-card-section>
              <BaseButton
                class="full-width"
                type="submit"
                :label="authTypes[type].actionWord"
                :loading="loading.active.value"
              />
              <div v-if="type === 'login'" class="flex-center gap-2 q-mt-sm">
                <BaseButton label="Google" @click="signInWithGoogle" />
                <BaseButton label="Github" @click="signInWithGithub" />
              </div>
            </q-card-section>
          </div>

          <q-card-section v-show="step === AuthStepEnum.QR_CODE">
            <div class="column gap-2">
              <div v-if="qrCode" class="text-blue-grey-7">
                <div class="q-pb-lg">
                  Сканируйте QR-код с помощью приложения Google Authenticator и введите код в поле ниже
                </div>
                <div class="text-center">
                  <img class="auth__qrcode" :src="qrCode" />
                </div>
              </div>

              <q-input
                ref="twoFaCodeInput"
                v-model="twoFaCode"
                label="Код"
                mask="### ###"
                :error="is2FaError"
                :hint="qrCode ? undefined : 'Введите код из приложения Google Authenticator'"
                :loading="loading.custom.twoFaValidation"
                hide-bottom-space
                unmasked-value
                autofocus
                outlined
                @update:model-value="handleCodeInputUpdate"
                @paste.prevent
              >
                <template #error> Неверный код, попробуйте снова </template>
              </q-input>
            </div>
            <div class="flex-center-end gap-2 q-pt-md">
              <BaseButton label="Пропустить" secondary-color flat @click="redirectToRequestedOrDefaultPage" />
              <BaseButton label="Назад" secondary-color flat @click="returnToAuthStep" />
            </div>
          </q-card-section>
        </div>
      </q-card>

      <div v-show="step === AuthStepEnum.AUTH" class="column flex-center text-blue-grey-5">
        или
        <BaseButton
          v-if="authTypes[type].buttons.includes('register')"
          label="Зарегистрироваться"
          size="small"
          flat
          @click="type = AuthTypeEnum.REGISTER"
        />
        <BaseButton
          v-if="authTypes[type].buttons.includes('forgotPassword')"
          label="Восстановить пароль"
          size="small"
          flat
          @click="type = AuthTypeEnum.FORGOT_PASSWORD"
        />
        <BaseButton
          v-if="authTypes[type].buttons.includes('login')"
          label="Войти"
          size="small"
          flat
          @click="type = AuthTypeEnum.LOGIN"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, inject } from 'vue';

import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { useRouter, useRoute } from 'vue-router';
import useLoading from 'src/composables/common/useLoading';
import useFormValidation from 'src/composables/form/useFormValidation';

import authRepository from 'src/repositories/authRepository';
import { UserAuthResponse } from 'src/models/user/user.model';

enum AuthTypeEnum {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgotPassword',
}
enum AuthStepEnum {
  AUTH = 'auth',
  QR_CODE = 'qrCode',
}

export default defineComponent({
  name: 'AuthPage',

  setup() {
    const q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const loading = useLoading({ customNames: ['twoFaValidation'] });
    const rules = useFormValidation();

    onMounted(async () => {
      if (route.query.redirect)
        q.notify({
          message: 'You need to auth again to access this page',
        });
      if (route.query.code) await signInWithGithubSuccess(String(route.query.code));
    });

    const type = ref<AuthTypeEnum>(AuthTypeEnum.LOGIN);
    const authTypes = {
      login: {
        fields: ['email', 'password'],
        buttons: ['register', 'forgotPassword'],
        title: 'Войти в аккаунт Jira',
        actionWord: 'Войти',
        action: login,
      },
      register: {
        fields: ['name', 'username', 'email', 'password', 'passwordRepeat'],
        buttons: ['login'],
        title: 'Создать новый аккаунт Jira',
        actionWord: 'Зарегистрироваться',
        action: register,
      },
      forgotPassword: {
        fields: ['email'],
        buttons: ['login'],
        title: 'Восстановить пароль от аккаунта Jira',
        actionWord: 'Отправить Email',
        action: sendForgotPasswordEmail,
      },
    };

    function equalPasswords(): boolean | string {
      return form.passwordRepeat === form.password || 'Пароли не совпадают';
    }

    const isHidePassword = ref(true);
    const form = reactive({
      name: '',
      username: '',
      email: 'TEST@TEST.TEST',
      password: 'TEST',
      passwordRepeat: '',
    });

    const step = ref<AuthStepEnum>(AuthStepEnum.AUTH);

    const is2FaEnabled = ref(false);
    async function login() {
      try {
        loading.start();
        const payload = { email: form.email, password: form.password };
        const authResponse = (await store.dispatch('user/login', payload)) as UserAuthResponse;
        is2FaEnabled.value = !authResponse.user;

        if (is2FaEnabled.value) step.value = AuthStepEnum.QR_CODE;
        else await redirectToRequestedOrDefaultPage();
      } finally {
        loading.stop();
      }
    }

    async function register() {
      try {
        loading.start();
        const payload = { name: form.name, username: form.username, email: form.email, password: form.password };
        await store.dispatch('user/register', payload);
        step.value = AuthStepEnum.QR_CODE;
        await generateQrCode();
      } finally {
        loading.stop();
      }
    }

    const twoFaCodeInput = ref<HTMLInputElement | null>(null);
    const qrCode = ref('');
    const twoFaCode = ref('');
    const is2FaError = ref(false);
    async function generateQrCode() {
      try {
        loading.start();
        qrCode.value = await authRepository.generateQrCode();
      } finally {
        loading.stop();
      }
    }
    async function handleCodeInputUpdate(v: string) {
      if (v.length >= 6) await validate2FaCode();
    }
    async function validate2FaCode() {
      twoFaCodeInput.value?.blur();
      try {
        loading.start('twoFaValidation');

        let isValid;
        if (is2FaEnabled.value) isValid = await authRepository.validate2FaCode(twoFaCode.value);
        else isValid = await authRepository.enable2FA(twoFaCode.value);

        if (isValid) await redirectToRequestedOrDefaultPage();
      } catch (e) {
        twoFaCodeInput.value?.focus();
        is2FaError.value = true;
      } finally {
        loading.stop('twoFaValidation');
      }
    }
    function returnToAuthStep() {
      step.value = AuthStepEnum.AUTH;
      twoFaCode.value = '';
    }

    async function sendForgotPasswordEmail() {
      try {
        loading.start();
        await authRepository.forgotPassword(form.email);
      } finally {
        loading.stop();
      }
    }

    async function redirectToRequestedOrDefaultPage() {
      const url = (route.query.redirect as string) || '/projects';
      await router.replace(url);
    }

    interface GoogleAuth {
      isInit: boolean;
      isAuthorized: boolean;
      instance: GoogleAuthInstance;
    }
    interface GoogleAuthInstance {
      signIn: () => Promise<GoogleUser>;
      signOut: () => unknown;
      currentUser: GoogleUser;
    }
    interface GoogleUser {
      get: () => GoogleUserGet;
      getBasicProfile: () => unknown;
      getAuthResponse: () => GoogleAuthResponse;
    }
    interface GoogleUserGet {
      getAuthResponse: () => GoogleAuthResponse;
    }
    interface GoogleAuthResponse {
      access_token: string;
    }
    const Vue3GoogleOauth = inject('Vue3GoogleOauth') as GoogleAuth;

    async function signInWithGoogle() {
      try {
        loading.start();

        const googleUser = await Vue3GoogleOauth.instance.signIn();
        if (!googleUser) return null;
        const accessToken = googleUser.getAuthResponse()?.access_token;
        await store.dispatch('user/authWithGoogle', accessToken);

        step.value = AuthStepEnum.QR_CODE;
        await generateQrCode();
      } finally {
        loading.stop();
      }
    }
    function signInWithGithub() {
      const githubAuthURL = 'https://github.com/login/oauth/authorize';
      const clientID = 'client_id=2324855ba47fac3248e4';
      const redirectURL = 'redirect_uri=http://localhost:8080/auth';
      const scope = 'scope=read:user%20user:email';

      window.open(`${githubAuthURL}?${clientID}&${redirectURL}&${scope}`, '_parent');
    }
    async function signInWithGithubSuccess(code: string) {
      try {
        loading.start();
        await store.dispatch('user/authWithGithub', code);

        step.value = AuthStepEnum.QR_CODE;
        await generateQrCode();
      } finally {
        loading.stop();
      }
    }

    return {
      rules,
      loading,

      type,
      authTypes,
      AuthTypeEnum,

      isHidePassword,
      form,

      equalPasswords,

      step,
      AuthStepEnum,
      redirectToRequestedOrDefaultPage,

      login,

      register,
      twoFaCodeInput,
      qrCode,
      twoFaCode,
      is2FaError,
      generateQrCode,
      handleCodeInputUpdate,
      returnToAuthStep,

      sendForgotPasswordEmail,

      signInWithGoogle,
      signInWithGithub,
    };
  },
});
</script>

<style lang="scss" scoped>
.auth {
  &__qrcode {
    width: 200px;
    height: 200px;
    border: 1px solid $grey-5;
  }
}
</style>
