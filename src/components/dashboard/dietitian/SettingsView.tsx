import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const SettingsView = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="practice">Practice Details</TabsTrigger>
        <TabsTrigger value="billing">Billing & Subscription</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <p className="text-sm text-muted-foreground">Update your personal information and password.</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Dr. Anjali Kumar" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="dr.anjali@ayurveda.ai" disabled />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <Button>Save Profile</Button>
            </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="practice">
        <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Practice Details</CardTitle>
              <p className="text-sm text-muted-foreground">Manage your clinic information and specializations.</p>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input id="clinicName" defaultValue="AyurWellness Clinic" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Clinic Address</Label>
                    <Textarea id="address" defaultValue="123 Wellness Street, Bangalore, Karnataka 560001" />
                </div>
                <Button>Save Practice Details</Button>
            </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="billing">
        <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <p className="text-sm text-muted-foreground">Manage your subscription plan and view payment history.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-muted/50 border-dashed">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Professional Plan</p>
                    <p className="text-sm text-muted-foreground">Next billing date: October 1, 2025</p>
                  </div>
                  <Button variant="outline">Manage Subscription</Button>
                </CardContent>
              </Card>
              <h3 className="font-semibold">Payment History</h3>
              <p className="text-sm text-muted-foreground">Your payment history would be displayed here.</p>
            </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsView;