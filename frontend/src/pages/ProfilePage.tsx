import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm';
import { profileService } from '@/services/profile';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export const ProfilePage = () => {
    const { user: authUser } = useAuth();

    useEffect(() => {
        document.title = 'Profile - Mini App';
    }, []);

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: profileService.getProfile,
        initialData: authUser
    });

    if (error) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center space-y-2">
                    <h2 className="text-lg font-semibold">Failed to load profile</h2>
                    <p className="text-muted-foreground">Please try refreshing the page</p>
                </div>
            </div>
        );
    }

    const getUserInitials = (name?: string) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            {isLoading ? (
                <div className="space-y-6">
                    <Skeleton className="h-40" />
                    <Skeleton className="h-80" />
                    <Skeleton className="h-60" />
                </div>
            ) : user ? (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Overview</CardTitle>
                            <CardDescription>
                                Your current account information and status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="" alt={user.name || ''} />
                                    <AvatarFallback className="text-lg">
                                        {getUserInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-semibold">
                                            {user.name || 'No name set'}
                                        </h3>
                                        <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                                            {user.role}
                                        </Badge>
                                    </div>
                                    <p className="text-muted-foreground">{user.email}</p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>
                                            Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            Last updated {formatDistanceToNow(new Date(user.updatedAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <ProfileForm user={user} />
                        <ChangePasswordForm />
                    </div>
                </>
            ) : null}
        </div>
    );
};