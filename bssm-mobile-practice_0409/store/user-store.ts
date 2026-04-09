import { create } from 'zustand';
import User from '@type/User';
import { Post } from '@type/Post';
import { getMe, getUserById, getUserPosts } from '@/api/users';

interface UserState {
    me: User | null;
    profileMap: Record<string, User>; // id → User 캐시
    postMap: Record<string, Post[]>; // userId → 게시물 캐시
    loading: boolean;
    error: string | null;

    fetchMe: () => Promise<void>;
    fetchUser: (id: string) => Promise<void>;
    fetchUserPosts: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
    me: null,
    profileMap: {},
    postMap: {},
    loading: false,
    error: null,

    fetchMe: async () => {
        set({ loading: true, error: null });
        try {
            const user = await getMe();
            set(state => ({
                me: user,
                profileMap: { ...state.profileMap, [user.id]: user },
                loading: false,
            }));
        } catch {
            set({ error: '내 정보를 불러오지 못했습니다.', loading: false });
        }
    },

    fetchUser: async (id: string) => {
        // 이미 캐시에 있으면 API 호출 생략
        if (get().profileMap[id]) return;

        set({ loading: true, error: null });
        try {
            const user = await getUserById(id);
            set(state => ({
                profileMap: { ...state.profileMap, [id]: user },
                loading: false,
            }));
        } catch {
            set({ error: '유저 정보를 불러오지 못했습니다.', loading: false });
        }
    },

    fetchUserPosts: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await getUserPosts(id);
            set(state => ({
                postMap: { ...state.postMap, [id]: data },
                loading: false,
            }));
        } catch {
            set({ error: '게시물을 불러오지 못했습니다.', loading: false });
        }
    },
}));
