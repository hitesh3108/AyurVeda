import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const DietPlansLibrary = () => {
  return (
    <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle>Diet Plan Templates</CardTitle>
            <Button size="sm"><PlusCircle className="h-4 w-4 mr-2"/>Create New Template</Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A library of pre-made and custom diet plan templates for various conditions (e.g., Weight Management, Diabetes, Pitta-balancing) would be displayed here.</p>
      </CardContent>
    </Card>
  );
};

export default DietPlansLibrary;