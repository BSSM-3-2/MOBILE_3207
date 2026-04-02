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
    // TODO: (3차) apiClient.get()으로 '/content/list'를 호출하고 res.data를 반환한다
    // 힌트: page와 limit는 params 옵션으로 전달한다
    throw new Error('TODO (3차): getFeed() 구현 필요');
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
