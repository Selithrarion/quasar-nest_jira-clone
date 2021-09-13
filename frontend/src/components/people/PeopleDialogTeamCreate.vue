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

          <BaseSelect
            v-model="form.users"
            :options="availableUsers"
            label="Их отображаемое имя, имя пользователя или email"
            hint="Вы можете пригласить не более 10 пользователей за раз."
            input-debounce="500"
            max-values="10"
            :emit-value="false"
            multiple
            counter
            fill-input
            use-input
            use-chips
            @filter="searchUsers"
          >
            <template #optionLabel="{ option }">
              <q-item-label>{{ option.username }} ({{ option.name }})</q-item-label>
            </template>
          </BaseSelect>
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

import userRepository from 'src/repositories/userRepository';
import { UserModel } from 'src/models/user/user.model';

export default defineComponent({
  name: 'PeopleDialogTeamCreate',

  setup() {
    const router = useRouter();
    const store = useStore();
    const loading = useLoading();
    const rules = useFormValidation();

    const availableUsers = ref<UserModel[]>([]);
    type SelectUpdateFunction = (arg0: () => void) => void;
    async function searchUsers(value: string, update: SelectUpdateFunction) {
      const normalized = value.toLowerCase();
      availableUsers.value = await userRepository.searchUsers(normalized);
      update(() => availableUsers.value.filter((u) => u.username.toLowerCase().includes(normalized)));
    }

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
      searchUsers,

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
