<template>
  <PeopleDetailSide
    button-label="Управлять учётной записью"
    :display-name="user.name"
    :name="user.username"
    @button-click="openAccountSettingsPage"
    @update:name="updateUserInfo('username', $event)"
    @update:display-name="updateUserInfo('name', $event)"
  >
    <template #append>
      <q-card>
        <q-card-section class="column gap-2">
          <CommonListTitle title="сведения" />
          <q-input
            v-model="form.position"
            label="Ваша должность"
            outlined
            dense
            @blur="updateUserInfo('position', form.position)"
            @keydown.enter="$event.target.blur()"
          >
            <BaseTooltip label="Название должности можно изменить" />
          </q-input>
          <q-input
            v-model="form.department"
            label="Ваш отдел"
            outlined
            dense
            @blur="updateUserInfo('department', form.department)"
            @keydown.enter="$event.target.blur()"
          >
            <BaseTooltip label="Название отдела можно изменить" />
          </q-input>
          <q-input
            v-model="form.organisation"
            label="Ваша организация"
            outlined
            dense
            @blur="updateUserInfo('organisation', form.organisation)"
            @keydown.enter="$event.target.blur()"
          >
            <BaseTooltip label="Название организации можно изменить" />
          </q-input>
          <q-input
            v-model="form.location"
            label="Ваше местоположение"
            outlined
            dense
            @blur="updateUserInfo('location', form.location)"
            @keydown.enter="$event.target.blur()"
          >
            <BaseTooltip label="Данные о местоположении можно изменить" />
          </q-input>
        </q-card-section>

        <q-card-section class="column gap-2">
          <CommonListTitle title="контактные данные" />
          <BaseItem @click="dialog.open('changeEmail')">
            <q-item-section side>
              <q-icon name="mail_outline" size="24px" color="blue-grey-3" />
            </q-item-section>
            <q-item-section> {{ user.email }} </q-item-section>
            <q-item-section side>
              <q-icon name="edit" size="20px" color="blue-grey-3" />
            </q-item-section>
          </BaseItem>
        </q-card-section>

        <q-card-section class="column gap-2">
          <CommonListTitle title="команды" />
          <BaseItem v-for="team in availableUserTeams" :key="team.id" @click="handleTeamClick(team.id)">
            <q-item-section side>
              <q-avatar :color="team.color" text-color="white" size="24px">
                <q-icon name="person" size="16px" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ team.name }}</q-item-label>
              <q-item-label v-if="team.users" caption> {{ team.users.length }} участник </q-item-label>
            </q-item-section>
          </BaseItem>
        </q-card-section>

        <q-card-section>
          <BaseButton
            label="Ознакомиться с политикой конфиденциальности"
            to="https://www.atlassian.com/legal/privacy-policy"
            class="text-blue-grey-6 text-caption full-width"
            plain-style
          />
        </q-card-section>
      </q-card>

      <PeopleDialogEmailChange v-if="dialog.openedName.value === 'changeEmail'" @close="dialog.close" />
      <PeopleDialogTeamCreate v-if="dialog.openedName.value === 'createTeam'" @close="dialog.close" />
    </template>
  </PeopleDetailSide>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import CommonListTitle from 'components/common/CommonListTitle.vue';
import PeopleDetailSide from 'components/people/detail/PeopleDetailSide.vue';
import PeopleDialogEmailChange from 'components/people/PeopleDialogEmailChange.vue';
import PeopleDialogTeamCreate from 'components/people/PeopleDialogTeamCreate.vue';

import { UserModel } from 'src/models/user/user.model';

export default defineComponent({
  name: 'PeopleDetailSideTeam',

  components: {
    CommonListTitle,
    PeopleDetailSide,
    PeopleDialogEmailChange,
    PeopleDialogTeamCreate,
  },

  props: {
    user: {
      type: Object as PropType<UserModel>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const store = useStore();
    const dialog = useDialog();

    function addPeople() {
      //
    }
    async function openAccountSettingsPage() {
      await router.push('/');
    }

    const createNewTeamItem = ref({
      id: 0,
      color: 'grey-4',
      name: 'Создайте новую команду',
    });
    const availableUserTeams = computed(() => [createNewTeamItem.value]);
    function handleTeamClick(teamID: number) {
      if (!teamID) dialog.open('createTeam');
      else {
        console.log(teamID);
      }
    }

    const form = reactive({
      position: props.user.position,
      department: props.user.department,
      organisation: props.user.organisation,
      location: props.user.location,
    });
    async function updateUserInfo<T>(field: string, value: T) {
      const id = props.user.id;
      const payload = {
        [field]: value,
      };

      await store.dispatch('people/updateUser', { id, payload });
    }

    return {
      dialog,

      addPeople,
      openAccountSettingsPage,

      availableUserTeams,
      handleTeamClick,

      form,
      updateUserInfo,
    };
  },
});
</script>
