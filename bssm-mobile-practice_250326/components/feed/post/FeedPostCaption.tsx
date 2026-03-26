import { StyleSheet, Text } from 'react-native';
import { ThemedText } from '@components/themed-text';
import { FontSizes, Pretendard, Spacing } from '@/constants/theme';

type Props = {
    username: string;
    caption: string;
    timestamp: string;
};

function FeedPostCaption({ username, caption, timestamp }: Props) {
    return (
        <>
            <ThemedText style={styles.caption} numberOfLines={2}>
                <Text style={styles.bold}>{username}</Text>
                {'  '}
                {caption}
            </ThemedText>
            <ThemedText style={styles.timestamp}>{timestamp}</ThemedText>
        </>
    );
}

const styles = StyleSheet.create({
    caption: {
        fontSize: FontSizes.md,
        marginBottom: Spacing.xs,
        marginTop: Spacing.sm,
        fontFamily: Pretendard.regular,
        lineHeight: FontSizes.md + 5,
    },
    bold: {
        fontFamily: Pretendard.semiBold,
    },
    timestamp: {
        fontSize: FontSizes.xs,
        color: '#8E8E8E',
    },
});

export { FeedPostCaption };
