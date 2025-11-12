import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { profileService } from '@/services/profile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { User } from '@/types/user';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address')
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    user: User;
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
    const { setUser } = useAuth();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || '',
            email: user.email
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: profileService.updateProfile,
        onSuccess: (updatedUser) => {
            setUser(updatedUser);
            queryClient.setQueryData(['profile'], updatedUser);
            toast.success('Profile updated successfully');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to update profile');
        }
    });

    const onSubmit = (data: ProfileFormData) => {
        updateProfileMutation.mutate(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                    Update your account details and personal information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter your full name"
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <Button
                            type="submit"
                            disabled={!isDirty || updateProfileMutation.isPending}
                        >
                            {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
                        </Button>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className={`w-2 h-2 rounded-full ${user.isEmailVerified ? 'bg-green-500' : 'bg-yellow-500'}`} />
                            {user.isEmailVerified ? 'Email verified' : 'Email not verified'}
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};