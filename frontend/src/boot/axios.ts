import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import { UserUpdateTokenResponse } from 'src/models/user/user.model';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

interface AxiosRequestConfigWithRetryField extends AxiosRequestConfig {
  _isRetry: boolean;
}

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081/',
});

export default boot(({ store, redirect }) => {
  http.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const token = store.state.user.accessToken as string;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (token) http.defaults.headers['Authorization'] = `Bearer ${token}`;

      return config;
    },
    (error: AxiosError) => {
      console.error('INTERCEPTOR REQUEST ERROR', error);
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('RESPONSE DATA -', response?.data);
      return response;
    },
    async (error: AxiosError) => {
      console.error('RESPONSE error', error, error.response);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const errorMessage = error.response?.data?.message as string;
      // TODO: add vue-18n error translation
      if (errorMessage)
        Notify.create({
          message: errorMessage,
          color: 'red-5',
          textColor: 'white',
        });

      const originalRequest = error.config as AxiosRequestConfigWithRetryField;
      const isAuthError = error.response?.status === 401;

      if (error.config.url?.includes('update-tokens')) redirect('/auth?redirect');
      else if (isAuthError) {
        const { accessToken } = (await store.dispatch('user/updateTokens')) as UserUpdateTokenResponse;
        console.log('NEW AT', accessToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return http(originalRequest);
      }

      return Promise.reject(error);
    }
  );
});

export { http };
