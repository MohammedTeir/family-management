import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Bell, 
  Download, 
  UserCog,
  Settings,
  Activity,
  Gift
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useSettings } from "@/hooks/use-settings";

const adminNavItems = [
  {
    title: "الإحصائيات",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "الأسر المسجلة",
    href: "/admin/families",
    icon: Users,
  },
  {
    title: "الطلبات",
    href: "/admin/requests",
    icon: FileText,
  },
  {
    title: "الكوبونات",
    href: "/admin/support-vouchers",
    icon: Gift,
  },
  {
    title: "التنبيهات",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "التقارير",
    href: "/admin/reports",
    icon: Download,
  },
  {
    title: "إدارة المستخدمين",
    href: "/admin/users",
    icon: UserCog,
  },
  {
    title: "الإعدادات",
    href: "/admin/settings",
    icon: Settings,
    requiresRoot: true,
  },
  {
    title: "تنبيهاتي",
    href: "/admin/notifications-list",
    icon: Bell,
  },
  {
    title: "سجل النشاطات",
    href: "/admin/logs",
    icon: Activity,
    requiresRoot: true,
  },
];

export default function Sidebar() {
  const { user } = useAuth();
  const [location] = useLocation();
  const { settings } = useSettings();

  // Only show sidebar for admin users
  if (!user || user.role === 'head') {
    return null;
  }

  return (
    <aside className="w-64 bg-sidebar shadow-sm h-screen sticky top-0 no-print border-l border-sidebar-border">
     
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {adminNavItems.map((item) => {
            if (item.requiresRoot && user.role !== 'root') {
              return null;
            }

            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-auto p-3 text-right",
                    isActive
                      ? "bg-sidebar-primary/10 text-sidebar-primary hover:bg-sidebar-primary/10 hover:text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 ml-3" />
                  <span>{item.title}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* User Info at Bottom */}
        <div className="mt-8 pt-8 border-t border-sidebar-border">
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-sidebar-foreground">{user.username}</p>
            <p className="text-xs text-sidebar-accent-foreground">
              {user.role === 'root' ? 'مشرف رئيسي' : 'مشرف'}
            </p>
          </div>
        </div>
      </nav>
    </aside>
  );
}
