export default jest.mock('vue-i18n', () => ({
  useI18n: jest.fn(() => ({
    t: () => {
      //
    },
  })),
}));
