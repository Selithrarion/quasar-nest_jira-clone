<template>
  <BaseDialog :actions="false" :content-loading="!issue" hide-close-icon large @close="close">
    <template #title>
      <div class="flex-center-between full-width">
        <div>
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
                v-model="issue.name"
                class="text-h6"
                :placeholder="issue.name ? 'Изменить название' : 'Добавить название'"
                filled
              />
              <BaseTooltip :label="issue.name" />
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
            <q-input
              v-model="issue.description"
              type="textarea"
              :placeholder="issue.description ? 'Изменить описание' : 'Добавить описание'"
              autogrow
              filled
              dense
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
                <div class="row gap-2">
                  <div class="row justify-between gap-3 flex-grow-1">
                    <div class="row gap-2">
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
            <q-select
              v-model="selectedColumn"
              class="q-mb-md w-fit-content"
              :options="availableColumns"
              option-label="name"
              option-value="id"
              filled
              dense
            />

            <div class="item-row">
              <label>Исполнитель</label>
              <q-item clickable dense>
                <q-avatar size="24px">
                  <img
                    src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
                    alt="User Avatar"
                  />
                </q-avatar>
                Sergey Maltsev
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
                Sergey Maltsev
              </q-item>
            </div>
            <div class="item-row">
              <label>Метки</label>
              <q-item clickable dense>
                <q-chip color="blue-grey-1" label="Frontend" square dense />
              </q-item>
            </div>
            <div class="item-row">
              <label>Приоритет</label>
              <q-item clickable dense>
                <ProjectBoardIconPriorityType :type="issue.priorityID" />
                {{ store.getters.getIssuePriorityName(issue.priorityID) }}
              </q-item>
            </div>

            <q-separator class="q-my-sm" />

            <div class="text-caption text-blue-grey-5 q-pb-lg">
              <div class="flex-center-between">
                <div :class="{ clickable: false }">
                  Создано 22 июня 2021 г., 12:02
                  <BaseTooltip label="22 июня 2021 г. 12:02" />
                </div>
                <q-btn icon="settings" label="Настроить" size="small" no-wrap no-caps dense flat />
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
import { defineComponent, ref, reactive, computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
// import useLoading from 'src/composables/common/useLoading';

import BaseDialog from 'components/base/BaseDialog.vue';
import BaseTooltip from 'components/base/BaseTooltip.vue';
import BaseButtonCloseIcon from 'components/base/button/BaseButtonCloseIcon.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';
import ProjectBoardIconPriorityType from 'components/project/board/icon/ProjectBoardIconPriorityType.vue';

import { ColumnModel } from 'src/models/project/column.model';
import { IssueModel } from 'src/models/project/issue.model';

export default defineComponent({
  name: 'ProjectBoardDialogViewIssue',

  components: {
    BaseDialog,
    BaseTooltip,
    BaseButtonCloseIcon,
    ProjectBoardIconIssueType,
    ProjectBoardIconPriorityType,
  },

  emits: ['close'],

  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();

    const issue = computed(() => store.state.project.issueDetail);

    onBeforeMount(async () => {
      const { issueID } = route.params;
      await store.dispatch('project/getIssueByID', issueID);
      console.log(issue);
    });

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

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown);
    });

    return {
      store,

      issue,
      comment,

      close,

      selectedType,
      selectType,
      resetType,

      availableColumns,
      selectedColumn,

      commentInput,
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
    font-size: 12px;
    font-weight: 500;
    padding-right: 4px;
    width: 50%;
  }
  .q-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 50%;
    padding-left: 6px;
  }
}
</style>
