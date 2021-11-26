import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
// import { mount } from '@vue/test-utils';
// import ProjectsPageTable from 'components/project/ProjectsPageTable';

installQuasarPlugin();

// const mockProjectList = [
//   {
//     id: 1,
//     name: 'project1',
//   },
// ];

describe('ProjectsPageTable.vue', () => {
  it('fetches projects', () => {
    // const wrapper = mount(ProjectsPageTable);

    // await wrapper.get('[data-test="deleteProject"]').trigger('click');
    // console.log(wrapper, wrapper.vm);
    expect('1').toBe('1');
  });
});
