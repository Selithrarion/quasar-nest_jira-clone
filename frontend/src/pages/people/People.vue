<template>
  <q-page class="people-page big-side-padding q-pb-xl">
    <div class="column gap-4 q-mt-lg">
      <div class="flex justify-end gap-2">
        <BaseButton label="Создайте новую команду" secondary-color unelevated @click="dialog.open('createTeam')" />
        <BaseButton label="Добавить людей" color="primary" unelevated />
      </div>

      <CommonSearch v-model="searchValue" placeholder="Поиск людей и команд" :outlined="false" filled append-icon />
    </div>

    <h6 class="text-body1">Вы работаете с</h6>
    <div class="people-wrapper">
      <q-card
        v-for="user in availableUsers"
        :key="user.id"
        class="shadow-1 hover-shadow-lg cursor-pointer"
        @click="openUserProfile(user.id)"
      >
        <q-card-section class="column items-center q-px-sm q-pb-lg q-pt-md ellipsis">
          <BaseAvatar
            size="72px"
            :src="user.avatar && user.avatar.url"
            :item-name="user.username"
            :item-color="user.color"
          />
          <div class="ellipsis full-width text-center q-pt-sm">{{ user.name }}</div>
          <div v-if="user.position" class="text-caption text-grey-7 full-width">{{ user.position }}</div>
        </q-card-section>
      </q-card>
    </div>

    <h6 class="text-body1">Ваши команды</h6>
    <div class="teams-wrapper">
      <q-card class="shadow-1 hover-shadow-lg">
        <CommonAvatarsWrapper class="q-pa-md bg-grey-3">
          <BaseAvatar v-for="avatar of 3" :key="avatar" color="blue-grey-3" size="36px" show-icon />
        </CommonAvatarsWrapper>

        <q-card-section class="column items-center q-px-sm q-pt-sm q-pb-md">
          <div class="q-py-sm">Ваша новая команда!</div>
          <BaseButton
            label="Создайте новую команду"
            secondary-stryle
            unelevated
            dense
            @click="dialog.open('createTeam')"
          />
        </q-card-section>
      </q-card>
    </div>

    <PeopleDialogTeamCreate v-if="dialog.openedName.value === 'createTeam'" @close="dialog.close" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import CommonAvatarsWrapper from 'components/common/CommonAvatarsWrapper.vue';
import CommonSearch from 'components/common/CommonSearch.vue';
import PeopleDialogTeamCreate from 'components/people/PeopleDialogTeamCreate.vue';

export default defineComponent({
  name: 'People',

  components: {
    CommonAvatarsWrapper,
    CommonSearch,
    PeopleDialogTeamCreate,
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const dialog = useDialog();

    const searchValue = ref('');

    const currentUser = computed(() => store.state.user.currentUser);
    const availableUsers = computed(() => [currentUser.value]);

    async function openUserProfile(userID: number) {
      await router.push(`/people/${userID}`);
    }

    return {
      dialog,

      searchValue,

      currentUser,
      availableUsers,

      openUserProfile,
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
