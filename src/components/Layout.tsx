
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Database, 
  Capsules, 
  FileText, 
  Users, 
  Home,
  Settings, 
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Capsules, label: "Inventory", path: "/inventory" },
  { icon: FileText, label: "Prescriptions", path: "/prescriptions" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: Database, label: "Sales", path: "/sales" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Auto-collapse sidebar on mobile
  const isSidebarVisible = isMobile ? false : sidebarOpen;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile header with menu button */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center md:hidden">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-2"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <h1 className="text-xl font-semibold text-pharmacy-primary">DigiPharmacy</h1>
        </div>
      </header>

      {/* Sidebar - mobile overlay or normal sidebar */}
      <aside 
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out border-r",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
          !isMobile && !sidebarOpen ? "w-20" : "w-64",
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-6 border-b">
          {sidebarOpen ? (
            <h1 className="text-xl font-semibold text-pharmacy-primary">DigiPharmacy</h1>
          ) : (
            <span className="text-xl font-semibold text-pharmacy-primary">DP</span>
          )}
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <Menu size={16} /> : <Menu size={16} />}
            </Button>
          )}
        </div>

        {/* Sidebar navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  <div 
                    className={cn(
                      "flex items-center px-4 py-3 rounded-md transition-colors",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      currentPath === item.path 
                        ? "bg-primary text-primary-foreground" 
                        : "text-sidebar-foreground"
                    )}
                  >
                    <item.icon size={sidebarOpen ? 16 : 20} />
                    {sidebarOpen && <span className="ml-4">{item.label}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-200 ease-in-out",
          !isMobile && sidebarOpen ? "md:ml-64" : "",
          !isMobile && !sidebarOpen ? "md:ml-20" : "",
        )}
      >
        <div className="h-full p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
