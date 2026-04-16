import { ImageType } from '@type/Post';
import { ImageSourcePropType, Platform } from 'react-native';

const BASE_URL = Platform.select({
    default: 'http://localhost:3000',
});

function resolveRemoteUrl(url: string): string {
    if (url.startsWith('http')) return url;
    return `${BASE_URL}${url}`;
}

export function resolveImageSource(image: ImageType): ImageSourcePropType {
    if (image.type === 'REMOTE') {
        return { uri: resolveRemoteUrl(image.url) };
    }
    return image.source as ImageSourcePropType;
}
