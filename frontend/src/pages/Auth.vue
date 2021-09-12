<template>
  <q-page class="column flex-center gap-6 q-pa-lg" style="background: #f6f6fb">
    <h6 class="no-margin">{{ authTypes[type].title }}</h6>

    <q-form class="row items-center full-width" @submit="authTypes[type].action">
      <q-card class="col-xs-12 col-sm-8 col-md-4 col-lg-3 shadow-10">
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
            :rules="[rules.required, rules.max24, uniqueUsername]"
            hide-bottom-space
            lazy-rules
            filled
          />
          <q-input
            v-if="authTypes[type].fields.includes('email')"
            v-model="form.email"
            label="Email"
            debounce="500"
            :rules="[rules.required, rules.email, uniqueEmail]"
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
        </q-card-section>
      </q-card>
      <div class="column flex-center text-blue-grey-5">
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
import { defineComponent, ref, reactive, onMounted } from 'vue';

import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { useRouter, useRoute } from 'vue-router';
import useLoading from 'src/composables/common/useLoading';
import useFormValidation from 'src/composables/form/useFormValidation';

import userRepository from 'src/repositories/userRepository';

enum AuthTypeEnum {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgotPassword',
}
// TODO: add OAuth with github or google
// TODO: add two-factor auth (?)
export default defineComponent({
  name: 'AuthPage',

  setup() {
    const q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const loading = useLoading();
    const rules = useFormValidation();

    onMounted(() => {
      if (route.query.redirect)
        q.notify({
          message: 'You need to auth again to access this page',
        });
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
    async function uniqueUsername(): Promise<boolean | string> {
      const isTaken = await userRepository.isUsernameTaken(form.username);
      return !isTaken || 'Имя пользователя уже занято';
    }
    async function uniqueEmail(): Promise<boolean | string> {
      const isTaken = await userRepository.isEmailTaken(form.email);
      return !isTaken || 'Такой email уже зарегистрирован';
    }

    const isHidePassword = ref(true);
    const form = reactive({
      name: '',
      username: '',
      email: 'TEST@TEST.TEST',
      password: 'TEST',
      passwordRepeat: '',
    });

    async function login() {
      try {
        loading.start();
        const payload = { email: form.email, password: form.password };
        await store.dispatch('user/login', payload);
        await redirectToRequestedOrDefaultPage();
      } catch (e) {
        // TODO: snackbar
        console.error(e);
      } finally {
        loading.stop();
      }
    }
    async function register() {
      try {
        loading.start();
        const payload = { name: form.name, username: form.username, email: form.email, password: form.password };
        await store.dispatch('user/register', payload);
        await redirectToRequestedOrDefaultPage();
      } catch (e) {
        // TODO: snackbar
        console.error(e);
      } finally {
        loading.stop();
      }
    }
    async function sendForgotPasswordEmail() {
      try {
        loading.start();
        await userRepository.forgotPassword(form.email);
      } finally {
        loading.stop();
      }
    }

    async function redirectToRequestedOrDefaultPage() {
      const url = (route.query.redirect as string) || '/projects';
      await router.replace(url);
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
      uniqueUsername,
      uniqueEmail,

      login,
      register,
      sendForgotPasswordEmail,
    };
  },
});
</script>
