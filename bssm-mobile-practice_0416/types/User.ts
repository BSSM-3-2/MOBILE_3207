interface User {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    postsCount: number;
    followersCount: number;
    followingCount: number;
}

interface UserAnalytics {
    post?: number;
    follower?: number;
    following?: number;
}

export default User;
export type { UserAnalytics };
