import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/localization';
import { russianPluralization } from 'src/localization/ru';

const i18n = createI18n({
  locale: 'en-US',
  pluralRules: {
    ru: russianPluralization,
  },
  messages,
});

export default boot(({ app }) => {
  app.use(i18n);
});

export { i18n };
