<template>
  <BaseButton icon="notifications" :tooltip="t('notifications.notifications')" unelevated dense round>
    <q-menu style="height: calc(100vh - 100px)" auto-close>
      <q-list class="layout-notifications">
        <div class="column sticky-position bg-white">
          <div class="flex-center-between gap-2 q-pa-md">
            <h5 class="q-ma-none full-width">
              {{ t('notifications.notifications') }}
            </h5>
            <q-toggle
              v-model="isShowOnlyUnread"
              class="flex-shrink-0"
              checked-icon="check"
              unchecked-icon="clear"
              color="green"
              :label="t('notifications.showUnread')"
              left-label
            />
          </div>
          <q-separator />
        </div>

        <BaseLoader v-if="loading.active.value" center />

        <div v-else-if="!filteredNotifications.length" class="layout-notifications__empty">
          <div class="layout-notifications__empty-image" />
          <div v-if="isShowOnlyUnread">
            {{ t('notifications.noUnreadLast30Days') }}
          </div>
          <div v-else>
            {{ t('notifications.noLast30Days') }}
          </div>
        </div>

        <template v-else>
          <div v-show="canReadAll" class="flex-center-end q-my-sm q-ml-sm q-mr-lg">
            <BaseButton class="text-weight-medium text-caption" plain-style @click="readAll">
              {{ t('notifications.markAllRead') }}
            </BaseButton>
          </div>
          <BaseItem v-for="item in filteredNotifications" :key="item.id">
            <q-item-section>
              <q-item-label>
                {{ item.typeID }}
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
                <BaseTooltip
                  delay="0"
                  :label="item.read ? t('notifications.markUnread') : t('notifications.markRead')"
                />
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
import BaseButton from 'components/base/button/BaseButton.vue';

export default defineComponent({
  name: 'LayoutNotifications',
  components: { BaseButton },
  setup() {
    const { t } = useI18n();
    const { formatDate } = useFormat();
    const loading = useLoading({ default: true });

    const notifications = ref<NotificationModel[]>([]);
    const filteredNotifications = computed(() => {
      if (isShowOnlyUnread.value) return notifications.value.filter((n) => !n.read);
      else return notifications.value;
    });
    const isShowOnlyUnread = ref(false);

    onBeforeMount(async () => {
      notifications.value = await notificationRepository.getAll();
      loading.stop();
    });

    async function readNotification(id: number) {
      const itemIndex = notifications.value.findIndex((n) => n.id === id);
      if (notifications.value[itemIndex].read === true) return;

      notifications.value[itemIndex].read = false;
      await notificationRepository.readByID(id);
    }
    async function toggleNotificationRead(id: number) {
      const itemIndex = notifications.value.findIndex((n) => n.id === id);
      notifications.value[itemIndex].read = !notifications.value[itemIndex].read;
      await notificationRepository.toggleRead(id);
    }

    const canReadAll = computed(() => notifications.value.some((n) => !n.read));
    async function readAll() {
      notifications.value.forEach((n) => (n.read = true));
      await notificationRepository.readAll();
    }

    return {
      t,
      loading,
      formatDate,
      DateTypes,

      filteredNotifications,
      isShowOnlyUnread,

      readNotification,
      toggleNotificationRead,

      canReadAll,
      readAll,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-notifications {
  position: relative;
  width: 540px;
  height: calc(100vh - 100px);

  &__unread-marker {
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
