<template>
  <q-page class="people-page big-side-padding">
    <div class="column gap-4 q-mt-lg">
      <div class="flex justify-end gap-2">
        <BaseButton
          label="Создайте новую команду"
          secondary-color
          unelevated
          @click="toggleCreateTeamDialog"
        />
        <BaseButton label="Добавить людей" color="primary" unelevated />
      </div>

      <CommonSearch v-model="searchValue" placeholder="Поиск людей и команд" :outlined="false" filled append-icon />
    </div>

    <h6 class="text-body1">Вы работаете с</h6>
    <div class="people-wrapper">
      <q-card class="shadow-1 hover-shadow-lg">
        <q-card-section class="column items-center q-px-lg q-pb-lg q-pt-md">
          <q-avatar size="72px">
            <img
              src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
              alt="User Avatar"
            />
          </q-avatar>
          <div class="q-pt-sm">Jira user</div>
          <div class="text-caption text-grey-7">User Job</div>
        </q-card-section>
      </q-card>
    </div>

    <h6 class="text-body1">Ваши команды</h6>
    <div class="teams-wrapper">
      <q-card class="shadow-1 hover-shadow-lg">
        <CommonAvatarsWrapper class="q-pa-md bg-grey-3">
          <q-avatar v-for="avatar of 3" :key="avatar" size="36px">
            <img
              src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
              alt="User Avatar"
            />
          </q-avatar>
        </CommonAvatarsWrapper>

        <q-card-section class="column items-center q-px-sm q-pt-sm q-pb-md">
          <div class="q-py-sm">Ваша новая команда!</div>
          <BaseButton
            label="Создайте новую команду"
            secondary-stryle
            unelevated
            dense
            @click="toggleCreateTeamDialog"
          />
        </q-card-section>
      </q-card>
    </div>

    <PeopleCreateTeamDialog v-if="isCreateTeamDialog" @close="toggleCreateTeamDialog" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import CommonAvatarsWrapper from 'components/common/CommonAvatarsWrapper.vue';
import CommonSearch from 'components/common/CommonSearch.vue';
import PeopleCreateTeamDialog from 'components/people/PeopleCreateTeamDialog.vue';

export default defineComponent({
  name: 'People',

  components: {
    CommonAvatarsWrapper,
    CommonSearch,
    PeopleCreateTeamDialog,
  },

  setup() {
    const searchValue = ref('');

    const isCreateTeamDialog = ref(false);
    function toggleCreateTeamDialog() {
      isCreateTeamDialog.value = !isCreateTeamDialog.value;
    }

    return {
      searchValue,

      isCreateTeamDialog,
      toggleCreateTeamDialog,
    };
  },
});
</script>

<style lang="scss" scoped>
.people-page {
  .people-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
    > div {
      height: 180px;
    }
  }
  .teams-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 8px;
  }
}
</style>
