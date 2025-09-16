import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  Database, 
  Calendar, 
  TrendingUp, 
  Leaf, 
  Settings, 
  BarChart3, 
  UserPlus, 
  LogOut,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Import the new section components
import DashboardOverview from "@/components/dashboard/dietitian/DashboardOverview";
import PatientsManagement from "@/components/dashboard/dietitian/PatientsManagement";
import FoodDatabaseView from "@/components/dashboard/dietitian/FoodDatabaseView";
import DietPlansLibrary from "@/components/dashboard/dietitian/DietPlansLibrary";
import AnalyticsView from "@/components/dashboard/dietitian/AnalyticsView";
import AppointmentsCalendar from "@/components/dashboard/dietitian/AppointmentsCalendar";
import SettingsView from "@/components/dashboard/dietitian/SettingsView";
import ChatInterface from "@/components/dashboard/dietitian/ChatInterface"; // <-- Import ChatInterface

const DietitianDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out successfully" });
    navigate('/');
  };

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "patients", label: "Patients", icon: Users },
    { id: "database", label: "Food Database", icon: Database },
    { id: "plans", label: "Diet Plans", icon: FileText },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "chat", label: "Patient Chat", icon: MessageCircle }, // <-- Added Chat
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case "patients":
        return <PatientsManagement />;
      case "database":
        return <FoodDatabaseView />;
      case "plans":
        return <DietPlansLibrary />;
      case "analytics":
        return <AnalyticsView />;
      case "appointments":
        return <AppointmentsCalendar />;
      case "chat": // <-- Added case for chat
        return <ChatInterface />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-sage">
      <aside className="w-64 bg-card border-r border-border shadow-soft flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <span className="text-xl font-bold text-primary">AyurVeda</span>
              <p className="text-xs text-muted-foreground">Practitioner Portal</p>
            </div>
          </div>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground shadow-soft" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6">
          <div className="border-t border-border pt-4">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Good morning, {user?.user_metadata?.full_name || 'Dr.'} 👋
            </h1>
            <p className="text-muted-foreground">Here's what's happening with your practice today.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setActiveTab('appointments')}>
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Button>
            <Button variant="hero" size="sm" onClick={() => setActiveTab('patients')}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default DietitianDashboard;