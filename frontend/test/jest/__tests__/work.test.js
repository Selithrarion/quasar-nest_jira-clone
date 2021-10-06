import WorkProjectCard from 'components/work/WorkProjectCard.vue';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';

const t = jest.fn();
t.mockReturnValue('');

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => {
      //
    },
  })),
}));
jest.mock('vue-i18n', () => ({
  useI18n: jest.fn(() => ({
    t: () => {
      //
    },
  })),
}));

installQuasarPlugin();

describe('WorkProjectCard.vue', () => {
  it('renders props.project.name', () => {
    const wrapper = mount(WorkProjectCard, {
      props: {
        project: {
          name: 'name',
          boards: [{}],
        },
      },
    });

    const name = wrapper.get('[data-test="name"]');

    expect(name.text()).toBe('name');
  });
});
