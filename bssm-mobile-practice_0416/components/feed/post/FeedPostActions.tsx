import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ThemedText } from '@components/themed-text';
import { FeedColors, Spacing } from '@/constants/theme';
import { ThemedView } from '@components/themed-view';
import { useFeedStore } from '@/store/feed-store';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withSpring,
} from 'react-native-reanimated';

function FeedPostActions({
    postId,
    initialLikes,
    initialLiked = false,
    commentCount = 0,
}: {
    postId: string;
    initialLikes: number;
    initialLiked?: boolean;
    commentCount?: number;
}) {
    const [saved, setSaved] = useState(false);
    const { posts, toggleLike } = useFeedStore();

    // 스토어의 최신 상태를 우선 사용, 없으면 props 초기값 fallback
    const post = posts.find(p => p.id === postId);
    const liked = post?.liked ?? initialLiked;
    const likeCount = post?.likes ?? initialLikes;

    // --- Reanimated: 하트 애니메이션 ---
    // useSharedValue: JS 스레드와 UI 스레드가 공유하는 값
    const heartScale = useSharedValue(1);

    // useAnimatedStyle: UI 스레드에서 직접 실행되는 스타일 (worklet)
    const heartAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: heartScale.value }],
    }));

    const handleLike = () => {
        // withSequence: 애니메이션을 순서대로 실행
        // withSpring: 스프링 물리 기반 애니메이션 (JS 브리지 없이 UI 스레드에서 실행)
        heartScale.value = withSequence(
            withSpring(1.4, { damping: 3, stiffness: 300 }),
            withSpring(1, { damping: 5, stiffness: 200 }),
        );
        toggleLike(postId);
    };
    // ------------------------------------

    const handleSave = () => setSaved(prev => !prev);

    return (
        <ThemedView style={styles.actions}>
            <ThemedView style={styles.leftActions}>
                <TouchableOpacity
                    onPress={handleLike}
                    style={[styles.actionButton, styles.row]}
                >
                    {/* Animated.View: useAnimatedStyle 적용을 위한 Reanimated 뷰 */}
                    <Animated.View style={heartAnimatedStyle}>
                        <Ionicons
                            name={liked ? 'heart' : 'heart-outline'}
                            size={26}
                            color={
                                liked
                                    ? FeedColors.likeActive
                                    : FeedColors.primaryText
                            }
                        />
                    </Animated.View>
                    <ThemedText style={styles.countText}>
                        {likeCount.toLocaleString()}
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.row]}>
                    <Ionicons
                        name='chatbubble-outline'
                        size={24}
                        color={FeedColors.primaryText}
                    />
                    <ThemedText style={styles.countText}>
                        {commentCount.toLocaleString()}
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                        name='paper-plane-outline'
                        size={24}
                        color={FeedColors.primaryText}
                    />
                </TouchableOpacity>
            </ThemedView>

            <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
                <Ionicons
                    name={saved ? 'bookmark' : 'bookmark-outline'}
                    size={24}
                    color={FeedColors.primaryText}
                />
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.md,
    },
    leftActions: {
        flexDirection: 'row',
        gap: Spacing.lg,
    },
    actionButton: {
        padding: 2,
    },
    row: {
        flexDirection: 'row',
        gap: Spacing.xs,
        alignItems: 'center',
    },
    countText: {
        fontWeight: '600',
    },
});

export { FeedPostActions };
