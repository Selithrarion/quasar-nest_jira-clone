<template>
  <BaseDialog
    class="issue"
    :actions="false"
    :content-loading="loading.active.value"
    hide-close-icon
    large
    @close="close"
  >
    <template #title>
      <div class="flex-center-between full-width">
        <div class="flex-center gap-2">
          <BaseButton padding="4px" secondary-color unelevated>
            <ProjectBoardIconIssueType
              :type="issue.typeID"
              :tooltip="`${formatIssueTypeName(issue.typeID)} – ${t('project.changeIssueType')}`"
            />

            <q-menu auto-close>
              <q-list padding dense>
                <CommonListTitle :title="t('project.changeIssueType')" padding />
                <BaseItem
                  v-for="type in availableIssueTypes"
                  :key="type.id"
                  class="flex items-center gap-2"
                  @click="updateIssue('typeID', type.id)"
                >
                  <ProjectBoardIconIssueType :type="type.id" small />
                  <q-item-section>
                    <q-item-label>{{ type.name }}</q-item-label>
                  </q-item-section>
                </BaseItem>
              </q-list>
            </q-menu>
          </BaseButton>
          {{ issue.key }}
        </div>

        <div class="row items-center gap-2">
          <BaseButton size="small" disable flat>
            <q-icon name="reviews" size="xs" />
            {{ t('common.giveReview') }}
          </BaseButton>

          <BaseButton size="small" disable flat>
            <q-icon name="visibility" size="xs" />
            <span class="text-subtitle2">{{ issue.watchers.length }}</span>
          </BaseButton>

          <BaseButton icon="thumb_up" padding="8px" size="sm" disable flat />
          <BaseButton icon="share" padding="8px" size="sm" disable flat />
          <BaseButton icon="more_horiz" padding="8px" size="sm" disable flat />
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
                :placeholder="localIssueName ? t('common.changeTitle') : t('common.addTitle')"
                filled
                @blur="updateIssueName"
                @keydown.enter="$event.target.blur()"
              />
              <BaseTooltip :label="localIssueName" />
            </div>

            <div class="row gap-2">
              <BaseButton icon="attach_file" padding="4px" secondary-color unelevated disable />
              <BaseButton icon="library_add_check" padding="4px" secondary-color unelevated disable />
              <BaseButton icon="link" padding="4px" secondary-color unelevated disable />
              <BaseButton icon="schedule" padding="4px" secondary-color unelevated disable />
              <BaseButtonbtn icon="more_horiz" padding="4px" secondary-color unelevated disable />
            </div>
          </div>

          <div>
            <div class="text-subtitle2 q-pb-sm">{{ t('common.description') }}</div>

            <BaseEditor
              v-if="isDescriptionEditor"
              v-model="localIssueDescription"
              :save-loading="loading.custom.saveEditorDescription"
              @cancel="resetIssueDescription"
              @save="updateIssueDescription"
            />
            <!--eslint-disable-next-line vue/no-v-html-->
            <div v-else class="issue__description" @click="showDescriptionEditor" v-html="localIssueDescription" />
          </div>

          <div>
            <div class="text-subtitle2 q-pb-sm">{{ t('common.activity') }}</div>
            <div class="row gap-3">
              <BaseAvatar
                size="32px"
                :src="currentUser.avatar && currentUser.avatar.url"
                :item-name="currentUser.username"
                :item-color="currentUser.color"
              />
              <q-input
                v-if="!isAddCommentEditor"
                v-model="comment"
                class="flex-grow-1"
                :placeholder="t('common.addComment')"
                bottom-slots
                outlined
                autogrow
                dense
                @click="isAddCommentEditor = true"
              >
                <template #hint>
                  <b>{{ t('common.advice') }}:</b> {{ t('common.press') }}
                  <q-chip class="no-margin text-weight-bold" style="font-size: 10px" label="M" size="xs" square dense />
                  , {{ t('common.toAddComment') }}
                </template>
              </q-input>

              <BaseEditor
                v-if="isAddCommentEditor"
                v-model="comment"
                :save-loading="loading.custom.addComment"
                @cancel="resetAddComment"
                @save="addComment"
              />
            </div>

            <div class="flex flex-col gap-6 q-mt-lg">
              <div v-for="comment in sortedComments" :key="comment.id" class="row no-wrap gap-3 full-width">
                <BaseAvatar
                  size="32px"
                  :src="comment.author.avatar && comment.author.avatar.url"
                  :item-name="comment.author.username"
                  :item-color="comment.author.color"
                />

                <div class="column items-center gap-2 full-width">
                  <div class="flex-center-between gap-3 full-width">
                    <div class="flex-center gap-2">
                      <span class="text-weight-medium">{{ comment.author.name }}</span>
                      <span v-if="comment.createdAt !== comment.updatedAt" class="text-caption text-blue-grey-6">
                        {{ t('common.edited') }}
                      </span>
                    </div>

                    <span class="text-caption text-blue-grey-6">
                      {{ formatDate(comment.updatedAt, DateTypes.DIFF, { maxDiffUnit: DateUnits.MONTH }) }}
                    </span>
                  </div>

                  <BaseEditor
                    v-if="editCommentID === comment.id"
                    v-model="editCommentLocalText"
                    class="full-width"
                    :save-loading="loading.custom.editComment"
                    @cancel="editCommentID = null"
                    @save="editComment(comment.id)"
                  />
                  <div v-else class="flex flex-col items-center gap-2 full-width">
                    <!--eslint-disable-next-line vue/no-v-html-->
                    <span v-html="comment.text" />
                    <div class="flex items-center gap-3 full-width">
                      <BaseButton :label="t('common.edit')" plain-style @click="showEditCommentEditor(comment)" />
                      <BaseButton
                        :label="t('common.delete')"
                        plain-style
                        @click="dialog.open('deleteComment', { item: comment })"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-5 issue__right-side">
          <BaseSelect
            class="q-mb-md w-fit-content"
            :model-value="selectedColumn"
            :options="availableColumns"
            :emit-value="false"
            truncate
            dense
            @update:model-value="updateIssueColumn"
          />

          <div class="issue__item-row">
            <label>Executor</label>
            <BaseSelectWithAvatar
              :model-value="issue.assigned"
              :options="availableProjectUsers"
              :emit-value="false"
              :tooltip="t('project.editAssigned')"
              button-style
              @update:model-value="updateIssue('assigned', $event)"
            />
          </div>

          <div class="issue__item-row">
            <label>{{ t('project.author') }}</label>
            <BaseSelectWithAvatar
              :model-value="issue.author"
              :options="availableProjectUsers"
              :emit-value="false"
              :tooltip="t('project.editAuthor')"
              button-style
              @update:model-value="updateIssue('author', $event)"
            />
          </div>

          <div class="issue__item-row">
            <label>{{ t('project.marks') }}</label>
            <BaseSelect
              :options="issue.marks"
              :tooltip="t('project.addMarks')"
              disable
              button-style
              multiple
              use-chips
            />
          </div>

          <div class="issue__item-row">
            <label>{{ t('project.issuePriority.priority') }}</label>
            <BaseSelectIssuePriority
              :model-value="issue.priorityID"
              :options="availableIssuePriorities"
              :tooltip="t('project.issuePriority.edit')"
              button-style
              @update:model-value="updateIssue('priorityID', $event)"
            />
          </div>

          <q-separator class="q-my-sm" />

          <div class="text-caption text-blue-grey-10 q-pb-lg">
            <div class="flex-center-between">
              <div class="flex gap-1">
                <span class="opacity-60">{{ t('common.created') }}</span>

                <span v-if="getIsDateLessDay(issue.createdAt)">
                  <BaseButton plain-style @click="isCreatedAtDifference = !isCreatedAtDifference">
                    {{
                      isCreatedAtDifference ? formatDate(issue.createdAt, DateTypes.DIFF) : formatDate(issue.createdAt)
                    }}
                  </BaseButton>
                  <BaseTooltip v-if="isCreatedAtDifference" :label="formatDate(issue.createdAt)" />
                </span>

                <span v-else class="opacity-60">
                  {{ formatDate(issue.createdAt) }}
                </span>
              </div>

              <BaseButton
                class="text-blue-grey-5"
                icon="settings"
                size="small"
                :tooltip="t('project.openSettings')"
                :label="t('project.configure')"
                dense
                flat
              />
            </div>

            <div class="flex gap-1">
              <span class="opacity-60">{{ t('common.updateDate') }}</span>

              <span v-if="getIsDateLessDay(issue.updatedAt)">
                <BaseButton plain-style @click="isUpdatedAtDifference = !isUpdatedAtDifference">
                  {{
                    isUpdatedAtDifference ? formatDate(issue.updatedAt, DateTypes.DIFF) : formatDate(issue.updatedAt)
                  }}
                </BaseButton>
                <BaseTooltip v-if="isUpdatedAtDifference" :label="formatDate(issue.updatedAt)" />
              </span>

              <span v-else class="opacity-60">
                {{ formatDate(issue.updatedAt) }}
              </span>
            </div>
          </div>
        </div>

        <BaseDialog
          type="delete"
          :model-value="dialog.openedName.value === 'deleteComment'"
          :title="t('project.deleteComment')"
          :confirm-loading="dialog.loading.value"
          @close="dialog.close"
          @confirm="deleteComment(dialog.openedItem.value.id)"
        >
          {{ t('project.deleteCommentFrom', { name: dialog.openedItem.value.author.name }) }}
        </BaseDialog>
      </div>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { differenceInHours } from 'date-fns';
import { useI18n } from 'vue-i18n';
import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
import { useFormat, DateUnits, DateTypes } from 'src/composables/format/useFormat';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import issueRepository from 'src/repositories/issueRepository';

import CommonListTitle from 'components/common/CommonListTitle.vue';

import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';

import { ColumnModel } from 'src/models/project/column.model';
import { CommentModel } from 'src/models/project/comment.model';

export default defineComponent({
  name: 'ProjectBoardDialogViewIssue',

  components: {
    CommonListTitle,
    ProjectBoardIconIssueType,
  },

  emits: ['close'],

  setup(props, { emit }) {
    const { t } = useI18n();
    const store = useStore();
    const route = useRoute();
    const dialog = useDialog();
    const loading = useLoading({ default: true, customNames: ['saveEditorDescription', 'addComment', 'editComment'] });
    const { formatDate } = useFormat();

    onBeforeMount(async () => {
      await fetchIssue();
      setIssueData();
      loading.stop();
    });
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown);
    });

    const issue = computed(() => store.state.project.issueDetail);
    const sortedComments = computed(() => {
      const comments = issue.value?.comments?.slice();
      return comments?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    });

    const localIssueName = ref('');
    const localIssueDescription = ref('');

    const nameInput = ref<HTMLInputElement | null>(null);
    const descriptionEditor = ref<HTMLInputElement | null>(null);
    const isDescriptionEditor = ref(false);
    function showDescriptionEditor() {
      isDescriptionEditor.value = true;
    }
    function resetIssueDescription() {
      localIssueDescription.value = issue.value?.description || '';
      isDescriptionEditor.value = false;
    }

    const currentUser = computed(() => store.state.user.currentUser);
    const isAddCommentEditor = ref(false);
    const comment = ref('');
    const editCommentID = ref<number | null>(null);
    const editCommentLocalText = ref('');
    function showEditCommentEditor(comment: CommentModel) {
      editCommentID.value = comment.id;
      editCommentLocalText.value = comment.text;
    }
    async function addComment() {
      try {
        loading.start('addComment');
        isAddCommentEditor.value = false;

        const payload = {
          id: issue.value?.id,
          text: comment.value,
        };
        await store.dispatch('project/addIssueComment', payload);

        comment.value = '';
      } finally {
        loading.stop('addComment');
      }
    }
    function resetAddComment() {
      isAddCommentEditor.value = false;
      comment.value = '';
    }
    async function editComment(commentID: number) {
      try {
        loading.start('editComment');

        const payload = { commentID, text: editCommentLocalText.value };
        await store.dispatch('project/editIssueComment', payload);

        editCommentID.value = null;
      } finally {
        loading.stop('editComment');
      }
    }
    async function deleteComment(commentID: number) {
      try {
        dialog.startLoading();
        await store.dispatch('project/deleteIssueComment', commentID);
        dialog.close();
      } finally {
        dialog.stopLoading();
      }
    }

    async function updateIssue<T>(field: string, value: T) {
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

      await issueRepository.update(issueID, { column: newColumn });
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

    document.addEventListener('keydown', handleKeydown);
    function handleKeydown(e: KeyboardEvent) {
      interface TargetInterface extends EventTarget {
        className?: string[];
      }
      const isCommentFocusKey = e.key === 'm' || e.key === 'ь';
      const target: TargetInterface | null = e.target;
      const isPressedWhenNoFocus = !target?.className?.includes('q-field__native q-placeholder');
      if (isCommentFocusKey && isPressedWhenNoFocus) {
        isAddCommentEditor.value = true;
        e.preventDefault();
      }
    }

    const availableIssuePriorities = computed(() => store.state.project.availableIssuePriorities);
    const availableIssueTypes = computed(() => store.state.project.availableIssueTypes);
    function formatIssueTypeName(typeID: number) {
      const type = availableIssueTypes.value.find((p) => p.id === typeID);
      return type?.name;
    }

    const availableProjectUsers = computed(() => store.state.project.projectDetail?.users);

    const isCreatedAtDifference = ref(true);
    const isUpdatedAtDifference = ref(true);
    function getIsDateLessDay(date: number | Date) {
      const formattedDate = new Date(date);
      const now = new Date();
      return differenceInHours(now, formattedDate) <= 24;
    }

    function close() {
      emit('close');
    }

    return {
      t,
      dialog,
      loading,
      formatDate,
      DateUnits,
      DateTypes,

      issue,
      sortedComments,

      localIssueName,
      localIssueDescription,

      nameInput,
      descriptionEditor,
      isDescriptionEditor,
      showDescriptionEditor,
      resetIssueDescription,

      currentUser,
      comment,
      isAddCommentEditor,
      editCommentID,
      editCommentLocalText,
      addComment,
      resetAddComment,
      showEditCommentEditor,
      editComment,
      deleteComment,

      updateIssue,
      updateIssueName,
      updateIssueDescription,
      updateIssueColumn,

      selectedType,
      selectType,
      resetType,

      availableColumns,
      selectedColumn,

      availableIssuePriorities,
      availableIssueTypes,
      formatIssueTypeName,

      availableProjectUsers,

      isCreatedAtDifference,
      isUpdatedAtDifference,
      getIsDateLessDay,

      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.issue {
  &__description {
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

  &__right-side {
    gap: 16px;
    height: 100%;
    overflow: auto;
    position: sticky;
    top: 66px;
  }

  &__item-row {
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
}
</style>
