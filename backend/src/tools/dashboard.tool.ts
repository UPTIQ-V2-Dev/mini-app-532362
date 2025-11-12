import { dashboardService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import { z } from 'zod';

const dashboardDataSchema = z.object({
    stats: z.object({
        totalUsers: z.number(),
        totalRevenue: z.number(),
        activeProjects: z.number(),
        completionRate: z.number()
    }),
    recentActivity: z.array(
        z.object({
            id: z.string(),
            type: z.string(),
            title: z.string(),
            description: z.string(),
            timestamp: z.string(),
            user: z.object({
                name: z.string()
            })
        })
    ),
    quickActions: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            icon: z.string(),
            href: z.string()
        })
    )
});

const getDashboardDataTool: MCPTool = {
    id: 'dashboard_get_data',
    name: 'Get Dashboard Data',
    description: 'Get dashboard data including stats, recent activity, and quick actions',
    inputSchema: z.object({}),
    outputSchema: dashboardDataSchema,
    fn: async () => {
        const dashboardData = await dashboardService.getDashboardData();
        return dashboardData;
    }
};

export const dashboardTools: MCPTool[] = [getDashboardDataTool];