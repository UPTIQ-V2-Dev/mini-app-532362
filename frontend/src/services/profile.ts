import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { mockUser } from '@/data/mockData';
import type { User } from '@/types/user';
import type { UpdateProfileRequest, ChangePasswordRequest } from '@/types/profile';

export const profileService = {
    getProfile: async (): Promise<User> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getProfile ---');
            await mockApiDelay();
            return mockUser;
        }
        const response = await api.get('/profile');
        return response.data;
    },

    updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: updateProfile ---', data);
            await mockApiDelay();
            return { ...mockUser, ...data };
        }
        const response = await api.put('/profile', data);
        return response.data;
    },

    changePassword: async (data: ChangePasswordRequest): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: changePassword ---', { ...data, currentPassword: '***', newPassword: '***', confirmPassword: '***' });
            await mockApiDelay();
            return;
        }
        await api.put('/profile/password', data);
    }
};