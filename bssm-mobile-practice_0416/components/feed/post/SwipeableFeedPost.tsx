import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Post } from '@type/Post';
import { FeedPost } from './FeedPost';

const DELETE_AREA_WIDTH = 80;
const DELETE_THRESHOLD = -60;

function SwipeableFeedPost({
    post,
    onDelete,
}: {
    post: Post;
    onDelete: (id: string) => void;
}) {
    // 수평 이동 (스와이프 삭제)
    const translateX = useSharedValue(0);
    // 카드 크기 (롱프레스 피드백)
    const cardScale = useSharedValue(1);

    // --- Gesture.Pan: 스와이프 삭제 ---
    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate(e => {
            translateX.value = Math.min(
                0,
                Math.max(e.translationX, -DELETE_AREA_WIDTH),
            );
        })
        .onEnd(e => {
            if (e.translationX < DELETE_THRESHOLD) {
                translateX.value = withTiming(-DELETE_AREA_WIDTH);
            } else {
                translateX.value = withTiming(0);
            }
        });

    // --- Gesture.LongPress: 롱프레스 피드백 ---
    const longPressGesture = Gesture.LongPress()
        .minDuration(400)
        .onStart(() => {
            // SharedValue 수정 — UI 스레드 직접 실행
            cardScale.value = withSpring(0.96, { damping: 8 });
            // Haptics는 네이티브 JS 함수 → runOnJS 필요
            runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        })
        .onEnd(() => {
            cardScale.value = withSpring(1, { damping: 8 });
        })
        .onFinalize(() => {
            // 제스처가 어떻게 끝나든 scale 복구 (취소/완료 모두)
            cardScale.value = withSpring(1, { damping: 8 });
        });

    // Gesture.Race: 먼저 활성화되는 제스처가 나머지를 취소
    // - 빠른 스와이프 → Pan 활성화 → LongPress 취소
    // - 400ms 정지  → LongPress 활성화 → Pan 취소
    const composedGesture = Gesture.Race(longPressGesture, panGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { scale: cardScale.value },
        ],
    }));

    const handleDeletePress = () => {
        translateX.value = withTiming(0);
        runOnJS(onDelete)(post.id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.deleteArea}>
                <TouchableOpacity
                    onPress={handleDeletePress}
                    style={styles.deleteButton}
                >
                    <Ionicons name='trash-outline' size={24} color='white' />
                </TouchableOpacity>
            </View>

            <GestureDetector gesture={composedGesture}>
                <Animated.View
                    style={[animatedStyle, { backgroundColor: '#FFF' }]}
                >
                    <FeedPost post={post} />
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    deleteArea: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: DELETE_AREA_WIDTH,
        backgroundColor: '#ED4956',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
});

export { SwipeableFeedPost };
