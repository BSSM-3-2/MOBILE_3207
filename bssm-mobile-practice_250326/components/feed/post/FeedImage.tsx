import { Image, ImageLoadEventData } from 'expo-image';
import { Dimensions, ImageSourcePropType } from 'react-native';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FeedImage({ image }: { image: ImageSourcePropType }) {
    const [imageHeight, setImageHeight] = useState(SCREEN_WIDTH);

    // 이미지 비율 참조하여 이미지 크기 계산
    const handleImageLoad = (e: ImageLoadEventData) => {
        const { width, height } = e.source;
        const ratio = height / width;
        setImageHeight(SCREEN_WIDTH * ratio);
    };

    return (
        <Image
            source={image}
            style={{ width: SCREEN_WIDTH, height: imageHeight }}
            onLoad={handleImageLoad}
        />
    );
}
