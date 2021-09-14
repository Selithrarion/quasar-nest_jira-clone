<template>
  <BaseDialog
    title="Создать новую команду"
    confirm-text="Создать команду"
    :loading="loading.active.value"
    large
    @confirm="createTeam"
  >
    <div class="row q-pl-md">
      <div class="col-4 create-team-background" />
      <div class="col-8 q-pl-lg">
        <p class="q-mb-lg">
          Добавляйте сотрудников в команду и работайте над задачами в одном месте. Отслеживайте @упоминания, чтобы
          оставаться в курсе дел, ведите совместную работу и эффективно управляйте всеми настройками на странице профиля
          команды.
          <a href="https://support.atlassian.com/atlassian-account/docs/what-is-an-atlassian-team/"> Подробнее </a>
        </p>

        <q-form v-model="valid">
          <q-input
            v-model="form.name"
            label="Название команды"
            hint="Как называется ваша команда?"
            lazy-rules
            filled
            :rules="[rules.required, rules.max40]"
          />

          <CommonSelectUsers v-model="form.users" v-model:options="availableUsers" />
        </q-form>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onBeforeMount } from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useFormValidation from 'src/composables/form/useFormValidation';
import useLoading from 'src/composables/common/useLoading';

import CommonSelectUsers from 'components/common/CommonSelectUsers.vue';

import userRepository from 'src/repositories/userRepository';
import { UserModel } from 'src/models/user/user.model';

export default defineComponent({
  name: 'PeopleDialogTeamCreate',

  components: {
    CommonSelectUsers,
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const loading = useLoading();
    const rules = useFormValidation();

    const availableUsers = ref<UserModel[]>([]);
    onBeforeMount(async () => {
      await userRepository.searchUsers();
    });

    const valid = ref(false);
    const form = reactive({
      name: '',
      users: [],
    });

    async function createTeam() {
      if (!valid.value) return;

      try {
        loading.start();
        await openTeam(123);
      } finally {
        loading.stop();
      }
    }
    async function openTeam(teamID: number) {
      await router.push(`people/team/${teamID}`);
    }

    return {
      rules,
      loading,

      availableUsers,

      valid,
      form,
      createTeam,
    };
  },
});
</script>

<style lang="scss" scoped>
.create-team-background {
  background: url('src/assets/svg/create-team.svg') no-repeat center;
}
</style>
