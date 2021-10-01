import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/localization';
import { russianPluralization } from 'src/localization/ru';

const vueI18n = createI18n({
  locale: 'ru',
  pluralRules: {
    ru: russianPluralization,
  },
  messages,
});

export default boot(({ app }) => {
  app.use(vueI18n);
});

export { vueI18n };
