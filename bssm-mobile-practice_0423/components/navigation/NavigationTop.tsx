import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, ReactNode } from 'react';
import { ThemedView } from '@components/themed-view';

export default function NavigationTop({
    icon,
    title,
    rightButtons,
}: {
    icon?: ComponentProps<typeof Ionicons>['name'];
    title: string;
    rightButtons?: ReactNode;
}) {
    return (
        <ThemedView
            style={[
                {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                },
            ]}
        >
            <ThemedView
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 5,
                }}
            >
                {/* 아이콘(존재할 경우)의 위치 */}
                {icon ? (
                    <ThemedText style={styles.default}>
                        <Ionicons name={icon} size={26} />
                    </ThemedText>
                ) : null}

                {/* 상단 네비게이션바 이름 위치 */}
                <ThemedText style={styles.default}>{title}</ThemedText>
            </ThemedView>

            {/* 우측 버튼 위치 */}
            {rightButtons ?? null}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 24,
        lineHeight: 24,
        paddingVertical: 20,
        fontFamily: 'Pretendard-Bold',
    },
});
