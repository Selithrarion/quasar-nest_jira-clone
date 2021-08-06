<template>
  <div class="common-page-header">
    <div class="flex justify-between items-center q-pr-xl">
      <CommonPageTitle :title="pageTitle" />
      <q-btn color="primary" :label="createButtonLabel" size="0.8rem" unelevated no-caps @click="create" />
    </div>

    <div class="q-px-xl flex gap-4">
      <CommonSearch v-model="searchValue" append-icon @search="search" />

      <BaseSelect
        v-if="isShowFilter('type')"
        v-model="selectedType"
        width="240"
        label="Тип"
        option-label="label"
        :options="availableTypes"
        :emit-value="false"
        :map-options="false"
        dense
      />
      <BaseSelect
        v-if="isShowFilter('leader')"
        v-model="selectedLeader"
        width="240"
        label="Владелец"
        option-label="label"
        :options="availableLeaders"
        :emit-value="false"
        :map-options="false"
        dense
      />
      <BaseSelect
        v-if="isShowFilter('project')"
        v-model="selectedProjects"
        width="240"
        label="Проект"
        option-label="label"
        :options="availableProjects"
        :emit-value="false"
        :map-options="false"
        dense
      />
      <BaseSelect
        v-if="isShowFilter('group')"
        v-model="selectedGroup"
        width="240"
        label="Группа"
        option-label="label"
        :options="availableGroups"
        :emit-value="false"
        :map-options="false"
        dense
      />

      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-btn
          v-show="searchValue || selectedType || selectedLeader || selectedProjects || selectedGroup"
          class="text-blue-grey-6"
          label="Сбросить фильтры"
          size="small"
          no-caps
          flat
          @click="resetFilters"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import BaseSelect from 'components/base/BaseSelect.vue';
import CommonPageTitle from 'components/common/CommonPageTitle.vue';
import CommonSearch from 'components/common/CommonSearch.vue';

export default defineComponent({
  name: 'CommonPageHeader',

  components: {
    BaseSelect,
    CommonPageTitle,
    CommonSearch,
  },

  props: {
    pageTitle: {
      type: String,
      required: true,
      default: 'Title',
    },
    createButtonLabel: {
      type: String,
      required: true,
      default: 'Create project',
    },
    filters: {
      type: Array,
      required: false,
      default: (): string[] => ['type', 'leader', 'project', 'group'],
    },
  },

  emits: ['create'],

  setup(props, { emit }) {
    const searchValue = ref('');
    function search() {
      console.log(searchValue.value);
    }

    const availableTypes = reactive([
      {
        id: 1,
        label: 'All',
      },
      {
        id: 2,
        label: 'Software',
      },
      {
        id: 3,
        label: 'Service Management',
      },
      {
        id: 4,
        label: 'Business',
      },
    ]);
    const availableLeaders = reactive([]);
    const availableProjects = reactive([]);
    const availableGroups = reactive([]);

    const selectedType = ref(null);
    const selectedLeader = ref(null);
    const selectedProjects = ref(null);
    const selectedGroup = ref(null);

    function resetFilters() {
      selectedType.value = null;
      selectedLeader.value = null;
      selectedProjects.value = null;
      selectedGroup.value = null;
      searchValue.value = '';
    }
    function isShowFilter(filterName: string): boolean {
      return props.filters.some((f) => f === filterName);
    }

    function create() {
      emit('create');
    }

    return {
      searchValue,
      search,

      availableTypes,
      availableLeaders,
      availableProjects,
      availableGroups,

      selectedType,
      selectedLeader,
      selectedProjects,
      selectedGroup,
      resetFilters,
      isShowFilter,

      create,
    };
  },
});
</script>
