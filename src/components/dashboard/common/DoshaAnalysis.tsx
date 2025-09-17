import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DoshaData = {
  vata: number;
  pitta: number;
  kapha: number;
};

const doshaInfo = {
  Vata: "Represents Air and Space. Characteristics include creativity, energy, and a lean build. When imbalanced, can lead to anxiety and dryness.",
  Pitta: "Represents Fire and Water. Characteristics include intelligence, focus, and a strong appetite. When imbalanced, can lead to irritability and inflammation.",
  Kapha: "Represents Earth and Water. Characteristics include calmness, stability, and a strong build. When imbalanced, can lead to sluggishness and congestion.",
};

const DonutChart = ({ data }: { data: DoshaData }) => {
  const total = data.vata + data.pitta + data.kapha;
  const vataPercent = (data.vata / total) * 100;
  const pittaPercent = (data.pitta / total) * 100;

  const vataOffset = 0;
  const pittaOffset = vataPercent;

  return (
    <svg viewBox="0 0 36 36" className="w-48 h-48">
      <circle cx="18" cy="18" r="15.915" className="stroke-current text-warm/20" strokeWidth="4" fill="none" />
      <circle cx="18" cy="18" r="15.915" className="stroke-current text-blue-500/30" strokeWidth="4" fill="none" strokeDasharray={`${vataPercent}, 100`} />
      <circle cx="18" cy="18" r="15.915" className="stroke-current text-warm" strokeWidth="4" fill="none" strokeDasharray={`${pittaPercent}, 100`} strokeDashoffset={-vataOffset - pittaPercent} style={{ transform: `rotate(${(vataPercent / 100) * 360}deg)`, transformOrigin: 'center' }} />
    </svg>
  );
};

const DoshaAnalysis = ({ data, patientName }: { data: DoshaData, patientName?: string }) => {
  const dominantDosha = Object.keys(data).reduce((a, b) => data[a as keyof DoshaData] > data[b as keyof DoshaData] ? a : b);
  const dominantDoshaCapitalized = dominantDosha.charAt(0).toUpperCase() + dominantDosha.slice(1);

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>Complete Dosha Analysis</CardTitle>
        {patientName && <CardDescription>Showing report for {patientName}</CardDescription>}
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <DonutChart data={data} />
          <div className="mt-4 text-center">
            <p className="text-muted-foreground">Primary Dosha</p>
            <p className="text-2xl font-bold text-primary">{dominantDoshaCapitalized}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Dosha Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(data).map(([dosha, value]) => (
                <div key={dosha}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium capitalize">{dosha}</span>
                    <span className="text-muted-foreground">{value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${dosha === 'vata' ? 'bg-blue-500' : dosha === 'pitta' ? 'bg-warm' : 'bg-red-400'}`} style={{ width: `${value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Characteristics of {dominantDoshaCapitalized}</h3>
            <p className="text-sm text-muted-foreground">{doshaInfo[dominantDoshaCapitalized as keyof typeof doshaInfo]}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoshaAnalysis;