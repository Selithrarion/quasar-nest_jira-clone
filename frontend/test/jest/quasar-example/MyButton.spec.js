import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
// import { mount, shallowMount } from '@vue/test-utils';
// import { QBtn } from 'quasar';
// import MyButton from './demo/MyButton.vue';

// Specify here Quasar config you'll need to test your component
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
installQuasarPlugin();

describe('MyButton', () => {
  it('works', () => {
    expect('1').toBe('1');
  });
  //   it('has increment method', () => {
  //     const wrapper = mount(MyButton);
  //     const { vm } = wrapper;
  //
  //     expect(typeof vm.increment).toBe('function');
  //   });
  //
  //   it('can check the inner text content', () => {
  //     const wrapper = mount(MyButton);
  //     const { vm } = wrapper;
  //
  //     expect(vm.$el.textContent).toContain('rocket muffin');
  //     expect(wrapper.find('.content').text()).toContain('rocket muffin');
  //   });
  //
  //   it('sets the correct default data', () => {
  //     const wrapper = mount(MyButton);
  //     const { vm } = wrapper;
  //
  //     expect(typeof vm.counter).toBe('number');
  //     expect(vm.counter).toBe(0);
  //   });
  //
  //   it('correctly updates counter when button is pressed', async () => {
  //     const wrapper = shallowMount(MyButton);
  //     const { vm } = wrapper;
  //
  //     // Should be `wrapper.findComponent(QBtn)`, will be fixed in next Quasar release
  //     // eslint-disable-next-line
  //     const button = wrapper.findComponent < QBtn > { name: QBtn.name };
  //     await button.trigger('click');
  //     expect(vm.counter).toBe(1);
  //   });
});
