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
            v-model="form.team"
            :options="options"
            label="Их имя или @упоминание"
            hint="Вы можете пригласить не более 10 пользователей за раз."
            input-debounce="0"
            hide-selected
            fill-input
            use-input
            use-chips
          />
        </q-form>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import { useRouter } from 'vue-router';
import useFormValidation from 'src/composables/common/useFormValidation';
import useLoading from 'src/composables/common/useLoading';

import BaseDialog from 'components/base/BaseDialog.vue';
import BaseSelect from 'components/base/BaseSelect.vue';

export default defineComponent({
  name: 'PeopleCreateTeamDialog',

  components: {
    BaseDialog,
    BaseSelect,
  },

  setup() {
    const router = useRouter();
    const loading = useLoading();
    const rules = useFormValidation();

    const valid = ref(false);
    const form = reactive({
      name: '',
      team: [],
    });

    async function createTeam() {
      if (!valid.value) {
        return;
      }

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
