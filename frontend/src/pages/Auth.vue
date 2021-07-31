<template>
  <q-page class="column flex-center gap-6 q-pa-lg bg-blue-grey-1">
    <h6 class="no-margin">{{ authTypes[type].title }}</h6>

    <q-form class="row items-center full-width" @submit="authTypes[type].action">
      <q-card class="col-xs-12 col-sm-8 col-md-4 col-lg-3 shadow-10">
        <q-card-section class="column gap-3">
          <q-input
            v-if="authTypes[type].fields.includes('name')"
            v-model="form.name"
            label="Имя"
            :rules="[rules.required]"
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
        </q-card-section>

        <q-card-section>
          <q-btn class="full-width" type="submit" :label="authTypes[type].actionWord" />
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
import { defineComponent, ref, reactive } from 'vue';

import useLoading from 'src/composables/common/useLoading';
import useFormValidation from 'src/composables/common/useFormValidation';

import userService from 'src/service/userService';
enum AuthTypeEnum {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgotPassword',
}

export default defineComponent({
  name: 'AuthPage',

  setup() {
    const loading = useLoading();
    const rules = useFormValidation();

    const type = ref<AuthTypeEnum>(AuthTypeEnum.REGISTER);
    const authTypes = {
      login: {
        fields: ['email', 'password'],
        buttons: ['register', 'forgotPassword'],
        title: 'Войти в аккаунт Jira',
        actionWord: 'Войти',
        action: login,
      },
      register: {
        fields: ['name', 'email', 'password'],
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

    const form = reactive({
      name: '',
      email: '',
      password: '',
    });

    async function login() {
      try {
        loading.start();
        const payload = { email: form.email, password: form.password };
        await userService.login(payload);
      } finally {
        loading.stop();
      }
    }
    async function register() {
      try {
        loading.start();
        await userService.register(form);
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

    return {
      rules,

      type,
      authTypes,
      AuthTypeEnum,
      form,

      login,
      register,
      sendForgotPasswordEmail,
    };
  },
});
</script>
