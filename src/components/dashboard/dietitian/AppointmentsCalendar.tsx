import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const AppointmentsCalendar = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarDays = Array.from({ length: 35 }, (_, i) => i - 4); // Mock days for a 5-week view

  return (
    <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
          <h2 className="text-xl font-semibold text-foreground">September 2025</h2>
          <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> New Appointment</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 border-t border-l border-border">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-medium p-2 border-b border-r text-muted-foreground">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div key={index} className={`p-2 h-32 border-b border-r ${day < 1 ? 'bg-muted/30' : ''}`}>
              <span className={`font-semibold ${day < 1 ? 'text-muted-foreground' : 'text-foreground'}`}>
                {day > 0 ? day : ''}
              </span>
              <div className="mt-1 space-y-1">
                {day === 17 && <Badge className="w-full justify-start text-xs bg-primary/20 text-primary hover:bg-primary/30">10am: Priya Sharma</Badge>}
                {day === 18 && <Badge className="w-full justify-start text-xs bg-accent/20 text-accent-foreground hover:bg-accent/30">11am: Rajesh Kumar</Badge>}
                {day === 18 && <Badge className="w-full justify-start text-xs bg-warm/20 text-warm-foreground hover:bg-warm/30">2pm: Arjun Singh</Badge>}
                {day === 22 && <Badge className="w-full justify-start text-xs bg-primary/20 text-primary hover:bg-primary/30">9am: Meera Patel</Badge>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsCalendar;