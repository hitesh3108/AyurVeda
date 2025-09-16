import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Database, 
  Calendar, 
  TrendingUp, 
  IndianRupee, 
  ArrowUpRight, 
  MessageCircle, 
  Star, 
  Clock, 
  Sparkles, 
  UserPlus 
} from "lucide-react";

// MOCK DATA: In a real app, this would come from an API call
const stats = {
  totalPatients: { value: 247, change: 12 },
  activePlans: { value: 156, change: 8 },
  foodsInDb: { value: 1247, change: 25 },
  monthlyRevenue: { value: 245000, change: 15 }
};

const recentPatients = [
  { name: "Priya Sharma", age: 28, prakriti: "Vata-Pitta", status: "Active", lastSeen: "2 days ago", premium: true },
  { name: "Rajesh Kumar", age: 45, prakriti: "Kapha-Vata", status: "Follow-up", lastSeen: "1 week ago", premium: false },
  { name: "Meera Patel", age: 35, prakriti: "Pitta", status: "Active", lastSeen: "3 days ago", premium: true },
  { name: "Arjun Singh", age: 52, prakriti: "Kapha", status: "Pending", lastSeen: "5 days ago", premium: false }
];

const todayAppointments = [
  { name: "Anita Reddy", type: "Diet Review", time: "10:00 AM" },
  { name: "Suresh Gupta", type: "New Consultation", time: "11:30 AM" },
  { name: "Lakshmi Iyer", type: "Follow-Up", time: "1:00 PM" }
];

const DashboardOverview = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Patients Card */}
        <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm lift-on-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Patients</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPatients.value}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <TrendingUp className="h-4 w-4 text-accent mr-1" />
                <span className="text-accent font-medium">+{stats.totalPatients.change}%</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
        </Card>
        {/* Active Diet Plans */}
        <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm lift-on-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Diet Plans</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activePlans.value}</p>
                </div>
                <div className="w-12 h-12 bg-warm/10 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-warm" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <TrendingUp className="h-4 w-4 text-accent mr-1" />
                <span className="text-accent font-medium">+{stats.activePlans.change}%</span>
                <span className="text-muted-foreground ml-1">this week</span>
              </div>
            </CardContent>
        </Card>
        {/* Foods in Database */}
        <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm lift-on-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Foods in Database</p>
                  <p className="text-2xl font-bold text-foreground">{stats.foodsInDb.value.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Database className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <TrendingUp className="h-4 w-4 text-accent mr-1" />
                <span className="text-accent font-medium">+{stats.foodsInDb.change}</span>
                <span className="text-muted-foreground ml-1">new additions</span>
              </div>
            </CardContent>
        </Card>
        {/* Monthly Revenue */}
        <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm lift-on-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-foreground flex items-center">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {(stats.monthlyRevenue.value / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center">
                  <IndianRupee className="h-6 w-6 text-sage-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <TrendingUp className="h-4 w-4 text-accent mr-1" />
                <span className="text-accent font-medium">+{stats.monthlyRevenue.change}%</span>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Patients */}
        <div className="lg:col-span-2">
          <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />Recent Patients</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('patients')}>
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{patient.name}</p>
                        {patient.premium && (<Badge variant="secondary" className="text-xs bg-accent/10 text-accent"><Star className="h-3 w-3 mr-1" />Premium</Badge>)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Age {patient.age}</span><span>•</span><span>{patient.prakriti}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="secondary"
                      className={
                        patient.status === "Active" ? "bg-accent/10 text-accent" 
                        : patient.status === "Pending" ? "bg-warm/10 text-warm" 
                        : "bg-muted text-muted-foreground"
                      }
                    >
                      {patient.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{patient.lastSeen}</p>
                  </div>
                </div>
              ))}
              <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4 border border-accent/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-accent" />
                    <div>
                        <p className="font-medium text-foreground">Premium Patient Chat</p>
                        <p className="text-sm text-muted-foreground">2 unread messages</p>
                    </div>
                  </div>
                  {/* UPDATED: Added onClick to switch to the chat tab */}
                  <Button variant="accent" size="sm" onClick={() => setActiveTab('chat')}>Open Chat</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Today's Appointments & AI Assistant */}
        <div>
          <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1 self-start"></div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{appointment.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{appointment.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('appointments')}>
                <Calendar className="h-4 w-4 mr-2" />View Full Schedule
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-warm border-0 bg-gradient-to-br from-primary/5 to-accent/5 mt-6">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary animate-gentle-bounce" />
              <h3 className="font-semibold text-foreground mb-2">AI Assistant Ready</h3>
              <p className="text-sm text-muted-foreground mb-4">I can auto-generate personalized Ayurvedic diet plans!</p>
              <Button variant="hero" size="sm" className="w-full" onClick={() => setActiveTab('patients')}>
                <UserPlus className="h-4 w-4 mr-2" />Add First Patient
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;