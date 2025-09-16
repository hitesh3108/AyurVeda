import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Flame,
  Droplets,
  CheckCircle,
  Utensils,
  Leaf,
  Coffee,
  Moon,
  Sunrise,
  Sunset,
  HeartPulse,
  Footprints
} from "lucide-react";

// More detailed mock data for a "Journey"
const initialJourney = [
  { id: 1, type: "routine", time: "7:00 AM", title: "Morning Routine", description: "Hydration & Meditation", icon: Sunrise, completed: true },
  { id: 2, type: "meal", time: "8:00 AM", title: "Breakfast", description: "Spiced Oatmeal", icon: Coffee, completed: true },
  { id: 3, type: "meal", time: "1:00 PM", title: "Lunch", description: "Quinoa & Veggie Bowl", icon: Utensils, completed: false },
  { id: 4, type: "meal", time: "7:00 PM", title: "Dinner", description: "Mung Dal Soup", icon: Moon, completed: false },
  { id: 5, type: "routine", time: "9:00 PM", title: "Evening Routine", description: "Herbal Tea & Wind Down", icon: Sunset, completed: false },
];

const PatientOverview = () => {
  const [journey, setJourney] = useState(initialJourney);
  const [hydration, setHydration] = useState(6);
  const [mood, setMood] = useState<string | null>('Happy');
  const { toast } = useToast();

  const toggleJourneyItem = (id: number) => {
    setJourney(journey.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };
  
  const handleSetHydration = (amount: number) => {
    setHydration(amount);
    toast({ title: "Hydration Updated!", description: `You've logged ${amount} glasses of water.` });
  };
  
  const handleSetMood = (selectedMood: string) => {
    setMood(selectedMood);
    toast({ title: "Mood Logged!", description: `Feeling ${selectedMood} today.` });
  };

  const overviewData = { userName: "Priya", dominantDosha: "Pitta" };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Good Morning, {overviewData.userName}!</h1>
        <p className="text-muted-foreground">Here is your wellness journey for Wednesday, September 17.</p>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-warm border-0 bg-gradient-to-r from-accent/10 to-primary/10">
            <CardContent className="p-6 flex items-center gap-6">
              <div className="bg-accent/20 p-4 rounded-full"><Sparkles className="h-8 w-8 text-accent" /></div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">Today's Ayurvedic Tip</h3>
                <p className="text-muted-foreground">Your <span className="font-semibold text-accent">{overviewData.dominantDosha}</span> is dominant. Focus on cooling foods like cucumber and mint.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Leaf className="h-5 w-5 text-primary" />Today's Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="relative pl-6">
                {/* Vertical Timeline Bar */}
                <div className="absolute left-[34px] top-2 h-full w-0.5 bg-border -translate-x-1/2"></div>
                
                {journey.map(item => (
                  <div key={item.id} className="flex items-start gap-4 mb-6 relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${item.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="font-semibold">{item.title} <span className="text-sm text-muted-foreground font-normal">- {item.time}</span></p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button variant={item.completed ? "ghost" : "outline"} size="sm" className="mt-1" onClick={() => toggleJourneyItem(item.id)}>
                      {item.completed ? <CheckCircle className="h-5 w-5 text-accent" /> : "Log"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Stats Sidebar) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-base font-medium flex items-center gap-2"><Droplets />Hydration</CardTitle></CardHeader>
            <CardContent className="flex justify-around items-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <button key={i} onClick={() => handleSetHydration(i + 1)}>
                  <Droplets className={`h-8 w-8 transition-colors ${i < hydration ? 'text-blue-500 fill-current' : 'text-muted/30'}`} />
                </button>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-base font-medium flex items-center gap-2"><HeartPulse />How are you feeling?</CardTitle></CardHeader>
            <CardContent className="flex justify-around">
              {['Stressed', 'Okay', 'Happy', 'Energized'].map(m => (
                <Button key={m} variant={mood === m ? "default" : "ghost"} size="icon" onClick={() => handleSetMood(m)} className="h-12 w-12 rounded-full">
                   <span className="text-2xl">{m === 'Stressed' ? '😟' : m === 'Okay' ? '😐' : m === 'Happy' ? '😊' : '🚀'}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-base font-medium flex items-center gap-2"><Footprints />Activity</CardTitle></CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">4,280 <span className="text-base font-normal text-muted-foreground">steps</span></p>
              <p className="text-sm text-muted-foreground">+30 mins of Yoga</p>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
  );
};

export default PatientOverview;