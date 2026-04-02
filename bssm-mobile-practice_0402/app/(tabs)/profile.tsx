import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemedView } from '@components/themed-view';
import ProfileFeedList from '@components/profile/feed/ProfileFeedList';
import ContentContainer from '@components/container';
import NavigationTop from '@components/navigation/NavigationTop';
import { ProfileHeader } from '@components/profile/ProfileHeader';
import { useUserStore } from '@/store/user-store';

export default function ProfileScreen() {
    const {
        me,
        postMap,
        loading: _loading,
        fetchMe,
        fetchUserPosts,
    } = useUserStore();

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    useEffect(() => {
        if (me) fetchUserPosts(me.id);
    }, [me, fetchUserPosts]);

    if (!me) {
        return (
            <ThemedView style={{ flex: 1 }}>
                <ActivityIndicator style={{ flex: 1 }} />
            </ThemedView>
        );
    }

    const posts = postMap[me.id] ?? [];

    return (
        <ThemedView style={{ flex: 1 }}>
            <ContentContainer isTopElement={true}>
                <NavigationTop title={me.username} />
            </ContentContainer>
            <ProfileFeedList
                posts={posts}
                header={<ProfileHeader user={me} />}
            />
        </ThemedView>
    );
}
