import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Search,
  Leaf,
  Thermometer,
  Weight,
  Filter,
  PlusCircle
} from "lucide-react";

// MOCK DATA: Using the same structure for consistency
const foodDatabase = [
  { name: "Basmati Rice", category: "grains", rasa: ["Sweet"], thermal: "Cooling", weight: "Light", nutrition: { protein: 3.5, carbs: 78, fat: 0.9 } },
  { name: "Spinach", category: "vegetables", rasa: ["Sweet", "Astringent"], thermal: "Cooling", weight: "Light", nutrition: { protein: 2.9, carbs: 3.6, fat: 0.4 } },
  { name: "Turmeric", category: "spices", rasa: ["Bitter", "Pungent"], thermal: "Heating", weight: "Light", nutrition: { protein: 7.8, carbs: 65, fat: 9.9 } },
  { name: "Mango", category: "fruits", rasa: ["Sweet", "Sour"], thermal: "Cooling", weight: "Heavy", nutrition: { protein: 0.8, carbs: 15, fat: 0.4 } },
  { name: "Ginger", category: "spices", rasa: ["Pungent", "Sweet"], thermal: "Heating", weight: "Light", nutrition: { protein: 1.8, carbs: 18, fat: 0.8 } },
  { name: "Almonds", category: "nuts", rasa: ["Sweet"], thermal: "Heating", weight: "Heavy", nutrition: { protein: 21, carbs: 22, fat: 50 } }
];

const categories = ["All", "Grains", "Vegetables", "Fruits", "Spices", "Nuts"];

const PatientFoodDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getRasaColor = (rasa: string) => {
    const colors = {
      "Sweet": "bg-accent/10 text-accent",
      "Sour": "bg-warm/10 text-warm",
      "Bitter": "bg-primary/10 text-primary",
      "Pungent": "bg-destructive/10 text-destructive",
      "Astringent": "bg-purple-500/10 text-purple-500"
    };
    return colors[rasa as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const handleLogFood = (foodName: string) => {
    toast({
      title: "Food Logged!",
      description: `${foodName} has been added to your daily log.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Explore the Food Database</h2>
          <p className="text-muted-foreground">Discover the Ayurvedic properties of ingredients.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food, index) => (
          <Card key={index} className="shadow-soft hover:shadow-warm transition-shadow lift-on-hover animate-fade-up" style={{ animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <CardTitle>{food.name}</CardTitle>
              <Badge variant="outline" className="w-fit capitalize">{food.category}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Rasa (Tastes)</p>
                <div className="flex flex-wrap gap-2">
                  {food.rasa.map((taste) => (
                    <Badge key={taste} className={`text-xs ${getRasaColor(taste)}`}>{taste}</Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2"><Thermometer className="h-4 w-4 text-muted-foreground" /> {food.thermal}</div>
                <div className="flex items-center gap-2"><Weight className="h-4 w-4 text-muted-foreground" /> {food.weight}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Nutrition (per 100g)</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span>P: {food.nutrition.protein}g</span>
                  <span>C: {food.nutrition.carbs}g</span>
                  <span>F: {food.nutrition.fat}g</span>
                </div>
              </div>
              {/* ACTION BUTTON: Changed from "Add to Plan" to "Log Food" for the patient view. */}
              <Button className="w-full" onClick={() => handleLogFood(food.name)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Log Food
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientFoodDatabase;