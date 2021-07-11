<template>
  <BaseDialog title="Выбор доски" :show="show" :actions="false" large @close="close">
    <CommonSearch :value="search" :outlined="false" client-search filled @search="updateSearch" />

    <div class="text-caption text-uppercase q-mt-md q-mb-sm">доски в {{ projectName }}</div>
    <q-list>
      <q-item
        v-for="board in filteredBoards"
        :key="board.id"
        class="row items-center gap-3 q-pl-sm"
        :class="{ 'shadow-1': board.id === selectedBoard.id }"
        clickable
        @click="selectBoard(board)"
      >
        <q-icon name="check" size="sm" :color="board.id === selectedBoard.id ? 'green-6' : 'blue-grey-5'" />
        <q-item-section :class="{ 'text-weight-bold': board.id === selectedBoard.id }">{{ board.name }}</q-item-section>
      </q-item>
    </q-list>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';

import BaseDialog from 'components/base/BaseDialog.vue';
import CommonSearch from 'components/common/CommonSearch.vue';

import { BoardModel } from 'src/models/project/board.model';

export default defineComponent({
  name: 'ProjectBoardDialogSelect',

  components: {
    BaseDialog,
    CommonSearch,
  },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },

    boards: {
      type: Array as PropType<BoardModel[]>,
      required: true,
    },
    selectedBoard: {
      type: Object as PropType<BoardModel>,
      required: true,
    },
  },

  emits: ['select', 'close'],

  setup(props, { emit }) {
    const search = ref('');
    function updateSearch(value: string) {
      search.value = value;
    }

    const filteredBoards = computed(() => {
      if (!search.value) return props.boards;
      return props.boards.filter((b) => b.name.toLowerCase().includes(search.value));
    });

    function selectBoard(boardID: number) {
      const isSelectedAnotherBoard = boardID !== props.selectedBoard.id;
      if (isSelectedAnotherBoard) {
        emit('select', boardID);
      }
      close();
    }
    function close() {
      emit('close');
    }

    return {
      search,
      updateSearch,
      filteredBoards,

      selectBoard,
      close,
    };
  },
});
</script>

<style lang="sass" scoped></style>
