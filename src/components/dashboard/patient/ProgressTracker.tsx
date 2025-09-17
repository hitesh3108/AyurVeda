import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Activity } from "lucide-react";
import DoshaAnalysis from "@/components/dashboard/common/DoshaAnalysis"; // Ensure this exists

// Mock data for Dosha Analysis
const patientDoshaData = { vata: 45, pitta: 35, kapha: 20 };

// Weight trend data
const weightData = [
  { month: "Apr", weight: 75 },
  { month: "May", weight: 74 },
  { month: "Jun", weight: 73 },
  { month: "Jul", weight: 71 },
  { month: "Aug", weight: 70 },
  { month: "Sep", weight: 69 },
];
const maxWeight = Math.max(...weightData.map((d) => d.weight));
const minWeight = Math.min(...weightData.map((d) => d.weight));

const ProgressTracker = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">My Progress Tracker</h1>
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="weekly">Weekly Summary</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
          <TabsTrigger value="dosha">Dosha Analysis</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        {/* Weekly Summary */}
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>This Week&apos;s Achievements</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-primary">92%</h3>
                <p className="text-sm text-muted-foreground">
                  Meal Plan Adherence
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-accent">7.2/8</h3>
                <p className="text-sm text-muted-foreground">
                  Avg. Daily Water (glasses)
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-warm">5/7</h3>
                <p className="text-sm text-muted-foreground">Active Days</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monthly Trend */}
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Weight Trend (Last 6 Months)</CardTitle>
              <CardDescription>
                Your weight has consistently decreased. Keep up the great work!
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 w-full pl-2">
              <svg width="100%" height="100%" viewBox="0 0 500 300">
                <polyline
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  points={weightData
                    .map(
                      (d, i) =>
                        `${60 + i * 70},${
                          270 -
                          ((d.weight - minWeight) / (maxWeight - minWeight)) *
                            240
                        }`
                    )
                    .join(" ")}
                />
                {weightData.map((d, i) => (
                  <g key={d.month}>
                    <circle
                      cx={60 + i * 70}
                      cy={
                        270 -
                        ((d.weight - minWeight) / (maxWeight - minWeight)) * 240
                      }
                      r="4"
                      fill="hsl(var(--background))"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                    />
                    <text
                      x={60 + i * 70}
                      y="290"
                      textAnchor="middle"
                      className="text-xs fill-current text-muted-foreground"
                    >
                      {d.month}
                    </text>
                  </g>
                ))}
              </svg>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dosha Analysis */}
        <TabsContent value="dosha">
          <DoshaAnalysis data={patientDoshaData} />
        </TabsContent>

        {/* Milestones */}
        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>Your Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-lg">
                <Award className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-semibold">
                    Reached 5kg Weight Loss Goal!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    August 28, 2025
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Activity className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-semibold">30-Day Activity Streak</p>
                  <p className="text-sm text-muted-foreground">July 15, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressTracker;
