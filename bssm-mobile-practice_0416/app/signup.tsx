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
import { useAuthStore } from '@/store/auth-store';
import { Pretendard, FontSizes, Spacing } from '@/constants/theme';

export default function SignupScreen() {
    const router = useRouter();
    const { signUp, loading, error, clearError } = useAuthStore();

    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const displayNameRef = useRef<RNTextInput>(null);
    const passwordRef = useRef<RNTextInput>(null);
    const bioRef = useRef<RNTextInput>(null);

    const isFormValid =
        username.trim().length > 0 &&
        displayName.trim().length > 0 &&
        password.length >= 8;

    const handleSignup = async () => {
        if (!isFormValid) return;
        clearError();
        try {
            await signUp({
                username: username.trim(),
                displayName: displayName.trim(),
                password,
                bio: bio.trim() || undefined,
            });
            router.replace('/(tabs)');
        } catch {
            // error is already set in store
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>MyFeed</Text>
                    <Text style={styles.subtitle}>
                        친구들의 사진과 동영상을 보려면{'\n'}가입하세요.
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Error Banner */}
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

                    {/* Username */}
                    <View style={[styles.inputWrapper, styles.handleWrapper]}>
                        <Text style={styles.handleAt}>@</Text>
                        <TextInput
                            style={[styles.input, styles.handleInput]}
                            placeholder='핸들'
                            placeholderTextColor='#999'
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType='next'
                            onSubmitEditing={() =>
                                displayNameRef.current?.focus()
                            }
                        />
                    </View>

                    {/* Display Name */}
                    <View style={styles.inputWrapper}>
                        <TextInput
                            ref={displayNameRef}
                            style={styles.input}
                            placeholder='성명'
                            placeholderTextColor='#999'
                            value={displayName}
                            onChangeText={setDisplayName}
                            returnKeyType='next'
                            onSubmitEditing={() => passwordRef.current?.focus()}
                        />
                    </View>

                    {/* Password */}
                    <View style={[styles.inputWrapper, styles.passwordWrapper]}>
                        <TextInput
                            ref={passwordRef}
                            style={[styles.input, styles.passwordInput]}
                            placeholder='비밀번호 (8자 이상)'
                            placeholderTextColor='#999'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            returnKeyType='next'
                            onSubmitEditing={() => bioRef.current?.focus()}
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

                    {/* Bio (optional) */}
                    <View style={styles.inputWrapper}>
                        <TextInput
                            ref={bioRef}
                            style={styles.input}
                            placeholder='소개 (선택사항)'
                            placeholderTextColor='#999'
                            value={bio}
                            onChangeText={setBio}
                            returnKeyType='done'
                            onSubmitEditing={handleSignup}
                        />
                    </View>

                    {/* Password hint */}
                    {password.length > 0 && password.length < 8 && (
                        <Text style={styles.hint}>
                            비밀번호는 8자 이상이어야 합니다.
                        </Text>
                    )}

                    {/* Submit */}
                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            (!isFormValid || loading) &&
                                styles.submitButtonDisabled,
                        ]}
                        onPress={handleSignup}
                        disabled={!isFormValid || loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color='#fff' size='small' />
                        ) : (
                            <Text style={styles.submitText}>가입하기</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>또는</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Login link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        이미 계정이 있으신가요?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push('/login' as never)}
                    >
                        <Text style={styles.footerLink}>로그인</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: Spacing.xxl,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logo: {
        fontFamily: Pretendard.extraBold,
        fontSize: 42,
        color: '#262626',
        letterSpacing: -1,
        marginBottom: 16,
    },
    subtitle: {
        fontFamily: Pretendard.regular,
        fontSize: FontSizes.sm,
        color: '#8e8e8e',
        textAlign: 'center',
        lineHeight: 20,
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
    handleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    handleAt: {
        fontFamily: Pretendard.regular,
        fontSize: FontSizes.sm,
        color: '#262626',
        paddingLeft: 14,
    },
    handleInput: {
        flex: 1,
        paddingLeft: 2,
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
    hint: {
        fontFamily: Pretendard.regular,
        fontSize: 12,
        color: '#999',
        marginTop: -4,
        marginLeft: 2,
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
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 28,
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#DBDBDB',
    },
    dividerText: {
        fontFamily: Pretendard.medium,
        fontSize: FontSizes.xs,
        color: '#8e8e8e',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontFamily: Pretendard.regular,
        fontSize: FontSizes.sm,
        color: '#262626',
    },
    footerLink: {
        fontFamily: Pretendard.semiBold,
        fontSize: FontSizes.sm,
        color: '#0095F6',
    },
});
