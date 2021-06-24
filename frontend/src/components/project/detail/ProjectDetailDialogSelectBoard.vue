<template>
  <BaseDialog title="Выбор доски" :show="show" :actions="false" large @close="close">
    <CommonSearch :value="searchValue" :outlined="false" client-search filled @search="updateSearch" />

    <div class="text-caption text-uppercase q-mt-md q-mb-sm">доски в {{ projectName }}</div>
    <q-list>
      <q-item
        v-for="board in filteredBoards"
        :key="board.id"
        class="row items-center gap-3"
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
import BoardInterface from 'components/project/models/board.interface';

export default defineComponent({
  name: 'ProjectDetailDialogSelectBoard',

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
      type: Array as PropType<BoardInterface[]>,
      required: true,
    },
    selectedBoard: {
      type: Object as PropType<BoardInterface>,
      required: true,
    },
  },

  emits: ['select', 'close'],

  setup(props, { emit }) {
    const searchValue = ref('');
    function updateSearch(value: string) {
      searchValue.value = value;
    }

    const filteredBoards = computed(() => {
      const boards = props.boards;
      const normalizedSearch = searchValue.value.toLowerCase().trim();

      if (!normalizedSearch) return boards;
      return boards.filter((b) => b.name.includes(normalizedSearch));
    });

    function selectBoard(boardID: number) {
      emit('select', boardID);
      close();
    }
    function close() {
      emit('close');
    }

    return {
      searchValue,
      updateSearch,
      filteredBoards,

      selectBoard,
      close,
    };
  },
});
</script>

<style lang="sass" scoped></style>
