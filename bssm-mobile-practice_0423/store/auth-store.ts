import { create } from 'zustand';
import User from '@type/User';
import { signup, login, logout, refreshToken as authRefresh, SignupPayload, LoginPayload } from '@/api/auth';
import { getMe } from '@/api/users';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export type AuthStatus = 'checking' | 'authenticated' | 'guest';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    status: AuthStatus;
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
    status: 'checking',
    loading: false,
    error: null,

    bootstrap: async () => {
        try {
            const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);
            const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);

            if (!accessToken || !refreshToken) {
                set({ status: 'guest' });
                return;
            }

            // interceptor가 헤더를 붙일 수 있도록 임시 세팅
            set({ accessToken, refreshToken });

            const user = await getMe();
            set({
                user,
                status: 'authenticated',
            });
        } catch (err) {
            console.error('Bootstrap failed:', err);
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_KEY);
            set({
                user: null,
                accessToken: null,
                refreshToken: null,
                status: 'guest',
            });
        }
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
                status: 'authenticated',
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
                status: 'authenticated',
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
        const refreshToken = get().refreshToken;
        if (refreshToken) {
            await logout(refreshToken).catch(() => {
                /* fire-and-forget: ignore server failure */
            });
        }

        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_KEY);
        set({
            user: null,
            accessToken: null,
            refreshToken: null,
            status: 'guest',
            error: null,
        });
    },

    refreshAccessToken: async () => {
        const currentRefreshToken = get().refreshToken;
        if (!currentRefreshToken) {
            throw new Error('No refresh token');
        }

        try {
            const res = await authRefresh(currentRefreshToken);
            await SecureStore.setItemAsync(TOKEN_KEY, res.accessToken);
            await SecureStore.setItemAsync(REFRESH_KEY, res.refreshToken);

            set({
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
            });

            return res.accessToken;
        } catch (err) {
            console.error('Token refresh failed:', err);
            throw err;
        }
    },

    setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
    },

    clearError: () => set({ error: null }),
}));
