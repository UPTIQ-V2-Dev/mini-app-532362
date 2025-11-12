import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { dashboardService } from '@/services/dashboard';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

export const DashboardPage = () => {
    const { user } = useAuth();

    useEffect(() => {
        document.title = 'Dashboard - Mini App';
    }, []);

    const { data: dashboardData, isLoading, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardService.getDashboardData
    });

    if (error) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center space-y-2">
                    <h2 className="text-lg font-semibold">Failed to load dashboard</h2>
                    <p className="text-muted-foreground">Please try refreshing the page</p>
                </div>
            </div>
        );
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}!
                </h1>
                <p className="text-muted-foreground">
                    Welcome back to your dashboard. Here's what's happening today.
                </p>
            </div>

            {isLoading ? (
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-32" />
                        ))}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Skeleton className="h-96" />
                        <Skeleton className="h-96" />
                    </div>
                </div>
            ) : dashboardData ? (
                <>
                    <StatsCards stats={dashboardData.stats} />
                    
                    <div className="grid gap-6 md:grid-cols-2">
                        <RecentActivity activities={dashboardData.recentActivity} />
                        <QuickActions actions={dashboardData.quickActions} />
                    </div>
                </>
            ) : null}
        </div>
    );
};