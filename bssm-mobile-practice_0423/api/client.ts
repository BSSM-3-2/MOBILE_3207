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

            // TODO 실습 4-3: store.logOut()을 호출하세요

            // TODO 실습 5-2: logOut 대신 토큰 갱신을 시도하고 원본 요청을 재시도하세요
            //   - isRefreshing 플래그로 중복 갱신 방지
            //   - 갱신 중 들어온 요청은 pendingQueue에 쌓아두었다가 완료 후 일괄 처리
            //   - 갱신 실패 시 store.logOut() 호출

            return Promise.reject(error);
        }

        console.error('[API] 서버 에러:', status, error.message);
        return Promise.reject(error);
    },
);

export default apiClient;
