import type { PaginatedResponse } from '@/types/api';
import type { AuthResponse, User } from '@/types/user';
import type { DashboardData } from '@/types/dashboard';

export const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    role: 'USER',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockAdminUser: User = {
    id: 2,
    email: 'admin@example.com',
    name: 'Jane Smith',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    }
};

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};

export const mockDashboardData: DashboardData = {
    stats: {
        totalUsers: 2547,
        totalRevenue: 125430,
        activeProjects: 18,
        completionRate: 87
    },
    recentActivity: [
        {
            id: '1',
            type: 'user',
            title: 'New user registered',
            description: 'Sarah Johnson joined the platform',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            user: {
                name: 'Sarah Johnson'
            }
        },
        {
            id: '2',
            type: 'project',
            title: 'Project completed',
            description: 'E-commerce redesign project has been completed',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            user: {
                name: 'Mike Chen'
            }
        },
        {
            id: '3',
            type: 'system',
            title: 'System update',
            description: 'Platform updated to version 2.1.0',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        },
        {
            id: '4',
            type: 'user',
            title: 'Profile updated',
            description: 'Alex Thompson updated their profile information',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            user: {
                name: 'Alex Thompson'
            }
        }
    ],
    quickActions: [
        {
            id: '1',
            title: 'Create Project',
            description: 'Start a new project',
            icon: 'Plus',
            href: '/projects/new'
        },
        {
            id: '2',
            title: 'Add User',
            description: 'Invite a new team member',
            icon: 'UserPlus',
            href: '/users/new'
        },
        {
            id: '3',
            title: 'View Reports',
            description: 'Check analytics and reports',
            icon: 'BarChart',
            href: '/reports'
        },
        {
            id: '4',
            title: 'Settings',
            description: 'Configure your preferences',
            icon: 'Settings',
            href: '/settings'
        }
    ]
};
