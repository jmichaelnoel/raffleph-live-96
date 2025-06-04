
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, HelpCircle, Plus, Shield, Users } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'How it Works',
    url: '/how-it-works',
    icon: HelpCircle,
  },
  {
    title: 'Submit Raffle',
    url: '/submit-raffle',
    icon: Plus,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="sticky top-0 h-screen">
      <SidebarHeader className="p-4">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <h1 className="text-xl font-bold flex items-center">
            <span className="text-ph-red">Raffle</span>
            <span className="text-ph-blue group-hover:animate-bounce">PH</span>
            <span className="text-xs font-sans font-bold text-gray-600 tracking-tight transform rotate-90 origin-center whitespace-nowrap -ml-1 mr-0.5" style={{ fontSize: '0.5rem', lineHeight: '1.8rem', letterSpacing: '0.02em' }}>.com</span>
          </h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.url)}
                  >
                    <button onClick={() => navigate(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive('/admin')}
                  >
                    <button onClick={() => navigate('/admin')}>
                      <Shield />
                      <span>Admin Dashboard</span>
                      <Badge variant="secondary" className="ml-auto">Admin</Badge>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        {user && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span className="truncate">{user.email}</span>
            {isAdmin && (
              <Badge variant="outline" className="text-xs">Admin</Badge>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
