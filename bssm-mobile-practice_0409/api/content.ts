import apiClient from './client';
import { Post, Comment, Reply } from '@type/Post';

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
