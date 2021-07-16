<template>
  <q-page>
    <header class="relative-position" @click="isHeaderMenu = !isHeaderMenu">
      <div class="header-hover select-none flex-center column gap-1 text-white relative-position">
        <q-icon name="image" size="2rem" />
        Update your header image

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div v-show="isHeaderMenu" class="header-menu bg-white rounded-md" @click.stop="isHeaderMenu = false">
            <q-list class="text-grey-7" padding dense>
              <q-item clickable>
                <q-item-section>
                  <q-file
                    v-model="headerImage"
                    class="header-file-input"
                    label="Загрузить изображение"
                    borderless
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item clickable @click="deleteHeaderImage">
                <q-item-section> Удалить изображение </q-item-section>
              </q-item>
            </q-list>
          </div>
        </transition>
      </div>
    </header>

    <div class="row big-side-padding q-col-gutter-lg q-my-lg">
      <div class="col-4 column gap-4">
        <h6 class="no-margin">Test</h6>
        <div class="row items-center gap-3">
          <q-icon class="text-blue-grey-3" name="visibility" size="sm" />
          <div class="text-body2 text-blue-grey-4">Открытая команда</div>
        </div>

        <div class="row gap-2">
          <q-btn class="btn--secondary" label="Добавить людей" unelevated no-caps />
          <BaseButtonMore class="btn--secondary" padding="6px" :round="false" :flat="false" unelevated>
            <q-menu anchor="bottom middle" self="top middle" auto-close dense>
              <q-list>
                <q-item clickable>
                  <q-item-section> Удалить команду </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </BaseButtonMore>
        </div>

        <q-card>
          <q-card-section>
            <div>Участники</div>
            <div>1 человек</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row gap-2">
            <q-avatar size="24px">
              <img
                src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
                alt="User Avatar"
              />
            </q-avatar>
            Jira User
          </q-card-section>
        </q-card>
      </div>

      <div class="col-8">
        <h6 class="q-mt-none text-body1 q-mb-md">В работе</h6>
        <q-card class="row flex-2 q-py-md">
          <q-card-section class="q-pl-xl col-3">
            <img
              src="https://jira-frontend-static.prod.public.atl-paas.net/assets/WorkListEmpty.4f661661cc7870531cec33801ddb8b45.8.svg"
              alt="Charts"
              style="max-width: 144px; max-height: 144px"
            />
          </q-card-section>
          <q-card-section class="col-9">
            <h6 class="text-weight-regular q-my-md">Здесь ничего нет</h6>
            <p>
              Здесь показаны все объекты, которые команда создала, изменила или прокомментировала за последние 90 дней.
            </p>
          </q-card-section>
        </q-card>

        <div class="flex-center-between">
          <h6 class="text-body1 q-mb-md">Ссылки</h6>

          <q-btn icon="add" padding="4px" flat>
            <BaseTooltip> Добавить ссылку </BaseTooltip>
          </q-btn>
        </div>
        <q-card>
          <q-card-section class="text-center q-py-xl">
            <img
              src="https://jira-frontend-static.prod.public.atl-paas.net/assets/TeamLinksEmpty.2852332cbdde6085fba107f14676c7a6.8.svg"
              alt="Building"
              style="height: 240px"
            />
          </q-card-section>

          <q-card-section class="column gap-2">
            <div>Расскажите, удобно ли вам пользоваться функциями профилей и поиска внутри этого каталога.</div>
            <div class="text-center">
              <q-btn class="btn--secondary" label="Отправить отзыв по Atlassian" unelevated no-caps />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import BaseTooltip from 'components/base/BaseTooltip.vue';
import BaseButtonMore from 'components/base/button/BaseButtonMore.vue';

export default defineComponent({
  name: 'PeopleTeam',

  components: {
    BaseButtonMore,
    BaseTooltip,
  },

  setup() {
    const isHeaderMenu = ref(false);
    const headerImage = ref(null);
    function deleteHeaderImage() {
      return;
    }

    return {
      isHeaderMenu,
      headerImage,
      deleteHeaderImage,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  height: 200px;
  background: linear-gradient(90deg, rgba(255, 154, 144, 1) 0%, rgba(255, 246, 235, 1) 100%);
  box-shadow: 0 0 4px 0 rgba(15, 68, 109, 0.18) inset;
  cursor: pointer;
  .header-hover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: rgba(23, 76, 112, 0.56);
    transition: background 1000ms ease, opacity 300ms ease;
    &:hover {
      opacity: 1;
    }
  }
  .header-menu {
    position: absolute;
    top: 170px;
    box-shadow: $shadow-15;
  }
  .header-file-input {
    height: 32px;
  }
}
</style>
