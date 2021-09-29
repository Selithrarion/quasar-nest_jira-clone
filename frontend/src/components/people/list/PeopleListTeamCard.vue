<template>
  <PeopleListCard>
    <q-img v-if="team.header" :src="team.header.url" height="80px" alt="Header image">
      <template #loading>
        <BaseLoader color="white" thickness="0.18" center />
      </template>
    </q-img>
    <div
      v-else
      :style="{
        background: `linear-gradient(90deg, ${team.color} 0%, #f5f5f5 100%)`,
        height: '80px',
      }"
    />

    <q-card-section class="column items-center q-px-sm q-pt-sm q-pb-md">
      <div class="q-py-sm">{{ team.name }}</div>
      <CommonAvatarsWrapper margin="small">
        <BaseAvatar
          v-for="user of team.users"
          :key="user.id"
          :src="user.avatar && user.avatar.url"
          :item-color="user.color"
          size="28px"
          show-icon
        />
      </CommonAvatarsWrapper>
    </q-card-section>
  </PeopleListCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import CommonAvatarsWrapper from 'components/common/CommonAvatarsWrapper.vue';
import PeopleListCard from 'components/people/list/PeopleListCard.vue';

import { TeamModel } from 'src/models/user/team.model';

export default defineComponent({
  name: 'PeopleListTeamCard',

  components: {
    CommonAvatarsWrapper,
    PeopleListCard
  },

  props: {
    team: {
      type: Object as PropType<TeamModel>,
      required: true,
    },
  },
});
</script>
