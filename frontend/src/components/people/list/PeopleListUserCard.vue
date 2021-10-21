<template>
  <PeopleListCard style="min-height: 180px">
    <q-card-section class="column items-center q-px-sm q-pb-lg q-pt-md ellipsis">
      <BaseAvatar
        size="72px"
        :src="user.avatar && user.avatar.url"
        :item-name="user.username"
        :item-color="user.color"
      />
      <div class="ellipsis full-width text-center q-pt-sm">{{ user.name }}</div>
      <div v-if="user.position" class="text-center text-caption text-grey-7 full-width">{{ user.position }}</div>
    </q-card-section>
  </PeopleListCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PeopleListCard from 'components/people/list/PeopleListCard.vue';
import { UserModel } from 'src/models/user/user.model';

export default defineComponent({
  name: 'PeopleListUserCard',

  components: {
    PeopleListCard,
  },

  props: {
    user: {
      type: Object as PropType<UserModel>,
      required: true,
    },
  },
});
</script>
