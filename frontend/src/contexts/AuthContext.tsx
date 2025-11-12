import { createContext, useEffect, useState } from 'react';
import { getStoredUser, isAuthenticated as checkIsAuthenticated } from '@/lib/api';
import type { User } from '@/types/user';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedUser = getStoredUser();
                const authenticated = checkIsAuthenticated();
                
                if (authenticated && storedUser) {
                    setUser(storedUser);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const logout = () => {
        setUser(null);
        // The auth service will handle clearing localStorage
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};