import { ImageType } from '@type/Post';
import { ImageSourcePropType, Platform } from 'react-native';

const BASE_URL = Platform.select({
    default: 'https://bssm-api.zer0base.me',
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
