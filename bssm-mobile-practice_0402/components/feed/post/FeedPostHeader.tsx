import { Image, StyleSheet } from 'react-native';
import User from '@type/User';
import ContentContainer from '@components/container';
import { ThemedText } from '@components/themed-text';
import { AvatarSizes, FontSizes, Pretendard, Spacing } from '@/constants/theme';
import { Link } from 'expo-router';

function FeedPostHeader({ user }: { user: User }) {
    return (
        <Link href={`/profile/${user.id}`}>
            <ContentContainer style={styles.container}>
                <Image
                    source={{ uri: user.avatarUrl }}
                    style={styles.avatar}
                    resizeMode='cover'
                />
                <ThemedText style={styles.username}>{user.username}</ThemedText>
            </ContentContainer>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: Spacing.md,
        alignItems: 'center',
        paddingBottom: Spacing.md,
    },
    avatar: {
        width: AvatarSizes.md,
        height: AvatarSizes.md,
        borderRadius: AvatarSizes.md / 2,
    },
    username: {
        fontFamily: Pretendard.semiBold,
        fontSize: FontSizes.md,
    },
});

export { FeedPostHeader };
