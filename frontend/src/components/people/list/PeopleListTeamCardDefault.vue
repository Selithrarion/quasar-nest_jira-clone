<template>
  <PeopleListCard :clickable="false">
    <CommonAvatarsWrapper class="q-pa-md bg-grey-3" style="height: 80px">
      <BaseAvatar v-for="avatar in 3" :key="avatar" color="blue-grey-3" size="36px" show-icon />
    </CommonAvatarsWrapper>

    <q-card-section class="column items-center q-px-sm q-pt-sm q-pb-md">
      <div class="q-py-sm">Ваша новая команда!</div>
      <BaseButton label="Создайте новую команду" secondary-stryle unelevated dense @click="$emit('create-new')" />
    </q-card-section>
  </PeopleListCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommonAvatarsWrapper from 'components/common/CommonAvatarsWrapper.vue';
import PeopleListCard from 'components/people/list/PeopleListCard.vue';

export default defineComponent({
  name: 'PeopleListTeamCardDefault',

  components: {
    CommonAvatarsWrapper,
    PeopleListCard,
  },

  emits: ['create-new'],
});
</script>
