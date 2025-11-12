export interface DashboardStats {
    totalUsers: number;
    totalRevenue: number;
    activeProjects: number;
    completionRate: number;
}

export interface ActivityItem {
    id: string;
    type: 'user' | 'project' | 'system';
    title: string;
    description: string;
    timestamp: string;
    user?: {
        name: string;
        avatar?: string;
    };
}

export interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
}

export interface DashboardData {
    stats: DashboardStats;
    recentActivity: ActivityItem[];
    quickActions: QuickAction[];
}