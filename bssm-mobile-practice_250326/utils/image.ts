import { ImageType } from '@type/Post';
import { ImageSourcePropType } from 'react-native';

export function resolveImageSource(image: ImageType): ImageSourcePropType {
    if (image.type === 'REMOTE') {
        return { uri: image.url };
    }
    return image.source as ImageSourcePropType;
}
