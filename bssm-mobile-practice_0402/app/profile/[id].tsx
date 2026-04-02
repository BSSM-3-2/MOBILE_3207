import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';

import { ThemedView } from '@components/themed-view';
import ProfileFeedList from '@components/profile/feed/ProfileFeedList';
import { ProfileHeader } from '@components/profile/ProfileHeader';
import { useUserStore } from '@/store/user-store';

export default function UserProfileScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { profileMap, postMap, loading, fetchUser, fetchUserPosts } =
        useUserStore();

    useEffect(() => {
        if (id) {
            fetchUser(id);
            fetchUserPosts(id);
        }
    }, [id, fetchUser, fetchUserPosts]);

    const user = profileMap[id];
    const posts = postMap[id] ?? [];

    if (!user) {
        return (
            <ThemedView style={styles.notFound}>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <Text style={styles.notFoundText}>
                        유저를 찾을 수 없어요.
                    </Text>
                )}
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <ProfileHeader
                user={user}
                userAnalytics={{
                    post: posts.length,
                }}
            />
            <ProfileFeedList posts={posts} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundText: {
        fontSize: 16,
        opacity: 0.5,
    },
});
