import axios from 'axios';
import { Platform } from 'react-native';

// 실기기: 개발 장비의 실제 IP 사용
const BASE_URL = Platform.select({
    android: 'http://10.0.2.2:3000',
    default: 'https://bssm-api.zer0base.me',
});

// TODO: (1차) axios.create()로 인스턴스를 만들고 baseURL과 Content-Type 헤더를 설정한다
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
        // TODO: (2차) config 객체에서 method와 url을 꺼내 콘솔에 출력한다

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

        // TODO: (2.5차) status 값에 따라 404 / 401 / 그 외를 구분해 콘솔에 출력한다

        return Promise.reject(error);
    },
);

export default apiClient;
