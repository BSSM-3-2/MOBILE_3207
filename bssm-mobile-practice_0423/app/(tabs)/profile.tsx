import { useEffect, useCallback } from 'react';
import { ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@components/themed-view';
import ProfileFeedList from '@components/profile/feed/ProfileFeedList';
import ContentContainer from '@components/container';
import NavigationTop from '@components/navigation/NavigationTop';
import { ProfileHeader } from '@components/profile/ProfileHeader';
import { useUserStore } from '@/store/user-store';
import { useAuthStore } from '@/store/auth-store';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ProfileScreen() {
    const { me, postMap, fetchMe, fetchUserPosts } = useUserStore();
    const { logOut } = useAuthStore();
    const iconColor = useThemeColor({}, 'text');

    useEffect(() => {
        fetchMe();
    }, []);

    useEffect(() => {
        if (me) fetchUserPosts(me.id);
    }, [me?.id]);

    const handleLogOut = useCallback(() => {
        Alert.alert('로그아웃', '정말 로그아웃할까요?', [
            { text: '취소', style: 'cancel' },
            {
                text: '로그아웃',
                style: 'destructive',
                onPress: logOut,
            },
        ]);
    }, [logOut]);

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
                <NavigationTop
                    title={me.username}
                    rightButtons={
                        <TouchableOpacity onPress={handleLogOut} hitSlop={12}>
                            <Ionicons
                                name='log-out-outline'
                                size={26}
                                color={iconColor}
                            />
                        </TouchableOpacity>
                    }
                />
            </ContentContainer>
            <ProfileFeedList
                posts={posts}
                header={<ProfileHeader user={me} />}
            />
        </ThemedView>
    );
}
