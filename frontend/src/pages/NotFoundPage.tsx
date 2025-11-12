import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const NotFoundPage = () => {
    useEffect(() => {
        document.title = 'Page Not Found - Mini App';
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md text-center">
                <CardContent className="pt-6">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-6xl font-bold text-primary">404</h1>
                            <h2 className="text-2xl font-semibold">Page Not Found</h2>
                            <p className="text-muted-foreground">
                                The page you're looking for doesn't exist or has been moved.
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button asChild>
                                <Link to="/dashboard">
                                    <Home className="mr-2 h-4 w-4" />
                                    Go Home
                                </Link>
                            </Button>
                            <Button variant="outline" onClick={() => window.history.back()}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};