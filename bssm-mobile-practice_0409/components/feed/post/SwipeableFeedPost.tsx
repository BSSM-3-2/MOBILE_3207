import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withSpring,
    runOnJS,
    clamp,
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
    // TODO: translateX 선언 (실습 4-1)
    const translateX = useSharedValue(0);
    // TODO: cardScale 선언 (실습 5-1)
    const cardScale = useSharedValue(1);

    // TODO: panGesture 정의 (실습 4-2)
    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate(e => {
            translateX.value = clamp(e.translationX, -DELETE_AREA_WIDTH, 0);
        })
        .onEnd(() => {
            if (translateX.value < DELETE_THRESHOLD) {
                translateX.value = withTiming(-DELETE_AREA_WIDTH);
            } else {
                translateX.value = withSpring(0);
            }
        });

    // TODO: longPressGesture 정의 (실습 5-2)
    const longPressGesture = Gesture.LongPress()
        .minDuration(400)
        .onStart(() => {
            cardScale.value = withTiming(0.95, { duration: 150 });
            runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        })
        .onFinalize(() => {
            // onEnd 대신 onFinalize: Race에서 다른 제스처가 이겨도 반드시 실행됨
            cardScale.value = withSpring(1);
        });

    // TODO: Gesture.Race로 합성 (실습 5-3)
    const composedGesture = Gesture.Race(longPressGesture, panGesture);

    // TODO: animatedStyle 정의 (실습 4-3)
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { scale: cardScale.value },
        ],
    }));

    // TODO: handleDeletePress 작성 (실습 4-4)
    const handleDeletePress = () => {
        translateX.value = withTiming(0, { duration: 200 }, () => {
            runOnJS(onDelete)(post.id);
        });
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
                <Animated.View style={animatedStyle}>
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
