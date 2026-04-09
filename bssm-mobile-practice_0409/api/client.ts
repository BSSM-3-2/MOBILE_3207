import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
    default: 'https://bssm-api.zer0base.me',
});

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
// 모든 요청 전에 실행 — 추후 토큰 주입, 로깅 등을 여기서 처리
apiClient.interceptors.request.use(
    config => {
        // TODO: 인증 토큰이 생기면 여기서 주입
        // const token = getToken();
        // if (token) config.headers.Authorization = `Bearer ${token}`;
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
