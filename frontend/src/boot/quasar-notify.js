import { Notify } from 'quasar';

Notify.setDefaults({
  position: 'bottom-right',
  timeout: 3000,
  textColor: 'black',
  color: 'white',
});

Notify.setDefaults({
  type: 'positive',
  textColor: 'white',
});
Notify.setDefaults({
  type: 'negative',
  textColor: 'white',
});
