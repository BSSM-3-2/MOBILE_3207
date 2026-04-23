import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL: string =
    (Constants.expoConfig?.extra?.apiUrl as string | undefined) ??
    'https://bssm-api.zer0base.me';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
    refreshQueue.forEach(callback => callback(token));
    refreshQueue = [];
};

// Request Interceptor
// 모든 요청 전에 실행 — 토큰 주입
apiClient.interceptors.request.use(
    config => {
        // auth-store를 직접 import하면 순환 참조가 생기므로 동적으로 참조
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useAuthStore } = require('@/store/auth-store');
        const token: string | null = useAuthStore.getState().accessToken;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => Promise.reject(error),
);

// Response Interceptor
// 모든 응답 후에 실행 — 에러 코드를 한 곳에서 처리
apiClient.interceptors.response.use(
    response => response,
    async error => {
        const status = error.response?.status;

        if (status === 404) {
            console.warn('[API] 리소스를 찾을 수 없습니다:', error.config?.url);
            return Promise.reject(error);
        }

        if (status === 401) {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const { useAuthStore } = require('@/store/auth-store');
            const store = useAuthStore.getState();

            const originalRequest = error.config;

            if (isRefreshing) {
                return new Promise(resolve => {
                    refreshQueue.push((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(apiClient(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const newToken = await store.refreshAccessToken();
                processQueue(newToken);
                isRefreshing = false;

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                refreshQueue = [];
                await store.logOut();
                return Promise.reject(refreshError);
            }
        }

        console.error('[API] 서버 에러:', status, error.message);
        return Promise.reject(error);
    },
);

export default apiClient;
