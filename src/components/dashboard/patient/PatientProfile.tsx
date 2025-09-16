import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

const PatientProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    contactNumber: user?.user_metadata?.contact_number || '',
  });

  const handleUpdate = () => {
    // In a real app, you'd call a function to update the user metadata in Supabase
    toast({ title: "Profile Updated!", description: "Your information has been saved." });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
      <Card className="shadow-soft">
        <CardHeader><CardTitle>Account Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={profileData.fullName} onChange={e => setProfileData(p => ({...p, fullName: e.target.value}))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={user?.email || ''} disabled />
          </div>
           <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" value={profileData.contactNumber} onChange={e => setProfileData(p => ({...p, contactNumber: e.target.value}))} />
          </div>
          <Button onClick={handleUpdate}>Update Profile</Button>
        </CardContent>
      </Card>
      <Card className="shadow-soft">
        <CardHeader><CardTitle>Ayurvedic Assessment</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">This helps personalize your diet plans.</p>
          <Button variant="outline" onClick={() => navigate('/patient/assessment')}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retake Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile;