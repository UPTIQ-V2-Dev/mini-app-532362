import { Users, DollarSign, FolderOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStats } from '@/types/dashboard';

interface StatsCardsProps {
    stats: DashboardStats;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatPercentage = (percentage: number) => {
    return `${percentage}%`;
};

export const StatsCards = ({ stats }: StatsCardsProps) => {
    const cards = [
        {
            title: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
            description: '+12% from last month'
        },
        {
            title: 'Total Revenue',
            value: formatCurrency(stats.totalRevenue),
            icon: DollarSign,
            description: '+8% from last month'
        },
        {
            title: 'Active Projects',
            value: stats.activeProjects.toString(),
            icon: FolderOpen,
            description: '+3 new this week'
        },
        {
            title: 'Completion Rate',
            value: formatPercentage(stats.completionRate),
            icon: TrendingUp,
            description: '+5% from last month'
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {card.title}
                            </CardTitle>
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};