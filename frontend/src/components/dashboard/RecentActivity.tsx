import { User, FolderOpen, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import type { ActivityItem } from '@/types/dashboard';

interface RecentActivityProps {
    activities: ActivityItem[];
}

const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
        case 'user':
            return User;
        case 'project':
            return FolderOpen;
        case 'system':
            return Settings;
        default:
            return User;
    }
};

const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
        case 'user':
            return 'bg-blue-500';
        case 'project':
            return 'bg-green-500';
        case 'system':
            return 'bg-orange-500';
        default:
            return 'bg-gray-500';
    }
};

export const RecentActivity = ({ activities }: RecentActivityProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    Latest updates and changes in your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => {
                        const IconComponent = getActivityIcon(activity.type);
                        const colorClass = getActivityColor(activity.type);
                        
                        return (
                            <div key={activity.id} className="flex items-start gap-4">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colorClass}`}>
                                    <IconComponent className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium">{activity.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {activity.description}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                    </p>
                                </div>
                                {activity.user && (
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-xs">
                                            {activity.user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};