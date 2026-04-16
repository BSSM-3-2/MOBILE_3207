import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Pretendard } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <Text
            style={[
                { color },
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                style,
                styles.noPad,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: Pretendard.regular,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: Pretendard.medium,
    },
    title: {
        fontSize: 32,
        lineHeight: 32,
        fontFamily: Pretendard.bold,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: Pretendard.bold,
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
        fontFamily: Pretendard.regular,
    },
    noPad: {
        includeFontPadding: false,
    },
});
