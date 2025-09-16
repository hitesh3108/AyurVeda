import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Send, User, Star } from "lucide-react";

const premiumPatients = [
  { name: "Priya Sharma", lastMessage: "Thank you, I feel much better!", unread: 1, active: true },
  { name: "Meera Patel", lastMessage: "Should I avoid all dairy?", unread: 0, active: false },
  { name: "Rohan Desai", lastMessage: "Just checking in for the week.", unread: 2, active: false },
  { name: "Sunita Reddy", lastMessage: "The new plan is working great.", unread: 0, active: false },
];

const ChatInterface = () => {
  return (
    <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm h-[75vh] flex">
      {/* Contact List Panel */}
      <div className="w-1/3 border-r border-border flex flex-col">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-2">
          {premiumPatients.map((patient) => (
            <div key={patient.name} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${patient.active ? 'bg-muted' : 'hover:bg-muted/50'}`}>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="font-semibold text-primary">{patient.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="flex-1 truncate">
                <div className="flex justify-between items-center">
                  <p className="font-semibold truncate">{patient.name}</p>
                  {patient.unread > 0 && <Badge className="bg-accent text-accent-foreground">{patient.unread}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground truncate">{patient.lastMessage}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </div>

      {/* Chat Window Panel */}
      <div className="w-2/3 flex flex-col">
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6" />
            <div>
              <p className="font-bold flex items-center gap-2">Priya Sharma <Star className="h-4 w-4 text-accent fill-current" /></p>
              <p className="text-xs text-muted-foreground">Active Premium Member</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Mock Conversation */}
          <div className="flex justify-start"><div className="bg-muted p-3 rounded-lg max-w-sm">Hi Dr. Kumar, just wanted to say thank you for the new plan. I feel much better!</div></div>
          <div className="flex justify-end"><div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-sm">That's wonderful to hear, Priya! I'm glad it's working well for you. How is your energy in the afternoon?</div></div>
          <div className="flex justify-start"><div className="bg-muted p-3 rounded-lg max-w-sm">Much more stable. The snack suggestion really helped.</div></div>
        </CardContent>
        <div className="p-4 border-t border-border bg-background/50">
          <div className="relative">
            <Input placeholder="Type your message..." className="pr-16" />
            <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-12"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;