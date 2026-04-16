import { Image, StyleSheet } from 'react-native';
import User, { UserAnalytics } from '@type/User';
import { ThemedText } from '@components/themed-text';
import {
    AvatarSizes,
    FeedColors,
    FontSizes,
    Pretendard,
    Spacing,
} from '@/constants/theme';
import ContentContainer from '@components/container';
import { ProfileStats } from '@components/profile/ProfileStats';
import { ThemedView } from '@components/themed-view';

function ProfileHeader({
    user,
    userAnalytics,
}: {
    user: User;
    userAnalytics?: UserAnalytics;
}) {
    return (
        <ContentContainer style={styles.topContainer}>
            <ThemedView style={styles.container}>
                <Image
                    source={{ uri: user.avatarUrl }}
                    style={styles.avatar}
                    resizeMode='cover'
                />
                <ThemedView style={styles.column}>
                    <ThemedText style={styles.displayName}>
                        {user.displayName}
                    </ThemedText>
                    <ProfileStats user={user} userAnalytics={userAnalytics} />
                </ThemedView>
            </ThemedView>
            <ThemedText style={styles.bio}>{user.bio}</ThemedText>
        </ContentContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: Spacing.xl,
        gap: Spacing.lg,
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        gap: Spacing.sm,
    },
    avatar: {
        width: AvatarSizes.xl,
        height: AvatarSizes.xl,
        borderRadius: AvatarSizes.xl / 2,
    },
    displayName: {
        fontSize: FontSizes.md,
        fontFamily: Pretendard.bold,
    },
    bio: {
        fontSize: FontSizes.md,
        color: FeedColors.primaryText,
        fontFamily: Pretendard.medium,
    },
    topContainer: {
        gap: 0,
        paddingBottom: Spacing.lg,
    },
});

export { ProfileHeader };
