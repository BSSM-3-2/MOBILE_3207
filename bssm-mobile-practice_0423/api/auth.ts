import apiClient from './client';
import User from '@type/User';

export interface AuthResponse {
    tokenType: string;
    expiresIn: number;
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface SignupPayload {
    username: string;
    displayName: string;
    password: string;
    bio?: string;
    avatarUrl?: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/signup', payload);
    return res.data;
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', payload);
    return res.data;
};

export const refreshToken = async (token: string): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/refresh', {
        refreshToken: token,
    });
    return res.data;
};

export const logout = async (token: string): Promise<void> => {
    await apiClient.post('/auth/logout', {
        refreshToken: token,
    });
};
