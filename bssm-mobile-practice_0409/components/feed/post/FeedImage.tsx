import { Image, ImageLoadEventData } from 'expo-image';
import { Dimensions, ImageSourcePropType, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    clamp,
    withSequence,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';

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

    // TODO: scale, savedScale 선언 (실습 2-1)
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    // TODO: heartOpacity, heartScale 선언 (실습 3-1)
    const heartOpacity = useSharedValue(0);
    const heartScale = useSharedValue(0);

    // TODO: pinchGesture 정의 (실습 2-2)
    const pinchGesture = Gesture.Pinch()
        .onUpdate(e => {
            scale.value = clamp(savedScale.value * e.scale, 1, MAX_SCALE);
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    // TODO: doubleTapGesture 정의 (실습 3-2)
    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            // 힌트: onDoubleTap()을 직접 호출하면 "Calling JS functions from the UI thread is not allowed"
            // runOnJS로 감싸야 JS 스레드에서 안전하게 실행됨
            if (onDoubleTap) runOnJS(onDoubleTap)();

            heartScale.value = withSequence(
                withTiming(1.2, { duration: 200 }),
                withTiming(1, { duration: 100 }),
            );
            heartOpacity.value = withSequence(
                withTiming(1, { duration: 150 }),
                withTiming(0, { duration: 400 }),
            );
        });

    // TODO: Gesture.Simultaneous로 합성 (실습 3-3)
    const composedGesture = Gesture.Simultaneous(
        pinchGesture,
        doubleTapGesture,
    );

    // TODO: imageAnimatedStyle 정의 (실습 2-3)
    const imageAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // TODO: heartAnimatedStyle 정의 (실습 3-4)
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
        // TODO: GestureDetector + Animated.View 감싸기 (실습 2-4)
        // TODO: 하트 오버레이 추가 (실습 3-5)
        <GestureDetector gesture={composedGesture}>
            <Animated.View style={imageAnimatedStyle}>
                <Image
                    source={image}
                    style={{ width: SCREEN_WIDTH, height: imageHeight }}
                    onLoad={handleImageLoad}
                />
                {/* TODO: 하트 오버레이 추가 (실습 3-5) */}
                <Animated.View
                    style={[styles.heartOverlay, heartAnimatedStyle]}
                    pointerEvents='none'
                >
                    <Animated.Text style={{ fontSize: 100 }}>❤️</Animated.Text>
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
