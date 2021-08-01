import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Cookies } from 'quasar';
import userService from 'src/service/userService';
import userState from 'src/store/user/state';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

interface AxiosRequestConfigWithRetryField extends AxiosRequestConfig {
  _retry: boolean;
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081/',
});

function getUserAccessToken() {
  return userState().token;
}

// TODO: add refresh tokens
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getUserAccessToken();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (token) config.headers['Authorization'] = `Bearer ${token}`;

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
    console.log('error', error);
    // store.dispatch('showSnackbar', { error: error.response.data });
    const originalRequest = error.config as AxiosRequestConfigWithRetryField;

    const isAuthError = error.response?.status === 403;
    const isNotRetry = !originalRequest._retry;

    if (isAuthError && isNotRetry) {
      originalRequest._retry = true;
      // const { accessToken, refreshToken } = await userService.updateTokens();
      // console.log(accessToken, refreshToken);
      // Cookies.set('authToken', accessToken);
      // Cookies.set('authRefreshToken', refreshToken);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      return http(originalRequest);
    }

    return Promise.reject(error);
  }
);

export { http };
