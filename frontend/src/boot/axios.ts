import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Cookies, Notify } from 'quasar';
import { UserModel, UserUpdateTokenResponse } from 'src/models/user/user.model';

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

export default boot(async ({ store, urlPath, redirect, router }) => {
  try {
    const savedUserData: UserModel = Cookies.get('user');
    if (savedUserData && savedUserData.accessToken && savedUserData.refreshToken) {
      const { accessToken } = savedUserData;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      await store.dispatch('user/loadUser', savedUserData);
    } else if (!urlPath.includes('/auth')) {
      await router.push(`/auth?redirect=${window.location.pathname}`);
    }
  } catch (e) {
    console.log(e);
  }

  http.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      console.log('INTERCEPTOR REQUEST', config);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const token = store.state.user.accessToken as string;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (token) http.defaults.headers.Authorization = `Bearer ${token}`;

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
      const errorMessage = (error.response?.data?.message as string) || (error.response?.data?.error as string);
      // TODO: add vue-18n error translation
      if (errorMessage)
        Notify.create({
          type: 'negative',
          message: errorMessage,
        });

      const originalRequest = error.config as AxiosRequestConfigWithRetryField;
      const isAuthError = error.response?.status === 401;
      console.log(isAuthError, error, error.response);
      if (error.config.url?.includes('update-tokens')) redirect('/auth?redirect');
      else if (isAuthError) {
        const { accessToken } = (await store.dispatch('user/updateTokens')) as UserUpdateTokenResponse;
        console.log('NEW AT', accessToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        return http(originalRequest);
      }

      return Promise.reject(error);
    }
  );
});

export { http };
