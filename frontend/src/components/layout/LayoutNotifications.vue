<template>
  <BaseButton icon="notifications" :tooltip="t('notification.notifications')" unelevated dense round>
    <q-menu style="height: calc(100vh - 100px)" auto-close>
      <q-list class="layout-notifications">
        <div class="column sticky-position bg-white">
          <div class="flex-center-between gap-2 q-pa-md">
            <h5 class="q-ma-none full-width">
              {{ t('notification.notifications') }}
            </h5>
            <q-toggle
              v-model="isShowOnlyUnread"
              class="flex-shrink-0"
              checked-icon="check"
              unchecked-icon="clear"
              color="green"
              :label="t('notification.showUnread')"
              left-label
            />
          </div>
          <q-separator />
        </div>

        <BaseLoader v-if="loading.active.value" center />

        <div v-else-if="!filteredNotifications.length" class="layout-notifications__empty">
          <div class="layout-notifications__empty-image" />
          <div v-if="isShowOnlyUnread">
            {{ t('notification.noUnreadLast30Days') }}
          </div>
          <div v-else>
            {{ t('notification.noLast30Days') }}
          </div>
        </div>

        <template v-else>
          <div class="layout-notifications__section-header flex-center-between q-py-sm q-pl-md q-px-lg">
            <CommonListTitle class="text-weight-medium" :title="t('date.today')" />
            <BaseButton v-show="canReadAll" class="text-weight-medium text-caption" plain-style @click="readAll">
              {{ t('notification.markAllRead') }}
            </BaseButton>
          </div>
          <BaseItem v-for="item in filteredNotifications" :key="item.id" @click="handleItemClick(item)">
            <q-item-section>
              <q-item-label class="row gap-3">
                {{ getNotificationTitleByType(item.type) }}
                <span class="text-blue-grey-5">
                  {{ formatDate(item.createdAt, DateTypes.DIFF) }}
                </span>
              </q-item-label>
            </q-item-section>
            <div>
              <BaseButton
                padding="12px"
                icon="circle"
                size="6px"
                :color="item.read ? 'blue-grey-3' : 'primary'"
                round
                flat
                @click.stop="toggleNotificationRead(item.id)"
              >
                <BaseTooltip delay="0" :label="item.read ? t('notification.markUnread') : t('notification.markRead')" />
              </BaseButton>
            </div>
          </BaseItem>
        </template>
      </q-list>
    </q-menu>
  </BaseButton>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFormat, DateTypes } from 'src/composables/format/useFormat';
import useLoading from 'src/composables/common/useLoading';

import notificationRepository from 'src/repositories/notificationRepository';
import { NotificationModel } from 'src/models/user/notification.model';

import CommonListTitle from 'components/common/CommonListTitle.vue';

export default defineComponent({
  name: 'LayoutNotifications',

  components: {
    CommonListTitle,
  },

  setup() {
    const { t } = useI18n();
    const { formatDate } = useFormat();
    const loading = useLoading({ default: true });

    const notifications = ref<NotificationModel[]>([]);
    onBeforeMount(async () => {
      notifications.value = await notificationRepository.getAll();
      loading.stop();
    });

    function getNotificationTitleByType(type: string) {
      return t(`notification.typeTitles.${type}`);
    }

    const filteredNotifications = computed(() => {
      if (isShowOnlyUnread.value) return notifications.value.filter((n) => !n.read);
      else return notifications.value;
    });
    const isShowOnlyUnread = ref(false);

    async function readNotification(id: number) {
      const itemIndex = notifications.value.findIndex((n) => n.id === id);
      if (notifications.value[itemIndex].read === true) return;

      notifications.value[itemIndex].read = false;
      await notificationRepository.update(id, { read: true });
    }
    async function toggleNotificationRead(id: number) {
      const itemIndex = notifications.value.findIndex((n) => n.id === id);
      notifications.value[itemIndex].read = !notifications.value[itemIndex].read;
      await notificationRepository.update(id, { read: notifications.value[itemIndex].read });
    }

    const canReadAll = computed(() => notifications.value.some((n) => !n.read));
    async function readAll() {
      notifications.value.forEach((n) => (n.read = true));
      await notificationRepository.readAll();
    }

    function handleItemClick(item: NotificationModel) {
      console.log(item);
    }

    return {
      t,
      loading,
      formatDate,
      DateTypes,

      getNotificationTitleByType,
      filteredNotifications,
      isShowOnlyUnread,

      readNotification,
      toggleNotificationRead,

      canReadAll,
      readAll,

      handleItemClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-notifications {
  position: relative;
  width: 540px;
  height: calc(100vh - 100px);

  &__section-header {
    position: sticky;
    top: 73px;
    background-color: white;
    z-index: 1;
  }

  &__empty {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 16px;
    padding-top: 16px;
  }
  &__empty-image {
    background: url('src/assets/svg/empty-list.svg') center no-repeat;
    background-size: 100%;
    width: 198px;
    height: 240px;
  }
}
</style>
