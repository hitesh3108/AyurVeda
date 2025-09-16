import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, IndianRupee, Activity, ChevronDown } from "lucide-react";

// Mock data for the static chart
const chartData = [
  { name: 'Apr', new: 12, returning: 18 },
  { name: 'May', new: 18, returning: 20 },
  { name: 'Jun', new: 15, returning: 25 },
  { name: 'Jul', new: 22, returning: 28 },
  { name: 'Aug', new: 25, returning: 30 },
  { name: 'Sep', new: 32, returning: 35 },
];

const AnalyticsView = () => {
  const maxValue = 50; // Set a static max value for the Y-axis for simplicity

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Practice Analytics</h2>
        <Button variant="outline">
          Last 30 Days
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,000</div>
            <p className="text-xs text-muted-foreground">+15.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+32</div>
            <p className="text-xs text-muted-foreground">+22.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Weekly meal plan adherence</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Growth</CardTitle>
          <p className="text-sm text-muted-foreground">New vs. Returning patients over the last 6 months.</p>
        </CardHeader>
        <CardContent className="pl-2">
            {/* Static SVG Bar Chart */}
            <div className="h-80 w-full">
              <svg width="100%" height="100%" viewBox="0 0 500 300">
                {/* Y-axis lines and labels */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <g key={i} className="text-xs text-muted-foreground">
                    <line
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      x1="30"
                      x2="490"
                      y1={250 - (i * 50)}
                      y2={250 - (i * 50)}
                    />
                    <text x="25" y={255 - (i * 50)} textAnchor="end">{i * 10}</text>
                  </g>
                ))}
                
                {/* Bars and X-axis labels */}
                {chartData.map((d, i) => (
                  <g key={d.name}>
                    {/* Returning Patients Bar (background) */}
                    <rect
                      x={60 + (i * 70)}
                      y={250 - (d.returning / maxValue) * 250}
                      width="20"
                      height={(d.returning / maxValue) * 250}
                      className="fill-current text-primary/30"
                      rx="4"
                    />
                    {/* New Patients Bar (foreground) */}
                     <rect
                      x={60 + (i * 70)}
                      y={250 - (d.new / maxValue) * 250}
                      width="20"
                      height={(d.new / maxValue) * 250}
                      className="fill-current text-primary"
                      rx="4"
                    />
                    <text x={70 + (i * 70)} y="270" textAnchor="middle" className="text-xs fill-current text-muted-foreground">{d.name}</text>
                  </g>
                ))}

                 {/* Legend */}
                 <g transform="translate(350, 10)">
                    <rect x="0" y="0" width="10" height="10" className="fill-current text-primary" rx="2" />
                    <text x="15" y="9" className="text-xs fill-current text-muted-foreground">New</text>
                    <rect x="60" y="0" width="10" height="10" className="fill-current text-primary/30" rx="2" />
                    <text x="75" y="9" className="text-xs fill-current text-muted-foreground">Returning</text>
                 </g>
              </svg>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsView;