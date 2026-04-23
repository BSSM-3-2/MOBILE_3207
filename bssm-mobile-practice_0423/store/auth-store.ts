import { create } from 'zustand';
import User from '@type/User';
import { signup, login, SignupPayload, LoginPayload } from '@/api/auth';
import * as SecureStore from 'expo-secure-store';
// TODO 실습 4: api/auth에서 logout을 import하세요
// TODO 실습 5: api/auth에서 refreshToken을 import하세요

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

// TODO 실습 2: 'checking' | 'authenticated' | 'guest' 타입을 정의하고 export하세요

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    // TODO 실습 2: status 필드를 추가하세요
    loading: boolean;
    error: string | null;

    bootstrap: () => Promise<void>;
    signUp: (payload: SignupPayload) => Promise<void>;
    logIn: (payload: LoginPayload) => Promise<void>;
    logOut: () => Promise<void>;
    refreshAccessToken: () => Promise<string>;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    // TODO 실습 2-1: status 초기값을 설정하세요
    loading: false,
    error: null,

    bootstrap: async () => {
        // TODO 실습 3: 다음 흐름을 구현하세요
        // 1. SecureStore에서 accessToken을 읽는다
        // 2. 없으면 status 'guest'로 설정 후 return
        // 3. set({ accessToken })으로 interceptor가 헤더를 붙이도록 임시 세팅
        // 4. getMe()로 서버 검증
        // 5. 성공 → status 'authenticated' / 실패 → 토큰 삭제 후 'guest'
        set({ status: 'guest' } as never); // 임시 — 실습 3 완료 후 삭제
    },

    signUp: async payload => {
        set({ loading: true, error: null });
        try {
            const res = await signup(payload);
            await SecureStore.setItemAsync(TOKEN_KEY, res.accessToken);
            await SecureStore.setItemAsync(REFRESH_KEY, res.refreshToken);
            set({
                user: res.user,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                // TODO 실습 2-2: status를 'authenticated'로 설정하세요
                loading: false,
            });
        } catch (err: unknown) {
            const serverRes = (
                err as { response?: { data?: { message?: string } } }
            ).response;
            const message = serverRes
                ? (serverRes.data?.message ?? '회원가입에 실패했습니다.')
                : '서버와 통신 중 오류가 발생했습니다.';
            set({ error: message, loading: false });
            throw err;
        }
    },

    logIn: async payload => {
        set({ loading: true, error: null });
        try {
            const res = await login(payload);
            await SecureStore.setItemAsync(TOKEN_KEY, res.accessToken);
            await SecureStore.setItemAsync(REFRESH_KEY, res.refreshToken);
            set({
                user: res.user,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                // TODO 실습 2-3: status를 'authenticated'로 설정하세요
                loading: false,
            });
        } catch (err: unknown) {
            const serverRes = (
                err as { response?: { data?: { message?: string } } }
            ).response;
            const message = serverRes
                ? (serverRes.data?.message ?? '로그인에 실패했습니다.')
                : '서버와 통신 중 오류가 발생했습니다.';
            set({ error: message, loading: false });
            throw err;
        }
    },

    logOut: async () => {
        // TODO 실습 4-1: get().refreshToken으로 서버에 폐기 요청 (실패해도 계속 진행)
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_KEY);
        set({
            user: null,
            accessToken: null,
            refreshToken: null,
            // TODO 실습 2-4: status를 'guest'로 설정하세요
            error: null,
        });
    },

    refreshAccessToken: async () => {
        // TODO 실습 5-1: 다음 흐름을 구현하세요
        // 1. get().refreshToken이 없으면 throw new Error('No refresh token')
        // 2. authRefresh(currentRefreshToken)으로 새 토큰 발급
        // 3. SecureStore와 store 양쪽 모두 업데이트
        // 4. 새 accessToken을 반환
        throw new Error('Not implemented'); // 실습 5 완료 후 삭제
    },

    setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
    },

    clearError: () => set({ error: null }),
}));
