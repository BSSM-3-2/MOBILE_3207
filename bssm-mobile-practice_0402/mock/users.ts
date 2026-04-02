import User from '@type/User';

const MOCK_USERS: User[] = [
    {
        id: 'a3f1c2d4-11b0-4e8a-9f23-bc4501d6e780',
        username: 'Aeong.E',
        displayName: '애옹이',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
        bio: '야옹',
        postsCount: 47,
        followersCount: 3200,
        followingCount: 289,
    },
    {
        id: 'b7e9a012-33c4-4d5f-8a61-df2390e4c105',
        username: 'pdh0128a',
        displayName: 'Park',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        bio: '안녕하세요!',
        postsCount: 12,
        followersCount: 340,
        followingCount: 97,
    },
    {
        id: 'c2d84f56-77a1-4b3e-b092-1e56780f3a29',
        username: 'YeoPEVA',
        displayName: 'Yeop',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
        bio: 'Music is my life.',
        postsCount: 28,
        followersCount: 5820,
        followingCount: 210,
    },
    {
        id: 'd901b3e7-cc20-4f6a-a514-8b34fd021c67',
        username: 'cat.lover',
        displayName: '고양이집사',
        avatarUrl: 'https://i.pravatar.cc/150?img=9',
        bio: '우리집 애옹이가 최고야',
        postsCount: 63,
        followersCount: 1204,
        followingCount: 455,
    },
    {
        id: 'e148c590-55f2-4a7d-bc83-0d67921efa34',
        username: 'food_fighter',
        displayName: '먹보',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
        bio: '먹기 위해 산다',
        postsCount: 91,
        followersCount: 780,
        followingCount: 312,
    },
    {
        id: 'f36da027-89e4-4c10-9b52-7a4f305bc811',
        username: 'travel.to.busan',
        displayName: '부산여행러',
        avatarUrl: 'https://i.pravatar.cc/150?img=20',
        bio: '부산은 언제나 옳다',
        postsCount: 34,
        followersCount: 2910,
        followingCount: 188,
    },
    {
        id: '04a7e261-f0b3-4d98-8c15-6e23d9a07b52',
        username: 'ba.lover',
        displayName: '선생님',
        avatarUrl: 'https://i.pravatar.cc/150?img=34',
        bio: '키보토스를 지킵니다',
        postsCount: 58,
        followersCount: 9341,
        followingCount: 73,
    },
];

export const MOCK_USERS_MAP: Record<string, User> = Object.fromEntries(
    MOCK_USERS.map(user => [user.id, user]),
);

export default MOCK_USERS;
