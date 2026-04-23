import { create } from 'zustand';
import { Post } from '@type/Post';
import { getFeed, likePost, unlikePost } from '@/api/content';

interface FeedState {
    posts: Post[];
    page: number;
    hasNext: boolean;
    loading: boolean;
    error: string | null;

    fetchFeed: () => Promise<void>;
    loadMore: () => Promise<void>;
    toggleLike: (postId: string) => Promise<void>;
    removePost: (postId: string) => void;
    prependPost: (post: Post) => void;
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
            set({ error: '피드를 불러오지 못했습니다.', loading: false });
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
        } catch (e) {
            set({ loading: false });
        }
    },

    // 낙관적 업데이트: UI를 먼저 바꾸고 API 호출 → 실패 시 원상복구
    toggleLike: async (postId: string) => {
        const { posts } = get();
        const target = posts.find(p => p.id === postId);
        if (!target) return;

        const wasLiked = target.liked;

        // 1) 즉시 UI 반영
        set({
            posts: posts.map(p =>
                p.id === postId
                    ? {
                          ...p,
                          liked: !wasLiked,
                          likes: wasLiked ? p.likes - 1 : p.likes + 1,
                      }
                    : p,
            ),
        });

        try {
            // 2) API 호출
            const result = wasLiked
                ? await unlikePost(postId)
                : await likePost(postId);
            // 3) 서버 응답으로 최종 동기화
            set({
                posts: get().posts.map(p =>
                    p.id === postId
                        ? { ...p, likes: result.likes, liked: result.liked }
                        : p,
                ),
            });
        } catch {
            // 4) 실패 시 롤백
            set({
                posts: get().posts.map(p =>
                    p.id === postId
                        ? {
                              ...p,
                              liked: wasLiked,
                              likes: wasLiked ? p.likes + 1 : p.likes - 1,
                          }
                        : p,
                ),
            });
        }
    },

    removePost: (postId: string) => {
        set({ posts: get().posts.filter(p => p.id !== postId) });
    },

    prependPost: (post: Post) => {
        set({ posts: [post, ...get().posts] });
    },
}));
