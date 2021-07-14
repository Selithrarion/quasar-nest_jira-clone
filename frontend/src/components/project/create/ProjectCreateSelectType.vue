<template>
  <div>
    <p>Почему существует два типа проектов?</p>
    <p>
      Проекты, управляемые командами, — это новый вид проектов Jira Software Cloud, созданный с нуля. Примечание. Выбор,
      который вы сделаете на этом этапе, изменить невозможно. Единственный способ сменить тип проекта — создать новый
      проект.
    </p>

    <div class="project-types-wrapper row q-pt-lg">
      <div class="project-type col">
        <div class="q-mb-md">
          <div class="text-subtitle1 text-blue-grey-14 text-weight-medium text-center">
            Проект, управляемый компанией
          </div>
          <div class="q-mt-sm q-mb-md">
            Проекты, управляемые компанией, поддерживают популярные функции Jira Software, которые так ценят постоянные
            пользователи сервиса.
          </div>
        </div>

        <div class="flex justify-center">
          <q-btn label="Выбрать управляемый компанией" size="0.8rem" disable @click="select(ProjectTypeEnum.TEAM)" />
          <div class="project-type__caption q-pt-sm text-blue-grey-6">
            <div>Вы не можете создавать проекты, управляемые компанией.</div>
            <div>Обратитесь к администратору Jira.</div>
          </div>
        </div>
      </div>

      <div class="project-type col">
        <div class="q-mb-md">
          <div class="text-subtitle1 text-blue-grey-14 text-weight-medium text-center">
            Проект, управляемый командой
          </div>
          <div class="q-mt-sm q-mb-md">
            В проектах, управляемых командой, Jira Software полностью меняется, чтобы упростить настройку, использование
            и обслуживание для команд разработчиков ПО любого размера.
          </div>
        </div>

        <q-btn
          color="primary"
          label="Выбрать управляемый командой"
          size="0.8rem"
          unelevated
          @click="select(ProjectTypeEnum.SOFTWARE)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ProjectTypeEnum } from 'src/models/project/project.model';

export default defineComponent({
  name: 'ProjectCreateSelectType',

  emits: ['select'],

  setup(props, { emit }) {
    function select(type: number) {
      emit('select', type);
    }

    return {
      select,
      ProjectTypeEnum,
    };
  },
});
</script>

<style lang="scss" scoped>
.project-types-wrapper {
  gap: 8px;
  @media screen and (min-width: $breakpoint-sm-min) {
    gap: 24px;
  }
  @media screen and (min-width: $breakpoint-md-min) {
    gap: 48px;
  }
}
.project-type {
  background: $grey-2;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  &__caption {
    text-align: center;
    font-size: 11px;
  }
}
</style>
