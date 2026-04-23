import { Image, ImageLoadEventData } from 'expo-image';
import { Dimensions, ImageSourcePropType, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
    withDelay,
    runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_SCALE = 3;

export default function FeedImage({
    image,
    onDoubleTap,
}: {
    image: ImageSourcePropType;
    onDoubleTap?: () => void;
}) {
    const [imageHeight, setImageHeight] = useState(SCREEN_WIDTH);

    // --- 핀치줌 SharedValues ---
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    // --- 더블탭 하트 오버레이 SharedValues ---
    const heartOpacity = useSharedValue(0);
    const heartScale = useSharedValue(0.5);

    // Gesture.Pinch: 두 손가락 핀치 → 이미지 확대/축소
    const pinchGesture = Gesture.Pinch()
        .onUpdate(e => {
            scale.value = Math.max(
                1,
                Math.min(savedScale.value * e.scale, MAX_SCALE),
            );
        })
        .onEnd(() => {
            savedScale.value = scale.value;
            if (scale.value <= 1) {
                scale.value = withSpring(1);
                savedScale.value = 1;
            }
        });

    // Gesture.Tap (numberOfTaps=2): 더블탭 → 하트 애니메이션 + 좋아요
    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            // SharedValue 수정은 UI 스레드에서 직접 실행 — runOnJS 불필요
            heartOpacity.value = withSequence(
                withTiming(1, { duration: 100 }),
                withDelay(500, withTiming(0, { duration: 300 })),
            );
            heartScale.value = withSequence(
                withSpring(1.3, { damping: 4 }),
                withDelay(400, withSpring(0.8, { damping: 6 })),
            );
            // JS 함수(toggleLike)는 runOnJS로 JS 스레드에서 호출
            if (onDoubleTap) runOnJS(onDoubleTap)();
        });

    // Gesture.Simultaneous: 핀치와 더블탭을 동시에 인식
    // (핀치 중 탭, 탭 중 핀치 모두 처리)
    const composedGesture = Gesture.Simultaneous(
        pinchGesture,
        doubleTapGesture,
    );

    const imageAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const heartAnimatedStyle = useAnimatedStyle(() => ({
        opacity: heartOpacity.value,
        transform: [{ scale: heartScale.value }],
    }));

    const handleImageLoad = (e: ImageLoadEventData) => {
        const { width, height } = e.source;
        const ratio = height / width;
        setImageHeight(SCREEN_WIDTH * ratio);
    };

    return (
        <GestureDetector gesture={composedGesture}>
            <Animated.View
                style={[
                    imageAnimatedStyle,
                    { width: SCREEN_WIDTH, height: imageHeight },
                ]}
            >
                <Image
                    source={image}
                    style={{ width: SCREEN_WIDTH, height: imageHeight }}
                    onLoad={handleImageLoad}
                />
                {/* 더블탭 시 나타나는 하트 오버레이 */}
                <Animated.View
                    style={[styles.heartOverlay, heartAnimatedStyle]}
                    pointerEvents='none'
                >
                    <Ionicons name='heart' size={80} color='white' />
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    heartOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
