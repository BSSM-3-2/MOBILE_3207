import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
    default: 'http://localhost:3000',
});

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
    error => {
        const status = error.response?.status;

        if (status === 404) {
            console.warn('[API] 리소스를 찾을 수 없습니다:', error.config?.url);
        } else if (status === 401) {
            console.warn('[API] 인증이 필요합니다. 로그아웃 처리');
            // TODO: 로그아웃 스토어 액션 호출
        } else {
            console.error('[API] 서버 에러:', status, error.message);
        }

        return Promise.reject(error);
    },
);

export default apiClient;
