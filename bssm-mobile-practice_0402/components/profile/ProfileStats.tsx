import { View, StyleSheet } from 'react-native';
import User, { UserAnalytics } from '@type/User';
import { ThemedText } from '@components/themed-text';
import { FontSizes, Pretendard } from '@/constants/theme';

type StatItemProps = {
    label: string;
    value: number;
};

function StatItem({ label, value }: StatItemProps) {
    return (
        <View style={profileStyles.infoContainer}>
            <ThemedText style={profileStyles.infoValue}>
                {value.toLocaleString()}
            </ThemedText>
            <ThemedText style={profileStyles.infoKey}>{label}</ThemedText>
        </View>
    );
}

function ProfileStats({
    user,
    userAnalytics,
}: {
    user: User;
    userAnalytics?: UserAnalytics;
}) {
    return (
        <View style={profileStyles.infoParent}>
            <StatItem
                label='posts'
                value={userAnalytics?.post ?? user.postsCount}
            />
            <StatItem
                label='followers'
                value={userAnalytics?.follower ?? user.followersCount}
            />
            <StatItem
                label='following'
                value={userAnalytics?.following ?? user.followingCount}
            />
        </View>
    );
}

const profileStyles = StyleSheet.create({
    infoParent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
    },
    infoContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    infoKey: {
        fontSize: FontSizes.sm,
        lineHeight: FontSizes.sm + 2,
        fontFamily: Pretendard.semiBold,
    },
    infoValue: {
        fontSize: FontSizes.md,
        lineHeight: FontSizes.lg + 2,
        fontWeight: '700',
    },
});

export { ProfileStats };
