import { ReactElement, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ContentContainer({
    children,
    isTopElement = false,
    style,
}: {
    children: ReactNode;
    isTopElement?: boolean;
    style?: StyleProp<ViewStyle>;
}): ReactElement {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                { paddingTop: isTopElement ? insets.top : 0 },
                styles.content,
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        gap: 16,
        overflow: 'hidden',
    },
});
