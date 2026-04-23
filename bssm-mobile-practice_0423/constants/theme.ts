/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Pretendard = {
    regular:   'Pretendard-Regular',
    medium:    'Pretendard-Medium',
    semiBold:  'Pretendard-SemiBold',
    bold:      'Pretendard-Bold',
    extraBold: 'Pretendard-ExtraBold',
} as const;

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Spacing = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 10,
    lg: 14,
    xl: 16,
    xxl: 24,
};

export const Grid = {
    /** 프로필 피드 그리드 열 수 */
    profileColumnCount: 3,
    /** 프로필 피드 이미지 세로 비율 (height = width * ratio) */
    profileImageRatio: 1.25,
    /** 그리드 아이템 간 간격 */
    gap: Spacing.xxs,
};

export const FontSizes = {
    xs: 13,
    sm: 15,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
};

export const AvatarSizes = {
    sm: 28,
    md: 36,
    lg: 64,
    xl: 86,
};

export const FeedColors = {
    primaryText: '#262626',
    likeActive: '#ED4956',
};

export const Colors = {
    light: {
        text: '#11181C',
        background: '#fff',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: '#ECEDEE',
        background: '#151718',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
    },
};

export const Fonts = Platform.select({
    ios: {
        /** iOS `UIFontDescriptorSystemDesignDefault` */
        sans: 'system-ui',
        /** iOS `UIFontDescriptorSystemDesignSerif` */
        serif: 'ui-serif',
        /** iOS `UIFontDescriptorSystemDesignRounded` */
        rounded: 'ui-rounded',
        /** iOS `UIFontDescriptorSystemDesignMonospaced` */
        mono: 'ui-monospace',
    },
    default: {
        sans: 'normal',
        serif: 'serif',
        rounded: 'normal',
        mono: 'monospace',
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded:
            "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
});
