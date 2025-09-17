import DoshaAnalysis from "../common/DoshaAnalysis";

// Mock data for the patient's dosha
const patientDoshaData = { vata: 45, pitta: 35, kapha: 20 };

const DoshaAnalysisView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Your Dosha Analysis</h1>
        <p className="text-muted-foreground">
          Understanding your unique constitution is the key to personalized wellness.
        </p>
      </div>
      <DoshaAnalysis data={patientDoshaData} />
    </div>
  );
};

export default DoshaAnalysisView;