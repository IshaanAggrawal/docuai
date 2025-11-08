import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Workflow, 
  BarChart3, 
  Users, 
  Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Workflows', href: '/workflows', icon: Workflow },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-accent border-r border-border min-h-screen">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">DocuAI Onboarding</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || 
                           (item.href.startsWith('/admin') && location.pathname.startsWith('/admin')) ||
                           (item.href === '/dashboard' && location.pathname === '/onboarding');
            
            return (
              <li key={item.name}>
                <Link to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;