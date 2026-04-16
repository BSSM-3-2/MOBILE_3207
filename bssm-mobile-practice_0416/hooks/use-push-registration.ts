import { useEffect } from 'react';
import * as Device from 'expo-device';
import {
    getPermissionsAsync,
    requestPermissionsAsync,
    getExpoPushTokenAsync,
} from 'expo-notifications';
import { useAuthStore } from '@/store/auth-store';
import { registerPushDevice } from '@/api/push';

/**
 * 로그인된 상태에서 Expo push token을 얻어 서버에 등록합니다.
 * accessToken이 생기는 순간(로그인/회원가입 직후) 자동으로 실행됩니다.
 */
export function usePushRegistration() {
    const accessToken = useAuthStore(s => s.accessToken);

    useEffect(() => {
        if (!accessToken) return;
        registerDevice();
    }, [accessToken]);
}

async function registerDevice() {
    // 실기기가 아니면 Expo push token을 발급받을 수 없음
    if (!Device.isDevice) return;

    // TODO 실습 8-1
    // setNotificationChannelAsync로 Android 알림 채널을 생성하세요
    // name, importance 등을 지정하고, importance 값을 바꿔가며 heads-up 동작을 비교해보세요

    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        console.log('Notification permission not granted');
        return;
    }

    const token = (await getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
    await registerPushDevice(token);
}
