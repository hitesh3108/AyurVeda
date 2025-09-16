import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Eye, Share2 } from "lucide-react";

const mockPlans = [
  { title: "Weight Management Plan", description: "A balanced plan focusing on high-fiber and protein-rich foods.", tags: ["High-Fiber", "Low-Calorie"] },
  { title: "Pitta Balancing Diet", description: "Cooling and non-spicy foods to pacify the Pitta dosha.", tags: ["Cooling", "Pitta-Pacifying"] },
  { title: "Kapha Reducing Plan", description: "Light, dry, and warm foods to invigorate the Kapha dosha.", tags: ["Light", "Stimulating"] },
  { title: "Vata Grounding Diet", description: "Nourishing, warm, and moist foods to ground the Vata dosha.", tags: ["Nourishing", "Grounding"] },
  { title: "Diabetes Care Plan", description: "Low-glycemic and complex carbohydrates to manage blood sugar.", tags: ["Low-Glycemic", "Complex-Carbs"] },
  { title: "Digestive Health", description: "Easy-to-digest foods and spices like ginger and fennel.", tags: ["Gut-Health", "Anti-inflammatory"] },
];

const DietPlansLibrary = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Diet Plan Library</h2>
        <Button><PlusCircle className="h-4 w-4 mr-2" /> Create New Template</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPlans.map((plan, index) => (
          <Card key={index} className="shadow-soft hover:shadow-warm transition-shadow lift-on-hover">
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <div className="flex flex-wrap gap-2 pt-2">
                {plan.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 h-10">{plan.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full"><Eye className="h-4 w-4 mr-2" /> View</Button>
                <Button size="sm" className="w-full"><Share2 className="h-4 w-4 mr-2" /> Assign</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DietPlansLibrary;