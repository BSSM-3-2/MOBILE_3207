import { create } from 'zustand';
import { Post } from '@type/Post';
import { getFeed } from '@/api/content';
// TODO: (5차) toggleLike 구현 시 필요한 함수를 import에 추가한다
import { likePost, unlikePost } from '@/api/content';

interface FeedState {
    posts: Post[];
    page: number;
    hasNext: boolean;
    loading: boolean;
    error: string | null;

    fetchFeed: () => Promise<void>;
    loadMore: () => Promise<void>;
    toggleLike: (postId: string) => Promise<void>;
}

export const useFeedStore = create<FeedState>((set, get) => ({
    posts: [],
    page: 1,
    hasNext: false,
    loading: false,
    error: null,

    fetchFeed: async () => {
        set({ loading: true, error: null });
        try {
            const { data, pagination } = await getFeed(1);
            set({
                posts: data,
                page: 1,
                hasNext: pagination.hasNext,
                loading: false,
            });
        } catch (e) {
            set({ loading: false, error: (e as Error).message });
        }
    },

    loadMore: async () => {
        const { loading, hasNext, page, posts } = get();
        if (loading || !hasNext) return;

        set({ loading: true });
        try {
            const nextPage = page + 1;
            const { data, pagination } = await getFeed(nextPage);
            set({
                posts: [...posts, ...data],
                page: nextPage,
                hasNext: pagination.hasNext,
                loading: false,
            });
        } catch {
            set({ loading: false });
        }
    },

    // 낙관적 업데이트: UI를 먼저 바꾸고 API 호출 → 실패 시 원상복구
    toggleLike: async (postId: string) => {
        const { posts } = get();
        const target = posts.find(p => p.id === postId);
        if (!target) return;

        // ① UI 즉시 반영
        const optimistic = (p: Post) =>
            p.id === postId
                ? { ...p, liked: !target.liked, likes: target.liked ? p.likes - 1 : p.likes + 1 }
                : p;
        set({ posts: get().posts.map(optimistic) });

        // ② API 호출 → ③ 서버 응답으로 동기화
        try {
            const { likes, liked } = target.liked
                ? await unlikePost(postId)
                : await likePost(postId);
            set({
                posts: get().posts.map(p =>
                    p.id === postId ? { ...p, likes, liked } : p,
                ),
            });
        } catch {
            // ④ 실패 시 롤백 — get().posts: 동시 업데이트 반영된 최신 상태 기준
            set({
                posts: get().posts.map(p =>
                    p.id === postId ? { ...p, liked: target.liked, likes: target.likes } : p,
                ),
            });
        }
    },
}));
