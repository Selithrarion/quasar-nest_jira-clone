import { boot } from 'quasar/wrappers';
import { Quasar } from 'quasar';

import { createI18n } from 'vue-i18n';
import messages from 'src/localization';
import { russianPluralization } from 'src/localization/ru';

const vueI18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'ru',
  pluralRules: {
    ru: russianPluralization,
  },
  messages,
});

export default boot(async ({ app }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const savedLang = JSON.parse(localStorage.getItem('language')) || 'en-US';
    await import('quasar/lang/' + String(savedLang)).then((l) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      Quasar.lang.set(l.default);
    });
  } catch (e) {
    console.error(e);
  }

  app.use(vueI18n);
});

export { vueI18n };
