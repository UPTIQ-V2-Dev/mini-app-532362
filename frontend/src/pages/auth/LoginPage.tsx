import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export const LoginPage = () => {
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        document.title = 'Login - Mini App';
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-8 w-8" />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary">Mini App</h1>
                    <p className="text-muted-foreground mt-2">
                        Your simple and powerful mini application
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
};