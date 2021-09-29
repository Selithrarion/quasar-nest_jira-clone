import { boot } from 'quasar/wrappers';
import GoogleAuth from 'vue3-google-oauth2';

const options = {
  clientId: '813034531448-en1dk8mhagl2eblfv4ukmhmoml7f74i7.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
  fetch_basic_profile: false,
};
export default boot(({ app }) => {
  app.use(GoogleAuth, options);
});
