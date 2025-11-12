import { Plus, UserPlus, BarChart, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { QuickAction } from '@/types/dashboard';

interface QuickActionsProps {
    actions: QuickAction[];
}

const iconMap = {
    Plus,
    UserPlus,
    BarChart,
    Settings
};

export const QuickActions = ({ actions }: QuickActionsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                    Common tasks to get you started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    {actions.map((action) => {
                        const IconComponent = iconMap[action.icon as keyof typeof iconMap];
                        return (
                            <Button
                                key={action.id}
                                variant="outline"
                                className="h-auto p-4 justify-start"
                                onClick={() => {
                                    // For now, just show a toast since these pages don't exist yet
                                    console.log(`Navigate to ${action.href}`);
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    {IconComponent && <IconComponent className="h-5 w-5" />}
                                    <div className="text-left">
                                        <div className="font-medium">{action.title}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {action.description}
                                        </div>
                                    </div>
                                </div>
                            </Button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};