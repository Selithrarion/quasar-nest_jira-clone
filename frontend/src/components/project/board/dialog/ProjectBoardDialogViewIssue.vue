<template>
  <BaseDialog :actions="false" :content-loading="loading.active.value" hide-close-icon large @close="close">
    <template #title>
      <div class="flex-center-between full-width">
        <div class="flex-center gap-2">
          <q-btn class="btn--secondary" padding="4px" unelevated>
            <ProjectBoardIconIssueType
              :type="issue.typeID"
              :tooltip="`${formatIssueTypeName(issue.typeID)} – изменить тип задачи`"
            />

            <q-menu auto-close>
              <q-list padding dense>
                <CommonListTitle title="изменить тип задачи" padding />
                <q-item
                  v-for="type in availableIssueTypes"
                  :key="type.id"
                  class="flex items-center gap-2"
                  clickable
                  @click="updateIssue('typeID', type.id)"
                >
                  <ProjectBoardIconIssueType
                    :type="type.id"
                    :tooltip="`${formatIssueTypeName(type.id)} – изменить тип задачи`"
                    small
                  />
                  <q-item-section>
                    <q-item-label>{{ type.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
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
            <!--            TODO: add colors-->
            <div
              v-show="!isDescriptionEditor"
              class="issue-description"
              @click="showDescriptionEditor"
              v-html="localIssueDescription"
            />

            <q-editor
              v-show="isDescriptionEditor"
              ref="descriptionEditor"
              v-model="localIssueDescription"
              min-height="5rem"
            />
            <div v-show="isDescriptionEditor" class="flex-center-end gap-2 q-mt-sm">
              <q-btn label="Отмена" color="blue-grey-5" no-caps flat @click="resetIssueDescription" />
              <q-btn
                label="Сохранить"
                color="primary"
                :loading="loading.custom.saveEditorDescription"
                unelevated
                no-caps
                @click="updateIssueDescription"
              />
            </div>
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
              class="q-mb-md w-fit-content"
              :model-value="selectedColumn"
              :options="availableColumns"
              :emit-value="false"
              truncate
              dense
              @update:model-value="updateIssueColumn"
            />

            <div class="item-row">
              <label>Исполнитель</label>
              <BaseSelectWithAvatar
                :model-value="issue.assigned"
                :options="availableProjectUsers"
                :emit-value="false"
                tooltip="Изменить исполнителя"
                button-style
                @update:model-value="updateIssue('assigned', $event)"
              />
            </div>

            <div class="item-row">
              <label>Автор</label>
              <BaseSelectWithAvatar
                :model-value="issue.author"
                :options="availableProjectUsers"
                :emit-value="false"
                tooltip="Изменить автора"
                button-style
                @update:model-value="updateIssue('author', $event)"
              />
            </div>

            <div class="item-row">
              <label>Метки</label>
              <BaseSelect :options="issue.marks" tooltip="Добавить метки" disable button-style multiple use-chips />
            </div>

            <div class="item-row">
              <label>Приоритет</label>
              <BaseSelectIssuePriority
                :model-value="issue.priorityID"
                :options="availableIssuePriorities"
                tooltip="Изменить приоритет"
                button-style
                @update:model-value="updateIssue('priorityID', $event.id)"
              />
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
import { defineComponent, ref, computed, onBeforeMount, onBeforeUnmount, nextTick } from 'vue';
import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
import useLoading from 'src/composables/common/useLoading';

import issueService from 'src/service/issueService';

import CommonListTitle from 'components/common/CommonListTitle.vue';

import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';

import { ColumnModel } from 'src/models/project/column.model';

export default defineComponent({
  name: 'ProjectBoardDialogViewIssue',

  components: {
    CommonListTitle,
    ProjectBoardIconIssueType,
  },

  emits: ['close'],

  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const loading = useLoading({ default: true, customNames: ['saveEditorDescription'] });

    onBeforeMount(async () => {
      await fetchIssue();
      setIssueData();
      loading.stop();
    });
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown);
    });

    const issue = computed(() => store.state.project.issueDetail);

    const localIssueName = ref('');
    const localIssueDescription = ref('');

    const nameInput = ref<HTMLInputElement | null>(null);
    const descriptionEditor = ref<HTMLInputElement | null>(null);
    const isDescriptionEditor = ref(false);
    async function showDescriptionEditor() {
      isDescriptionEditor.value = true;
      await nextTick(() => {
        descriptionEditor.value?.focus();
      });
    }
    function resetIssueDescription() {
      localIssueDescription.value = issue.value?.description || '';
      isDescriptionEditor.value = false;
    }

    async function updateIssue(field: string, value: unknown) {
      const id = issue.value?.id;
      const columnID = issue.value?.columnID;
      const payload = {
        [field]: value,
      };

      await store.dispatch('project/updateIssue', { id, columnID, payload });
    }
    async function updateIssueName() {
      nameInput.value?.blur();
      await updateIssue('name', localIssueName.value);
    }
    async function updateIssueDescription() {
      try {
        loading.start('saveEditorDescription');
        await updateIssue('description', localIssueDescription.value);
        isDescriptionEditor.value = false;
      } finally {
        loading.stop('saveEditorDescription');
      }
    }
    async function updateIssueColumn(column: ColumnModel) {
      if (!issue.value || !selectedColumn.value) return;
      const issueID = issue.value.id;

      const oldColumnIssues = selectedColumn.value.issues.filter((i) => i.id !== issueID);
      const oldColumnID = selectedColumn.value.id;

      const newColumn = { ...column, issues: [...column.issues, issue.value] };
      const newColumnIssues = newColumn.issues;
      const newColumnID = newColumn.id;

      store.commit('project/UPDATE_COLUMN', { id: oldColumnID, payload: { issues: oldColumnIssues } });
      store.commit('project/UPDATE_COLUMN', { id: newColumnID, payload: { issues: newColumnIssues } });
      store.commit('project/UPDATE_ISSUE', { id: issueID, payload: { columnID: newColumnID } });

      await issueService.update(issueID, { column: newColumn });
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

    const selectedType = ref<string | null>(null);
    function selectType(type: string) {
      selectedType.value = type;
    }
    function resetType() {
      selectedType.value = null;
    }

    const availableColumns = computed(() => store.state.project.boardDetail?.columns);
    const selectedColumn = computed(() => availableColumns.value?.find((c) => c.id === issue.value?.columnID));

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

    const availableIssuePriorities = computed(() => store.state.project.availableIssuePriorities);
    const availableIssueTypes = computed(() => store.state.project.availableIssueTypes);
    function formatIssuePriorityName(priorityID: number) {
      return availableIssuePriorities.value.find((p) => p.id === priorityID)?.name;
    }
    function formatIssueTypeName(typeID: number) {
      return availableIssueTypes.value.find((p) => p.id === typeID)?.name;
    }

    const availableProjectUsers = computed(() => store.state.project.projectDetail?.users);

    function close() {
      emit('close');
    }

    return {
      loading,

      issue,

      localIssueName,
      localIssueDescription,

      nameInput,
      descriptionEditor,
      isDescriptionEditor,
      showDescriptionEditor,
      resetIssueDescription,

      updateIssue,
      updateIssueName,
      updateIssueDescription,
      updateIssueColumn,

      selectedType,
      selectType,
      resetType,

      availableColumns,
      selectedColumn,

      comment,
      commentInput,

      availableIssuePriorities,
      availableIssueTypes,
      formatIssuePriorityName,
      formatIssueTypeName,

      availableProjectUsers,

      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.issue-description {
  padding: 8px;
  border-radius: 4px 4px 0 0;
  background-color: $blue-grey-1;
  transition: background-color 150ms ease-in;
  word-break: break-word;
  cursor: text;
  &:hover {
    background-color: $grey-3;
  }
}

.item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  label:not(.q-select) {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 500;
    padding-right: 4px;
    width: 35%;
  }
  .q-select {
    width: 100%;
    ::v-deep .q-field__native,
    ::v-deep .q-field__control {
      min-height: 36px !important;
    }
    ::v-deep .q-field__native {
      padding: 0 8px;
    }
    ::v-deep .q-field__control-container {
      padding-top: 0;
    }
  }
  .q-btn {
    width: 100%;
  }
}

.q-menu .q-item__section {
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  flex-direction: row;
}
</style>
