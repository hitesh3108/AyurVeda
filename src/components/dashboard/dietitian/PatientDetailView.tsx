import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Heart, Utensils, Activity, FileText, MessageSquare } from "lucide-react";

// This component receives the selected patient and a function to go back
const PatientDetailView = ({ patient, onBack }: { patient: any; onBack: () => void }) => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
          <p className="text-muted-foreground">
            {patient.age} years old • {patient.prakriti} • {patient.contact}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Primary Goal</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Weight Management</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diet Plan</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Kapha Reducing Plan</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-accent">82% Adherence</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Current Diet Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Breakfast:</strong> Spiced oatmeal with ginger and cinnamon.</p>
            <p><strong>Lunch:</strong> Quinoa with steamed vegetables and a light lentil soup.</p>
            <p><strong>Dinner:</strong> Baked fish with a side of sautéed bitter greens.</p>
            <Button variant="outline" size="sm" className="mt-4">View Full Plan</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Recent Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Sep 15, 2025:</strong> Patient reported feeling more energetic. Digestive issues have subsided.</p>
            <p><strong>Sep 10, 2025:</strong> Follow-up call. Discussed adding more warming spices to meals.</p>
            <p><strong>Sep 1, 2025:</strong> Initial consultation. Assigned Kapha reducing plan.</p>
            <Button size="sm" className="mt-4">Add New Note</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDetailView;