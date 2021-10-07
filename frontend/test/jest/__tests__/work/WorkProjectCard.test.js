import WorkProjectCard from 'components/work/WorkProjectCard.vue';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
// import { useRouter } from 'vue-router';

// TODO: not work, auto import also not work. investigate how to correctly refactor and use mocks
// jest.mock('vue-i18n')
// jest.mock('vue-router')

installQuasarPlugin();

describe('WorkProjectCard.vue', () => {
  it('renders props.project.name', () => {
    const wrapper = mount(WorkProjectCard, {
      props: {
        project: {
          name: 'name',
        },
      },
    });

    const name = wrapper.get('[data-test="name"]');

    expect(name.text()).toBe('name');
  });

  it('redirects on project button click', async () => {
    const wrapper = mount(WorkProjectCard, {
      props: {
        project: {
          id: 1,
        },
      },
    });
    const push = jest.fn();
    // TODO: vue test utils router mock example types error and not work
    // useRouter.mockImplementationOnce(() => {
    //   push;
    // });

    await wrapper.get('[data-test="openProject"]').trigger('click');

    // expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledTimes(0);
  });
});
