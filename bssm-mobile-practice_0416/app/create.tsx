import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
    Alert,
    Platform,
    Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    getMediaLibraryPermissionsAsync,
    requestMediaLibraryPermissionsAsync,
    launchImageLibraryAsync,
} from 'expo-image-picker';
import {
    getPermissionsAsync,
    scheduleNotificationAsync,
} from 'expo-notifications';
import { createPost } from '@/api/content';
import { useFeedStore } from '@/store/feed-store';
import { Pretendard, FontSizes, Spacing, FeedColors } from '@/constants/theme';

interface SelectedImage {
    uri: string;
    name: string;
    type: string;
}

// 업로드 성공 후 로컬 알림 예약
async function scheduleUploadNotification(caption: string) {
    const { status } = await getPermissionsAsync();
    if (status !== 'granted') return;

    await scheduleNotificationAsync({
        content: {
            title: '게시물 업로드 완료',
            body: caption
                ? `"${caption.length > 20 ? caption.slice(0, 20) + '…' : caption}" 게시물이 업로드되었습니다.`
                : '새 게시물이 업로드되었습니다.',
            data: { screen: 'feed' },
        },
        trigger: { seconds: 3 },
    });
}

export default function CreateScreen() {
    const insets = useSafeAreaInsets();
    const { prependPost } = useFeedStore();
    const router = useRouter();

    const [images, setImages] = useState<SelectedImage[]>([]);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);

    const canSubmit =
        (images.length > 0 || caption.trim().length > 0) && !loading;

    // ── 이미지 선택 ──────────────────────────────────────────────
    const handlePickImage = async () => {
        const { status, canAskAgain } = await getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            if (!canAskAgain) {
                Alert.alert(
                    '갤러리 접근 권한 필요',
                    '사진을 선택하려면 설정에서 갤러리 접근 권한을 허용해 주세요.',
                    [
                        { text: '취소', style: 'cancel' },
                        {
                            text: '설정으로 이동',
                            onPress: () => Linking.openSettings(),
                        },
                    ],
                );
                return;
            }
            if (Platform.OS === 'ios' && status === 'undetermined') {
                const userConfirmed = await new Promise<boolean>(resolve => {
                    Alert.alert(
                        '사진 라이브러리 접근',
                        '게시물 작성을 위해 사진 라이브러리에 접근합니다.',
                        [
                            {
                                text: '취소',
                                onPress: () => resolve(false),
                                style: 'cancel',
                            },
                            { text: '괜찮아요', onPress: () => resolve(true) },
                        ],
                    );
                });
                if (!userConfirmed) return;
            }
            const { status: newStatus } =
                await requestMediaLibraryPermissionsAsync();
            if (newStatus !== 'granted') {
                Alert.alert(
                    '갤러리 접근 권한 필요',
                    '사진을 선택하려면 갤러리 접근 권한이 필요합니다.',
                );
                return;
            }
        }
        const result = await launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.8,
            allowsMultipleSelection: true,
        });
        if (result.canceled) return;
        const picked = result.assets.map(asset => ({
            uri: asset.uri,
            name: asset.fileName ?? `photo_${Date.now()}.jpg`,
            type: asset.mimeType ?? 'image/jpeg',
        }));
        setImages(prev => [...prev, ...picked].slice(0, 10));
    };

    const handleRemoveImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    // ── 업로드 ────────────────────────────────────────────────────
    const handleSubmit = async () => {
        if (!canSubmit) return;
        setLoading(true);
        try {
            const post = await createPost({
                caption: caption.trim() || undefined,
                images: images.length > 0 ? images : undefined,
            });

            // 피드 맨 앞에 낙관적으로 추가
            prependPost(post);

            // 로컬 알림 예약
            await scheduleUploadNotification(caption.trim());

            // 초기화
            setImages([]);
            setCaption('');
        } catch {
            Alert.alert(
                '업로드 실패',
                '게시물을 올리는 데 실패했습니다. 다시 시도해 주세요.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.root, { paddingTop: insets.top }]}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
                    <Ionicons name='chevron-back' size={26} color='#262626' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>새 게시물</Text>
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!canSubmit}
                    hitSlop={8}
                >
                    {loading ? (
                        <ActivityIndicator size='small' color='#0095F6' />
                    ) : (
                        <Text
                            style={[
                                styles.shareButton,
                                !canSubmit && styles.shareButtonDisabled,
                            ]}
                        >
                            공유
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
                {/* 이미지 선택 영역 */}
                <View style={styles.imageSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.imageRow}
                    >
                        {/* 추가 버튼 */}
                        {images.length < 10 && (
                            <TouchableOpacity
                                style={styles.addImageButton}
                                onPress={handlePickImage}
                                activeOpacity={0.7}
                            >
                                <Ionicons
                                    name='image-outline'
                                    size={32}
                                    color='#8e8e8e'
                                />
                                <Text style={styles.addImageLabel}>
                                    {images.length === 0
                                        ? '사진 선택'
                                        : `+추가 (${images.length}/10)`}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* 선택된 이미지 썸네일 */}
                        {images.map((img, index) => (
                            <View key={img.uri} style={styles.thumbWrapper}>
                                <Image
                                    source={{ uri: img.uri }}
                                    style={styles.thumb}
                                />
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => handleRemoveImage(index)}
                                    hitSlop={4}
                                >
                                    <Ionicons
                                        name='close-circle'
                                        size={20}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
                                {index === 0 && (
                                    <View style={styles.coverBadge}>
                                        <Text style={styles.coverBadgeText}>
                                            대표
                                        </Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* 캡션 입력 */}
                <View style={styles.captionSection}>
                    <TextInput
                        style={styles.captionInput}
                        placeholder='문구를 입력하세요...'
                        placeholderTextColor='#999'
                        value={caption}
                        onChangeText={setCaption}
                        multiline
                        maxLength={2200}
                        textAlignVertical='top'
                    />
                    <Text style={styles.captionCount}>
                        {caption.length} / 2200
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const THUMB_SIZE = 100;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DBDBDB',
    },
    headerTitle: {
        fontFamily: Pretendard.semiBold,
        fontSize: FontSizes.md,
        color: FeedColors.primaryText,
    },
    shareButton: {
        fontFamily: Pretendard.semiBold,
        fontSize: FontSizes.sm,
        color: '#0095F6',
    },
    shareButtonDisabled: {
        color: '#B2DFFC',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    imageSection: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DBDBDB',
        paddingVertical: Spacing.xl,
    },
    imageRow: {
        paddingHorizontal: Spacing.xl,
        gap: Spacing.sm,
        alignItems: 'flex-start',
    },
    addImageButton: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#DBDBDB',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        backgroundColor: '#FAFAFA',
    },
    addImageLabel: {
        fontFamily: Pretendard.medium,
        fontSize: 11,
        color: '#8e8e8e',
        textAlign: 'center',
    },
    thumbWrapper: {
        position: 'relative',
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: 8,
        overflow: 'hidden',
    },
    thumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: 8,
    },
    removeButton: {
        position: 'absolute',
        top: 4,
        right: 4,
    },
    coverBadge: {
        position: 'absolute',
        bottom: 4,
        left: 4,
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 4,
    },
    coverBadgeText: {
        fontFamily: Pretendard.semiBold,
        fontSize: 10,
        color: '#fff',
    },
    captionSection: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.sm,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DBDBDB',
    },
    captionInput: {
        fontFamily: Pretendard.regular,
        fontSize: FontSizes.sm,
        color: FeedColors.primaryText,
        minHeight: 100,
        lineHeight: 22,
        ...Platform.select({ android: { paddingTop: 0 } }),
    },
    captionCount: {
        fontFamily: Pretendard.regular,
        fontSize: 12,
        color: '#c7c7c7',
        textAlign: 'right',
        marginTop: 4,
    },
    hint: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xl,
    },
    hintText: {
        fontFamily: Pretendard.regular,
        fontSize: FontSizes.xs,
        color: '#8e8e8e',
    },
});
