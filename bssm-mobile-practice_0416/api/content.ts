import apiClient from './client';
import { Post, Comment, Reply } from '@type/Post';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
    default: 'http://localhost:3000',
});

export interface CreatePostPayload {
    caption?: string;
    images?: { uri: string; name: string; type: string }[];
}

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
    const form = new FormData();

    if (payload.caption) {
        form.append('caption', payload.caption);
    }

    payload.images?.forEach(img => {
        form.append('images', {
            uri: img.uri,
            name: img.name,
            type: img.type,
        } as unknown as Blob);
    });

    // axios는 RN에서 FormData 파일 바이너리를 올바르게 전송하지 못하므로 fetch 사용
    // Content-Type은 설정하지 않아야 fetch가 boundary를 자동으로 붙여줌
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAuthStore } = require('@/store/auth-store');
    const token: string | null = useAuthStore.getState().accessToken;

    const res = await fetch(`${BASE_URL}/content`, {
        method: 'POST',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: form,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw Object.assign(new Error(err.message ?? 'createPost failed'), {
            response: { status: res.status, data: err },
        });
    }

    return res.json() as Promise<Post>;
};

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
}

export const getFeed = async (
    page = 1,
    limit = 10,
): Promise<{ data: Post[]; pagination: Pagination }> => {
    const res = await apiClient.get<{ data: Post[]; pagination: Pagination }>(
        '/content/list',
        {
            params: { page, limit },
        },
    );
    return res.data;
};

export const likePost = async (
    id: string,
): Promise<{ likes: number; liked: boolean }> => {
    const res = await apiClient.post<{ likes: number; liked: boolean }>(
        `/content/${id}/like`,
    );
    return res.data;
};

export const unlikePost = async (
    id: string,
): Promise<{ likes: number; liked: boolean }> => {
    const res = await apiClient.delete<{ likes: number; liked: boolean }>(
        `/content/${id}/like`,
    );
    return res.data;
};

export const getComments = async (
    id: string,
): Promise<{ data: Comment[]; total: number }> => {
    const res = await apiClient.get<{ data: Comment[]; total: number }>(
        `/content/${id}/comments`,
    );
    return res.data;
};

export const addComment = async (
    id: string,
    text: string,
): Promise<Comment> => {
    const res = await apiClient.post<Comment>(`/content/${id}/comments`, {
        text,
    });
    return res.data;
};

export const addReply = async (
    id: string,
    commentId: string,
    text: string,
): Promise<Reply> => {
    const res = await apiClient.post<Reply>(
        `/content/${id}/comments/${commentId}/replies`,
        { text },
    );
    return res.data;
};
