<template>
  <BaseDialog :actions="false" :content-loading="loading.active.value" hide-close-icon large @close="close">
    <template #title>
      <div class="flex-center-between full-width">
        <div class="flex-center gap-1">
          <ProjectBoardIconIssueType :type="issue.typeID" />
          {{ issue.key }}
        </div>

        <div class="row items-center gap-2">
          <q-btn size="small" disable no-caps no-wrap flat>
            <q-icon name="reviews" size="xs" />
            Оставить отзыв
          </q-btn>

          <q-btn size="small" disable no-caps no-wrap flat>
            <q-icon name="visibility" size="xs" />
            <span class="text-subtitle2">{{ issue.watchers.length }}</span>
          </q-btn>

          <q-btn icon="thumb_up" padding="8px" size="sm" disable flat />
          <q-btn icon="share" padding="8px" size="sm" disable flat />
          <q-btn icon="more_horiz" padding="8px" size="sm" disable flat />
          <BaseButtonCloseIcon padding="5px" size="md" :round="false" :dense="false" />
        </div>
      </div>
    </template>

    <template #default>
      <div class="row q-col-gutter-md">
        <div class="column col-7 gap-6 full-height overflow-auto">
          <div class="column gap-2">
            <div>
              <q-input
                ref="nameInput"
                v-model="localIssueName"
                class="text-h6"
                :placeholder="localIssueName ? 'Изменить название' : 'Добавить название'"
                filled
                @blur="updateIssueName"
                @keydown.enter="$event.target.blur()"
              />
              <BaseTooltip :label="localIssueName" />
            </div>

            <div class="row gap-2">
              <q-btn class="btn--secondary" icon="attach_file" padding="4px" unelevated disable />
              <q-btn class="btn--secondary" icon="library_add_check" padding="4px" unelevated disable />
              <q-btn class="btn--secondary" icon="link" padding="4px" unelevated disable />
              <q-btn class="btn--secondary" icon="schedule" padding="4px" unelevated disable />
              <q-btn class="btn--secondary" icon="more_horiz" padding="4px" unelevated disable />
            </div>
          </div>

          <div>
            <div class="text-subtitle2 q-pb-sm">Описание</div>
            <!-- TODO: add editor on focus-->
            <q-input
              ref="descriptionInput"
              v-model="localIssueDescription"
              type="textarea"
              :placeholder="issue.description ? 'Изменить описание' : 'Добавить описание'"
              autogrow
              filled
              dense
              @blur="updateIssueDescription"
              @keydown.enter="$event.target.blur()"
            />
          </div>

          <div>
            <div class="text-subtitle2 q-pb-sm">Активность</div>
            <div class="row gap-3">
              <q-avatar size="32px">
                <img
                  src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
                  alt="User Avatar"
                />
              </q-avatar>
              <q-input
                ref="commentInput"
                v-model="comment"
                class="flex-grow-1"
                placeholder="Добавить комментарий..."
                bottom-slots
                outlined
                autogrow
                dense
              >
                <template #hint>
                  <b>Совет:</b> нажмите
                  <q-chip class="no-margin text-weight-bold" style="font-size: 10px" label="M" size="xs" square dense />
                  , чтобы добавить комментарий
                </template>
              </q-input>
            </div>

            <div class="q-mt-lg">
              <div class="row no-wrap gap-3">
                <q-avatar size="32px">
                  <img
                    src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
                    alt="User Avatar"
                  />
                </q-avatar>
                <div class="column items-center gap-2">
                  <div class="flex-center-between gap-3 full-width">
                    <div class="flex-center gap-2">
                      <span class="text-weight-medium">Sergey Maltsev</span>
                      <span class="text-caption text-blue-grey-6">Изменено</span>
                    </div>

                    <span class="text-caption text-blue-grey-6">4 дня назад</span>
                  </div>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate eaque enim, esse facilis
                    inventore officiis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-5 gap-4 full-height overflow-auto">
          <div>
            <BaseSelect
              v-model="selectedColumn"
              class="q-mb-md w-fit-content"
              :options="availableColumns"
              truncate
              dense
            />

            <div class="item-row">
              <label>Исполнитель</label>
              <q-item clickable dense>
                <q-avatar v-if="issue.assigned" size="24px">
                  <img
                    :src="issue.assigned.avatarURL || require('src/assets/img/default-avatar-1.png')"
                    :alt="`${issue.assigned.name} Avatar`"
                  />
                </q-avatar>
                <q-avatar v-else icon="group" color="blue-grey-6" font-size="16px" text-color="white" size="24px" />

                <span>{{ issue.assigned ? issue.assigned.name : 'Без назначения' }}</span>
                <BaseTooltip label="Изменить исполнителя" />
              </q-item>
            </div>
            <div class="item-row">
              <label>Автор</label>
              <q-item clickable dense>
                <q-avatar size="24px">
                  <img
                    src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
                    alt="User Avatar"
                  />
                </q-avatar>
                <span>{{ issue.author.name }}</span>
                <BaseTooltip label="Изменить автора" />
              </q-item>
            </div>
            <div class="item-row">
              <label>Метки</label>
              <q-item clickable dense>
                <q-chip color="blue-grey-1" label="Frontend" square dense />
                <BaseTooltip label="Добавить метки" />
              </q-item>
            </div>
            <div class="item-row">
              <label>Приоритет</label>
              <q-item clickable dense>
                <ProjectBoardIconIssuePriority :priority="issue.priorityID" />
                <span>{{ formatIssuePriorityName(issue.priorityID) }}</span>
                <BaseTooltip label="Изменить приоритет" />
              </q-item>
            </div>

            <q-separator class="q-my-sm" />

            <div class="text-caption text-blue-grey-5 q-pb-lg">
              <div class="flex-center-between">
                <div :class="{ clickable: false }">
                  Создано 22 июня 2021 г., 12:02
                  <BaseTooltip label="22 июня 2021 г. 12:02" />
                </div>
                <q-btn icon="settings" label="Настроить" size="small" no-wrap no-caps dense flat>
                  <BaseTooltip label="Открыть диалог настроек" />
                </q-btn>
              </div>
              <div :class="{ clickable: false }">Дата обновления 2 часа назад</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
import useLoading from 'src/composables/common/useLoading';

import BaseDialog from 'components/base/BaseDialog.vue';
import BaseSelect from 'components/base/BaseSelect.vue';
import BaseTooltip from 'components/base/BaseTooltip.vue';
import BaseButtonCloseIcon from 'components/base/button/BaseButtonCloseIcon.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';
import ProjectBoardIconIssuePriority from 'components/project/board/icon/ProjectBoardIconIssuePriority.vue';

export default defineComponent({
  name: 'ProjectBoardDialogViewIssue',

  components: {
    BaseDialog,
    BaseSelect,
    BaseTooltip,
    BaseButtonCloseIcon,
    ProjectBoardIconIssueType,
    ProjectBoardIconIssuePriority,
  },

  emits: ['close'],

  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const loading = useLoading();

    onBeforeMount(async () => {
      await fetchIssue();
      setIssueData();
    });
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown);
    });

    const issue = computed(() => store.state.project.issueDetail);

    const localIssueName = ref('');
    const localIssueDescription = ref('');

    const nameInput = ref<HTMLInputElement | null>(null);
    const descriptionInput = ref<HTMLInputElement | null>(null);

    async function updateIssueName() {
      nameInput.value?.blur();
      const payload = {
        id: issue.value?.id,
        payload: { name: localIssueName.value },
      };
      await store.dispatch('project/updateIssue', payload);
    }
    async function updateIssueDescription() {
      descriptionInput.value?.blur();
      const payload = {
        id: issue.value?.id,
        payload: { description: localIssueDescription.value },
      };
      await store.dispatch('project/updateIssue', payload);
    }

    async function fetchIssue() {
      const { issueID } = route.query;
      const currentIssueID = issue.value?.id;

      const isShouldUpdateIssue = currentIssueID !== Number(issueID);
      if (isShouldUpdateIssue) {
        loading.start();
        await store.dispatch('project/getIssueByID', issueID);
        loading.stop();
      }
    }
    function setIssueData() {
      localIssueName.value = issue.value?.name || '';
      localIssueDescription.value = issue.value?.description || '';
    }

    function close() {
      emit('close');
    }

    const selectedType = ref<string | null>(null);
    function selectType(type: string) {
      selectedType.value = type;
    }
    function resetType() {
      selectedType.value = null;
    }

    const availableColumns = computed(() => store.state.project.boardDetail?.columns);
    const selectedColumn = ref(availableColumns.value?.[0]);

    const commentInput = ref<HTMLInputElement | null>(null);
    const comment = ref('');

    document.addEventListener('keydown', handleKeydown);
    function handleKeydown(e: KeyboardEvent) {
      interface TargetInterface extends EventTarget {
        className?: string[];
      }
      const isCommentFocusKey = e.key === 'm' || e.key === 'ь';
      const target: TargetInterface | null = e.target;
      const isPressedWhenNoFocus = !target?.className?.includes('q-field__native q-placeholder');
      if (isCommentFocusKey && isPressedWhenNoFocus) {
        commentInput?.value?.focus();
        e.preventDefault();
      }
    }

    function formatPriorityName(priorityID: number) {
      return store.state.project.availableIssuePriorities.find((p) => p.id === priorityID)?.name;
    }

    return {
      loading,

      issue,
      localIssueName,
      localIssueDescription,
      nameInput,
      descriptionInput,
      updateIssueName,
      updateIssueDescription,

      close,

      selectedType,
      selectType,
      resetType,

      availableColumns,
      selectedColumn,

      comment,
      commentInput,

      formatPriorityName,
    };
  },
});
</script>

<style lang="scss" scoped>
.item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  label {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 500;
    padding-right: 4px;
    width: 35%;
  }
  .q-item {
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 8px;

    padding-left: 6px;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    > span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
