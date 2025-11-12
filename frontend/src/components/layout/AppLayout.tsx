import { Outlet } from 'react-router-dom';
import { Home, User, Settings, Search, Database, Bell } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarInset
} from '@/components/ui/sidebar';
import { Header } from './Header';
import { Link } from 'react-router-dom';

const menuItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home
    },
    {
        title: 'Profile',
        url: '/profile',
        icon: User
    },
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings
    }
];

const comingSoonItems = [
    {
        title: 'Search',
        url: '/search',
        icon: Search
    },
    {
        title: 'Data',
        url: '/data',
        icon: Database
    },
    {
        title: 'Notifications',
        url: '/notifications',
        icon: Bell
    }
];

export const AppLayout = () => {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Mini App</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Coming Soon</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {comingSoonItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton disabled>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <Header />
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};