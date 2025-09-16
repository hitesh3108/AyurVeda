import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Utensils,
  Database,
  TrendingUp,
  MessageCircle,
  User,
  Settings,
  Leaf,
  LogOut,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Import the new patient-specific view components
import PatientOverview from "@/components/dashboard/patient/PatientOverview";
import MealPlanView from "@/components/dashboard/patient/MealPlanView";
import PatientFoodDatabase from "@/components/dashboard/patient/PatientFoodDatabase";
import ProgressTracker from "@/components/dashboard/patient/ProgressTracker";
import PatientChat from "@/components/dashboard/patient/PatientChat";
import PatientProfile from "@/components/dashboard/patient/PatientProfile";
import PatientSettings from "@/components/dashboard/patient/PatientSettings";

const PatientDashboard = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out successfully" });
    navigate('/');
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "meal-plan", label: "My Meal Plan", icon: Utensils },
    { id: "food-database", label: "Food Database", icon: Database },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "chat", label: "Chat with Dietitian", icon: MessageCircle, premium: true },
    { id: "profile", label: "My Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSidebarItem) {
      case "dashboard":
        return <PatientOverview />;
      case "meal-plan":
        return <MealPlanView />;
      case "food-database":
        return <PatientFoodDatabase />;
      case "progress":
        return <ProgressTracker />;
      case "chat":
        return <PatientChat />;
      case "profile":
        return <PatientProfile />;
      case "settings":
        return <PatientSettings />;
      default:
        return <PatientOverview />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-card border-r border-border shadow-soft flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <span className="text-xl font-bold text-primary">AyurVeda</span>
              <p className="text-xs text-muted-foreground">Patient Portal</p>
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Welcome back!</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSidebarItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-smooth relative ${
                  activeSidebarItem === item.id 
                    ? "bg-primary text-primary-foreground shadow-soft" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.premium && (
                  <Badge variant="secondary" className="ml-auto text-xs bg-accent/10 text-accent">
                    <Sparkles className="h-3 w-3 mr-1" /> Pro
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="animate-fade-up">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;