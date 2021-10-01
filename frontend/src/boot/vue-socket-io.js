import { boot } from 'quasar/wrappers';
import VueSocketIO from 'vue-3-socket.io';
import { io } from 'socket.io-client';
import { useStore } from 'src/store';

export default boot(({ app }) => {
  const options = {
    debug: true,
    connection: io('http://localhost:8081'),
    vuex: {
      store: useStore(),
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  };
  const socket = new VueSocketIO(options);
  // app.provide('socketIO', socket);
  app.use(socket);
});
