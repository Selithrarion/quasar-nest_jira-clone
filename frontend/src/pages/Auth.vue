<template>
  <q-page class="column flex-center gap-6 q-pa-lg bg-blue-grey-1">
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
            :rules="[rules.required, rules.email]"
            hide-bottom-space
            lazy-rules
            filled
          />
          <q-input
            v-if="authTypes[type].fields.includes('password')"
            v-model="form.password"
            label="Пароль"
            :rules="[rules.required]"
            hide-bottom-space
            lazy-rules
            filled
          />
          <q-input
            v-if="authTypes[type].fields.includes('passwordRepeat')"
            v-model="form.passwordRepeat"
            label="Подтвердите пароль"
            :rules="[rules.required, equalPasswords]"
            hide-bottom-space
            filled
          />
        </q-card-section>

        <q-card-section>
          <q-btn class="full-width" type="submit" :label="authTypes[type].actionWord" :loading="loading.active.value" />
        </q-card-section>
      </q-card>
      <div class="column flex-center text-blue-grey-5">
        или
        <q-btn
          v-if="authTypes[type].buttons.includes('register')"
          label="Зарегистрироваться"
          size="small"
          flat
          @click="type = AuthTypeEnum.REGISTER"
        />
        <q-btn
          v-if="authTypes[type].buttons.includes('forgotPassword')"
          label="Восстановить пароль"
          size="small"
          flat
          @click="type = AuthTypeEnum.FORGOT_PASSWORD"
        />
        <q-btn
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

import { useStore } from 'src/store';
import { useRouter, useRoute } from 'vue-router';
import useLoading from 'src/composables/common/useLoading';
import useFormValidation from 'src/composables/common/useFormValidation';

import userService from 'src/service/userService';
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
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const loading = useLoading();
    const rules = useFormValidation();

    onMounted(() => {
      // TODO: show snackbar
      if (route.query.redirect) console.log(route.query.redirect);
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
      const isTaken = await userService.isUsernameTaken(form.username);
      return !isTaken || 'Имя пользователя уже занято';
    }

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
        await userService.forgotPassword(form.email);
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
      form,

      equalPasswords,
      uniqueUsername,

      login,
      register,
      sendForgotPasswordEmail,
    };
  },
});
</script>
