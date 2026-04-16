import { create } from 'zustand';
import User from '@type/User';
import { signup, login, SignupPayload, LoginPayload } from '@/api/auth';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;

    signUp: (payload: SignupPayload) => Promise<void>;
    logIn: (payload: LoginPayload) => Promise<void>;
    logOut: () => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,

    signUp: async payload => {
        set({ loading: true, error: null });
        try {
            const res = await signup(payload);
            set({
                user: res.user,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
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
            set({
                user: res.user,
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
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

    logOut: () => {
        set({ user: null, accessToken: null, refreshToken: null, error: null });
    },

    setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
    },

    clearError: () => set({ error: null }),
}));
