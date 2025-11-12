import prisma from '../client.ts';

interface DashboardData {
    stats: {
        totalUsers: number;
        totalRevenue: number;
        activeProjects: number;
        completionRate: number;
    };
    recentActivity: Array<{
        id: string;
        type: string;
        title: string;
        description: string;
        timestamp: string;
        user: {
            name: string;
        };
    }>;
    quickActions: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
        href: string;
    }>;
}

/**
 * Get dashboard data including stats and recent activity
 * @returns {Promise<DashboardData>}
 */
const getDashboardData = async (): Promise<DashboardData> => {
    // Get total users count
    const totalUsers = await prisma.user.count();
    
    // Mock data for other stats (replace with actual business logic)
    const stats = {
        totalUsers,
        totalRevenue: 125430,
        activeProjects: 18,
        completionRate: 87
    };

    // Mock recent activity (replace with actual activity tracking)
    const recentActivity = [
        {
            id: "1",
            type: "user",
            title: "New user registered",
            description: "Sarah Johnson joined the platform",
            timestamp: new Date().toISOString(),
            user: {
                name: "Sarah Johnson"
            }
        },
        {
            id: "2",
            type: "project",
            title: "Project completed",
            description: "Website redesign project was completed",
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            user: {
                name: "John Doe"
            }
        }
    ];

    // Quick actions
    const quickActions = [
        {
            id: "1",
            title: "Create Project",
            description: "Start a new project",
            icon: "Plus",
            href: "/projects/new"
        },
        {
            id: "2",
            title: "Add User",
            description: "Invite a new user to the platform",
            icon: "UserPlus",
            href: "/users/new"
        },
        {
            id: "3",
            title: "View Reports",
            description: "Check analytics and reports",
            icon: "BarChart",
            href: "/reports"
        }
    ];

    return {
        stats,
        recentActivity,
        quickActions
    };
};

export default {
    getDashboardData
};