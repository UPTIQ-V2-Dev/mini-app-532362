import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor, Bell, Shield, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export const SettingsPage = () => {
    const [theme, setTheme] = useState('system');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: false
    });
    const [privacy, setPrivacy] = useState({
        profileVisibility: true,
        activityStatus: false
    });

    useEffect(() => {
        document.title = 'Settings - Mini App';
    }, []);

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        toast.success(`Theme changed to ${newTheme}`);
    };

    const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
        setNotifications(prev => ({ ...prev, [key]: value }));
        toast.success(`${key} notifications ${value ? 'enabled' : 'disabled'}`);
    };

    const handlePrivacyChange = (key: keyof typeof privacy, value: boolean) => {
        setPrivacy(prev => ({ ...prev, [key]: value }));
        toast.success(`${key} ${value ? 'enabled' : 'disabled'}`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your application preferences and account settings
                </p>
            </div>

            <div className="space-y-6">
                {/* Appearance Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Palette className="h-5 w-5" />
                            <CardTitle>Appearance</CardTitle>
                        </div>
                        <CardDescription>
                            Customize how the app looks and feels
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Select value={theme} onValueChange={handleThemeChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">
                                        <div className="flex items-center gap-2">
                                            <Sun className="h-4 w-4" />
                                            Light
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="dark">
                                        <div className="flex items-center gap-2">
                                            <Moon className="h-4 w-4" />
                                            Dark
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="system">
                                        <div className="flex items-center gap-2">
                                            <Monitor className="h-4 w-4" />
                                            System
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription>
                            Control how you receive notifications
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive notifications via email
                                </p>
                            </div>
                            <Switch
                                id="email-notifications"
                                checked={notifications.email}
                                onCheckedChange={(value) => handleNotificationChange('email', value)}
                            />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="push-notifications">Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive push notifications in your browser
                                </p>
                            </div>
                            <Switch
                                id="push-notifications"
                                checked={notifications.push}
                                onCheckedChange={(value) => handleNotificationChange('push', value)}
                            />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="marketing-notifications">Marketing Communications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive updates about new features and products
                                </p>
                            </div>
                            <Switch
                                id="marketing-notifications"
                                checked={notifications.marketing}
                                onCheckedChange={(value) => handleNotificationChange('marketing', value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            <CardTitle>Privacy & Security</CardTitle>
                        </div>
                        <CardDescription>
                            Control your privacy and security preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="profile-visibility">Public Profile</Label>
                                <p className="text-sm text-muted-foreground">
                                    Make your profile visible to other users
                                </p>
                            </div>
                            <Switch
                                id="profile-visibility"
                                checked={privacy.profileVisibility}
                                onCheckedChange={(value) => handlePrivacyChange('profileVisibility', value)}
                            />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="activity-status">Activity Status</Label>
                                <p className="text-sm text-muted-foreground">
                                    Show when you're active or last seen
                                </p>
                            </div>
                            <Switch
                                id="activity-status"
                                checked={privacy.activityStatus}
                                onCheckedChange={(value) => handlePrivacyChange('activityStatus', value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Advanced</CardTitle>
                        <CardDescription>
                            Advanced settings and account management
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <Button 
                                variant="outline" 
                                onClick={() => toast.info('Export feature coming soon!')}
                            >
                                Export Data
                            </Button>
                            <Button 
                                variant="destructive" 
                                onClick={() => toast.error('Account deletion requires confirmation')}
                            >
                                Delete Account
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            These actions are permanent and cannot be undone.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};