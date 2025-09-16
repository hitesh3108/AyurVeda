import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Utensils, Coffee, Moon, CheckCircle, RotateCcw, Flame, Leaf, BarChartHorizontal } from "lucide-react";

const initialMeals = {
  breakfast: { name: "Breakfast", icon: Coffee, time: "8:00 AM", foods: ["Spiced Oatmeal with Almonds & Cinnamon"], completed: false, calories: 420, macros: { p: 15, c: 68, f: 14 }, ayurvedic: { effect: "Pitta Pacifying", rasa: ["Sweet"] } },
  lunch: { name: "Lunch", icon: Utensils, time: "1:00 PM", foods: ["Quinoa Salad with Cucumber & Mint"], completed: false, calories: 580, macros: { p: 22, c: 85, f: 18 }, ayurvedic: { effect: "Cooling & Grounding", rasa: ["Sweet", "Astringent"] } },
  dinner: { name: "Dinner", icon: Moon, time: "7:00 PM", foods: ["Mung Dal Soup with Brown Rice"], completed: false, calories: 450, macros: { p: 18, c: 72, f: 8 }, ayurvedic: { effect: "Tridoshic & Light", rasa: ["Sweet", "Astringent"] } },
};

const MealPlanView = () => {
  const [meals, setMeals] = useState(initialMeals);
  const { toast } = useToast();

  const toggleMealStatus = (mealId: keyof typeof initialMeals) => {
    setMeals(prev => {
      const isCompleted = !prev[mealId].completed;
      toast({ title: isCompleted ? "Meal Logged!" : "Meal status reset." });
      return { ...prev, [mealId]: { ...prev[mealId], completed: isCompleted } };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Today's Meal Plan</h1>
        <p className="text-muted-foreground">Wednesday, September 17</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(meals).map(([id, meal], index) => {
          const MealIcon = meal.icon;
          return (
            <Card 
              key={id} 
              className={`flex flex-col shadow-soft hover:shadow-warm transition-all duration-300 lift-on-hover animate-fade-up ${meal.completed ? 'bg-primary/5' : 'bg-card'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <MealIcon className={`h-6 w-6 ${meal.completed ? 'text-primary' : 'text-muted-foreground'}`} />
                      <CardTitle className="text-xl">{meal.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{meal.time}</p>
                  </div>
                   <Button size="sm" variant={meal.completed ? "default" : "outline"} onClick={() => toggleMealStatus(id as keyof typeof initialMeals)}>
                    {meal.completed ? <RotateCcw className="h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                    {meal.completed ? "Undo" : "Log Eaten"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-4">{meal.foods.join(", ")}</p>
                  <div className="border-t pt-4 space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm text-muted-foreground"><Leaf size={16} /> Ayurvedic Properties</h4>
                      <div className="flex justify-between text-sm"><span>Effect:</span> <span className="font-medium">{meal.ayurvedic.effect}</span></div>
                      <div className="flex justify-between items-center text-sm"><span>Rasa:</span> <div className="flex gap-1">{meal.ayurvedic.rasa.map(r => <Badge key={r} variant="secondary">{r}</Badge>)}</div></div>
                    </div>
                    <div className="border-t pt-3">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm text-muted-foreground"><Flame size={16} /> Nutritional Info</h4>
                      <div className="flex justify-between text-sm"><span>Calories:</span> <span className="font-medium">{meal.calories} kcal</span></div>
                      <div className="flex justify-between text-sm"><span>Macros (P/C/F):</span> <span className="font-medium">{meal.macros.p}g / {meal.macros.c}g / {meal.macros.f}g</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanView;