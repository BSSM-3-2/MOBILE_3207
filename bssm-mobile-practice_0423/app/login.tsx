import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    TextInput as RNTextInput,
    Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/auth-store';
import { Pretendard, FontSizes, Spacing } from '@/constants/theme';

export default function LoginScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { logIn, loading, error, clearError } = useAuthStore();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const passwordRef = useRef<RNTextInput>(null);

    const isFormValid = username.trim().length > 0 && password.length > 0;

    const handleLogin = async () => {
        if (!isFormValid) return;
        clearError();
        try {
            await logIn({ username: username.trim(), password });
            router.replace('/(tabs)');
        } catch {
            // error is set in store
        }
    };

    return (
        <View style={styles.root}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo */}
                    <View style={styles.header}>
                        <Text style={styles.logo}>MyFeed</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {error && (
                            <View style={styles.errorBanner}>
                                <Ionicons
                                    name='alert-circle-outline'
                                    size={16}
                                    color='#ED4956'
                                />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder='사용자 이름'
                                placeholderTextColor='#999'
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='next'
                                onSubmitEditing={() =>
                                    passwordRef.current?.focus()
                                }
                            />
                        </View>

                        <View
                            style={[
                                styles.inputWrapper,
                                styles.passwordWrapper,
                            ]}
                        >
                            <TextInput
                                ref={passwordRef}
                                style={[styles.input, styles.passwordInput]}
                                placeholder='비밀번호'
                                placeholderTextColor='#999'
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                returnKeyType='done'
                                onSubmitEditing={handleLogin}
                            />
                            <Pressable
                                onPress={() => setShowPassword(v => !v)}
                                style={styles.eyeButton}
                                hitSlop={8}
                            >
                                <Ionicons
                                    name={
                                        showPassword
                                            ? 'eye-off-outline'
                                            : 'eye-outline'
                                    }
                                    size={20}
                                    color='#999'
                                />
                            </Pressable>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                (!isFormValid || loading) &&
                                    styles.submitButtonDisabled,
                            ]}
                            onPress={handleLogin}
                            disabled={!isFormValid || loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color='#fff' size='small' />
                            ) : (
                                <Text style={styles.submitText}>로그인</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Fixed bottom — 계정이 없으신가요? */}
            <View
                style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}
            >
                <View style={styles.footerDivider} />
                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>계정이 없으신가요?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            clearError();
                            router.push('/signup' as never);
                        }}
                        hitSlop={8}
                    >
                        <Text style={styles.footerLink}>가입하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flex: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: Spacing.xxl,
        paddingTop: 80,
        paddingBottom: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        fontFamily: Pretendard.extraBold,
        fontSize: 42,
        color: '#262626',
        letterSpacing: -1,
    },
    form: {
        gap: Spacing.sm,
    },
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#FFF0F1',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 4,
    },
    errorText: {
        fontFamily: Pretendard.medium,
        fontSize: FontSizes.xs,
        color: '#ED4956',
        flex: 1,
    },
    inputWrapper: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#DBDBDB',
        borderRadius: 8,
    },
    input: {
        fontFamily: Pretendard.regular,
        fontSize: FontSizes.sm,
        color: '#262626',
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
    },
    eyeButton: {
        paddingHorizontal: 12,
    },
    submitButton: {
        backgroundColor: '#0095F6',
        borderRadius: 8,
        paddingVertical: 13,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonDisabled: {
        backgroundColor: '#B2DFFC',
    },
    submitText: {
        fontFamily: Pretendard.semiBold,
        fontSize: FontSizes.sm,
        color: '#fff',
    },
    footer: {
        backgroundColor: '#fff',
    },
    footerDivider: {
        height: 1,
        backgroundColor: '#DBDBDB',
        marginBottom: 16,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        fontFamily: Pretendard.regular,
        fontSize: FontSizes.sm,
        color: '#8e8e8e',
    },
    footerLink: {
        fontFamily: Pretendard.semiBold,
        fontSize: FontSizes.sm,
        color: '#0095F6',
    },
});
