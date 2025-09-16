import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, UserCircle, SlidersHorizontal, Trash2 } from "lucide-react";

const PatientSettings = () => {
  // DYNAMIC STATE: To make the switches interactive
  const [notifications, setNotifications] = useState({
    mealReminders: true,
    progressSummary: true,
    dietitianTips: false,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notifications</TabsTrigger>
          <TabsTrigger value="account"><UserCircle className="h-4 w-4 mr-2" />Account</TabsTrigger>
          <TabsTrigger value="preferences"><SlidersHorizontal className="h-4 w-4 mr-2" />Preferences</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive updates and reminders from AyurVeda AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <Label htmlFor="meal-reminders">Meal Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get notified when it's time for your next meal.</p>
                </div>
                <Switch 
                  id="meal-reminders" 
                  checked={notifications.mealReminders} 
                  onCheckedChange={(checked) => setNotifications(p => ({...p, mealReminders: checked}))} 
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <Label htmlFor="progress-summary">Weekly Progress Summary</Label>
                  <p className="text-sm text-muted-foreground">Receive a summary of your wellness journey every week.</p>
                </div>
                <Switch 
                  id="progress-summary" 
                  checked={notifications.progressSummary} 
                  onCheckedChange={(checked) => setNotifications(p => ({...p, progressSummary: checked}))} 
                />
              </div>
               <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <Label htmlFor="dietitian-tips">Tips from your Dietitian</Label>
                  <p className="text-sm text-muted-foreground">Get occasional tips and messages from your dietitian.</p>
                </div>
                <Switch 
                  id="dietitian-tips" 
                  checked={notifications.dietitianTips} 
                  onCheckedChange={(checked) => setNotifications(p => ({...p, dietitianTips: checked}))} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Password Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <Button>Change Password</Button>
              </CardContent>
            </Card>
             <Card className="shadow-soft border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
                </div>
                <Button variant="destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
           <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
                <CardDescription>Update your preferences to refine your meal plans.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">These settings help our AI generate the best recommendations for you.</p>
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientSettings;