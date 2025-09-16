import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";
const PatientChat = () => (
  <Card className="text-center"><CardHeader><CardTitle>Chat with your Dietitian</CardTitle></CardHeader><CardContent className="space-y-4"><Lock className="h-12 w-12 mx-auto text-accent" /><p>This is a premium feature.</p><Button variant="accent"><Sparkles className="h-4 w-4 mr-2" />Upgrade to Pro</Button></CardContent></Card>
);
export default PatientChat;