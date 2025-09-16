import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import {
  Leaf,
  Brain,
  Target,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Heart,
  Utensils,
  Activity,
  Home,
  RefreshCw,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

// Mock data for the AI plan based on Prakriti
const prakritiRecommendations = {
  vata: {
    foods: ['Warm, cooked meals', 'Soups and stews', 'Ghee and healthy fats', 'Root vegetables'],
    avoid: ['Dry foods like crackers', 'Cold or raw salads', 'Iced beverages'],
    lifestyle: ['Establish a daily routine', 'Gentle exercise like yoga', 'Stay warm and hydrated'],
  },
  pitta: {
    foods: ['Cooling fruits and vegetables', 'Leafy greens', 'Coconut oil', 'Sweet and bitter tastes'],
    avoid: ['Spicy and hot foods', 'Excessive oil and frying', 'Fermented foods'],
    lifestyle: ['Meditation and cooling breathwork', 'Swimming', 'Avoid peak sun exposure'],
  },
  kapha: {
    foods: ['Light and dry foods', 'Legumes and beans', 'Spicy foods (ginger, black pepper)', 'Bitter and pungent tastes'],
    avoid: ['Dairy and heavy foods', 'Sweet and oily foods', 'Cold beverages'],
    lifestyle: ['Regular, vigorous exercise', 'Wake up early', 'Stay active and energized'],
  },
};

const PatientAssessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    constitution: {
      digestion: "",
      energy: "",
      sleep: ""
    },
    healthGoals: {} as Record<string, boolean>,
    dietaryPreferences: {
      foodOption: "", // New field for food options
      spiceLevel: "",
      mealTiming: "",
      cookingStyle: ""
    }
  });
  const [constitutionScores, setConstitutionScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [prakriti, setPrakriti] = useState("");
  const [showResults, setShowResults] = useState(false);

  const steps = [
    { id: 1, title: "Ayurvedic Assessment", icon: Brain, description: "Discover your unique constitution" },
    { id: 2, title: "Health Goals", icon: Target, description: "Set your wellness objectives" },
    { id: 3, title: "Diet Preferences", icon: Utensils, description: "Share your food preferences" },
    { id: 4, title: "Your Plan", icon: Sparkles, description: "View your personalized diet plan" }
  ];

  const constitutionQuestions = [
    {
      id: "digestion",
      question: "How is your digestion typically?",
      options: [
        { value: "vata", label: "Irregular, sometimes bloated, gas", description: "Variable appetite, tends to be anxious about food" },
        { value: "pitta", label: "Strong, regular, efficient", description: "Good appetite, gets hungry easily" },
        { value: "kapha", label: "Slow but steady, heavy feeling", description: "Moderate appetite, takes time to digest" }
      ]
    },
    {
      id: "energy",
      question: "What best describes your energy levels?",
      options: [
        { value: "vata", label: "Bursts of energy, then exhaustion", description: "Creative bursts followed by fatigue" },
        { value: "pitta", label: "Consistent, focused, driven", description: "Sustained energy throughout the day" },
        { value: "kapha", label: "Steady, enduring, slow to start", description: "Takes time to get going but maintains well" }
      ]
    },
    {
      id: "sleep",
      question: "How do you typically sleep?",
      options: [
        { value: "vata", label: "Light sleeper, restless, racing thoughts", description: "Often wake up during night" },
        { value: "pitta", label: "Moderate sleep, vivid dreams", description: "Generally good sleep quality" },
        { value: "kapha", label: "Deep, long sleep, hard to wake up", description: "Love sleeping in, feel groggy when woken" }
      ]
    }
  ];

  const healthGoals = [
    { id: "weight-loss", label: "Weight Management", icon: Activity, description: "Achieve healthy weight balance" },
    { id: "diabetes", label: "Blood Sugar Control", icon: Heart, description: "Manage diabetes naturally" },
    { id: "digestion", label: "Digestive Health", icon: Utensils, description: "Improve digestion and gut health" },
    { id: "energy", label: "Boost Energy", icon: Sparkles, description: "Increase vitality and stamina" },
    { id: "stress", label: "Stress Management", icon: Brain, description: "Reduce stress and anxiety" },
    { id: "immunity", label: "Build Immunity", icon: CheckCircle, description: "Strengthen natural defenses" }
  ];

  // Combined dietary preferences
  const dietaryPreferencesQuestions = [
    {
      id: "foodOption",
      question: "What is your primary food preference?",
      options: [
        { value: "vegetarian", label: "Vegetarian", description: "Excludes meat, poultry, and fish" },
        { value: "non-vegetarian", label: "Non-Vegetarian", description: "Includes meat and other animal products" },
        { value: "vegan", label: "Vegan", description: "Excludes all animal products" },
      ],
      isRadio: true,
    },
    {
      id: "spiceLevel",
      question: "How do you prefer your foods?",
      options: [
        { value: "mild", label: "Mild & Cooling", description: "Prefer less spicy, cooling foods" },
        { value: "moderate", label: "Balanced & Moderate", description: "Enjoy variety in flavors and temperatures" },
        { value: "warm-spicy", label: "Warm & Spicy", description: "Love warming spices and cooked foods" }
      ],
      isRadio: true,
    },
    {
      id: "mealTiming",
      question: "What best describes your meal timing?",
      options: [
        { value: "irregular", label: "Irregular", description: "Eat at different times each day" },
        { value: "regular", label: "Regular", description: "Stick to a consistent meal schedule" },
        { value: "skipping-meals", label: "Skipping meals", description: "Often skip meals due to lack of appetite or time" }
      ],
      isRadio: true,
    },
    {
      id: "cookingStyle",
      question: "What's your typical cooking style?",
      options: [
        { value: "raw", label: "Raw & Fresh", description: "Prefer salads, fresh fruits, and raw vegetables" },
        { value: "cooked-light", label: "Cooked & Light", description: "Enjoy lightly cooked meals, stir-fries" },
        { value: "heavy-oily", label: "Heavy & Oily", description: "Often consume rich, oily, and fried foods" }
      ],
      isRadio: true,
    }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (currentStep === 1) {
        calculatePrakriti();
      }
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculatePrakriti = () => {
    const answers = Object.values(assessmentData.constitution);
    const counts = { vata: 0, pitta: 0, kapha: 0 };

    answers.forEach(answer => {
      if (answer) counts[answer as keyof typeof counts]++;
    });

    setConstitutionScores(counts);

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    if (dominant[0][1] === dominant[1][1]) {
      setPrakriti(`${dominant[0][0]}-${dominant[1][0]}`.replace(/^./, c => c.toUpperCase()));
    } else {
      setPrakriti(dominant[0][0].charAt(0).toUpperCase() + dominant[0][0].slice(1));
    }
  };

  const handleConstitutionAnswer = (questionId: string, value: string) => {
    setAssessmentData(prev => ({
      ...prev,
      constitution: {
        ...prev.constitution,
        [questionId as keyof typeof prev.constitution]: value
      }
    }));
  };

  const handleGoalToggle = (goalId: string) => {
    setAssessmentData(prev => ({
      ...prev,
      healthGoals: {
        ...prev.healthGoals,
        [goalId]: !prev.healthGoals[goalId]
      }
    }));
  };

  const handleDietaryPreferenceAnswer = (questionId: string, value: string) => {
    setAssessmentData(prev => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        [questionId as keyof typeof prev.dietaryPreferences]: value
      }
    }));
  };

  const handleComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: updateError } = await supabase
          .from('patient_profiles')
          .update({
            assessment_completed: true,
            prakriti_type: prakriti,
            constitution_scores: constitutionScores,
            health_goals: Object.keys(assessmentData.healthGoals).filter(key => assessmentData.healthGoals[key]),
            dietary_preferences: assessmentData.dietaryPreferences || {}
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error saving assessment:', updateError);
        }
      }
      setShowResults(true);
    } catch (error) {
      console.error('Error completing assessment:', error);
      setShowResults(true);
    }
  };

  const handleRetakeAssessment = () => {
    setCurrentStep(1);
    setAssessmentData({
      constitution: { digestion: "", energy: "", sleep: "" },
      healthGoals: {},
      dietaryPreferences: { foodOption: "", spiceLevel: "", mealTiming: "", cookingStyle: "" }
    });
    setPrakriti('');
    setShowResults(false);
  };

  const getDietPlanPreview = () => {
    if (!prakriti || !prakritiRecommendations[prakriti.toLowerCase()]) {
        return { foods: [], avoid: [], lifestyle: [] };
    }
    return prakritiRecommendations[prakriti.toLowerCase()];
  };

  useEffect(() => {
    const checkAssessmentStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('patient_profiles')
          .select('assessment_completed, prakriti_type, constitution_scores, health_goals')
          .eq('user_id', user.id)
          .single();

        if (profile?.assessment_completed && profile?.prakriti_type) {
          setPrakriti(profile.prakriti_type);
          setShowResults(true);
        }
      }
    };
    checkAssessmentStatus();
  }, []);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-sage p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-primary rounded-full p-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-sage-800 mb-2">
                  Assessment Complete!
                </CardTitle>
                <CardDescription className="text-lg">
                  Welcome back! Your Ayurvedic constitution is <strong>{prakriti}</strong>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => navigate('/patient/dashboard')} className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
                <Button variant="outline" onClick={handleRetakeAssessment} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retake Assessment
                </Button>
              </div>
              <Button variant="ghost" onClick={() => navigate('/')} className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isStepOneValid = Object.values(assessmentData.constitution).every(val => val !== "");
  const isStepTwoValid = Object.values(assessmentData.healthGoals).some(val => val === true);
  const isStepThreeValid = Object.values(assessmentData.dietaryPreferences).every(val => val !== "");

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">AyurVeda AI</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Discover Your Ayurvedic Profile</h1>
          <p className="text-lg text-muted-foreground">Personalized wellness starts with understanding your unique constitution</p>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-smooth ${
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground text-muted-foreground"
                }`}>
                  {currentStep > step.id ? <CheckCircle className="h-6 w-6" /> : React.createElement(step.icon, { className: "h-6 w-6" })}
                </div>
                <span className="text-sm text-center mt-2 font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-center text-lg">
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Constitution Questions */}
            {currentStep === 1 && (
              <div className="space-y-8">
                {constitutionQuestions.map((question) => (
                  <div key={question.id} className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>
                    <RadioGroup
                      value={assessmentData.constitution[question.id as keyof typeof assessmentData.constitution]}
                      onValueChange={(value) => handleConstitutionAnswer(question.id, value)}
                      className="space-y-3"
                    >
                      {question.options.map((option) => (
                        <div key={option.value} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={`${question.id}-${option.value}`} className="text-base font-medium cursor-pointer">
                              {option.label}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            )}
            {/* Step 2: Health Goals */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Select your primary health goals (choose multiple):</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {healthGoals.map((goal) => (
                    <Card
                      key={goal.id}
                      className={`cursor-pointer transition-smooth hover:shadow-soft ${
                        assessmentData.healthGoals[goal.id]
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleGoalToggle(goal.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            assessmentData.healthGoals[goal.id]
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            <goal.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{goal.label}</h4>
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                          </div>
                          {assessmentData.healthGoals[goal.id] && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {/* Step 3: Dietary Preferences and Food Options */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {dietaryPreferencesQuestions.map((question) => (
                  <div key={question.id}>
                    <h3 className="text-lg font-semibold text-foreground mb-4">{question.question}</h3>
                    <RadioGroup
                      value={assessmentData.dietaryPreferences[question.id as keyof typeof assessmentData.dietaryPreferences]}
                      onValueChange={(value) => handleDietaryPreferenceAnswer(question.id, value)}
                      className="space-y-3"
                    >
                      {question.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                          <Label htmlFor={`${question.id}-${option.value}`} className="flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">{option.label}</p>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            )}
            {/* Step 4: AI Plan Preview & Premium */}
            {currentStep === 4 && prakriti && (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 mb-6">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-primary font-semibold">Your Ayurvedic Profile</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    Your Prakriti: <span className="text-primary">{prakriti}</span>
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Based on your responses, we've identified your unique Ayurvedic constitution and created a personalized diet plan.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-left">
                    <Card className="shadow-soft">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-accent mb-2">✓ Recommended Foods</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          {getDietPlanPreview().foods.map((food, index) => (
                            <li key={index}>• {food}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="shadow-soft">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-warm mb-2">⚠ Foods to Limit</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          {getDietPlanPreview().avoid.map((food, index) => (
                            <li key={index}>• {food}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="shadow-soft">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-sage-foreground mb-2">🌿 Lifestyle Tips</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          {getDietPlanPreview().lifestyle.map((tip, index) => (
                            <li key={index}>• {tip}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                {/* Premium Upgrade */}
                <div className="bg-gradient-to-r from-accent/5 to-warm/5 rounded-lg p-6 border border-accent/20">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <span className="font-semibold text-accent">Upgrade to Premium</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Get unlimited access to detailed meal plans, nutrient tracking, and direct consultation with certified Ayurvedic dietitians.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="accent">
                      Upgrade to Premium - ₹999/month
                    </Button>
                    <Link to="/patient/dashboard">
                      <Button variant="outline">
                        Continue with Free Plan
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-border mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Step {currentStep} of {steps.length}
                </p>
              </div>
              <Button
                variant="default"
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !isStepOneValid) ||
                  (currentStep === 2 && !isStepTwoValid) ||
                  (currentStep === 3 && !isStepThreeValid)
                }
                className="flex items-center gap-2"
              >
                {currentStep === steps.length ? "Complete Assessment" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientAssessment;