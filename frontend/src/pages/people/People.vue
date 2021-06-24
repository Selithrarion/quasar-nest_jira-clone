<template>
  <q-page class="people-page big-side-padding">
    <div class="column gap-4 q-mt-lg">
      <div class="flex justify-end gap-2">
        <q-btn
          label="Создайте новую команду"
          color="grey-2"
          text-color="blue-grey-7"
          unelevated
          no-caps
          @click="toggleCreateTeamDialog"
        />
        <q-btn label="Добавить людей" color="primary" unelevated no-caps />
      </div>

      <CommonSearch placeholder="Поиск людей и команд" :value="searchValue" :outlined="false" filled append-icon />
    </div>

    <h6 class="text-default">Вы работаете с</h6>
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

    <h6 class="text-default">Ваши команды</h6>
    <div class="teams-wrapper">
      <q-card class="shadow-1 hover-shadow-lg">
        <q-card-section class="avatars-wrapper flex-center bg-grey-3">
          <q-avatar size="36px">
            <img
              src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
              alt="User Avatar"
            />
          </q-avatar>
          <q-avatar size="36px">
            <img
              src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
              alt="User Avatar"
            />
          </q-avatar>
          <q-avatar size="36px">
            <img
              src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
              alt="User Avatar"
            />
          </q-avatar>
        </q-card-section>

        <q-card-section class="column items-center q-px-sm q-pt-sm q-pb-md">
          <div class="q-py-sm">Ваша новая команда!</div>
          <q-btn
            label="Создайте новую команду"
            color="grey-2"
            text-color="blue-grey-7"
            unelevated
            dense
            no-caps
            no-wrap
            @click="toggleCreateTeamDialog"
          />
        </q-card-section>
      </q-card>
    </div>

    <PeopleCreateTeamDialog :show="isCreateTeamDialog" @close="toggleCreateTeamDialog" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CommonSearch from 'components/common/CommonSearch.vue';
import PeopleCreateTeamDialog from 'components/people/PeopleCreateTeamDialog.vue';

export default defineComponent({
  name: 'People',

  components: {
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
  .avatars-wrapper {
    > div {
      margin: 0 -8px;
      border: 2px solid white;
    }
    :first-child {
      z-index: 3;
    }
    :nth-child(2) {
      z-index: 2;
    }
    :last-child {
      z-index: 1;
    }
  }
}
</style>
