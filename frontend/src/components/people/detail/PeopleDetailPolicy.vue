<template>
  <q-card-section>
    <BaseButton
      label="Ознакомиться с политикой конфиденциальности"
      to="https://www.atlassian.com/legal/privacy-policy"
      class="text-blue-grey-6 text-caption full-width"
      plain-style
    />
  </q-card-section>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PeopleDetailPolicy',
  });
</script>
