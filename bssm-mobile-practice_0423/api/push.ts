import apiClient from './client';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export interface PushDevicePayload {
    token: string;
    platform: string;
    deviceName?: string;
    appVersion?: string;
    osVersion?: string;
    projectId?: string;
}

export interface PushDevice {
    id: string;
    token: string;
    platform: string;
    deviceName: string | null;
    appVersion: string | null;
    osVersion: string | null;
    projectId: string | null;
    lastSeenAt: string;
}

export const registerPushDevice = async (
    token: string,
): Promise<PushDevice> => {
    const payload: PushDevicePayload = {
        token,
        platform: Platform.OS,
        deviceName: Device.deviceName ?? undefined,
        appVersion: Constants.expoConfig?.version ?? undefined,
        osVersion: Device.osVersion ?? undefined,
        projectId: Constants.expoConfig?.extra?.eas?.projectId ?? undefined,
    };

    const res = await apiClient.post<PushDevice>('/push/devices', payload);
    return res.data;
};
