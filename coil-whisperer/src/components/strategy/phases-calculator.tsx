import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, RotateCcw, AlertCircle, ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type RiskLevel = "very-low" | "low" | "moderate" | "high" | "very-high";

const PHASESCalculator = () => {
  const [population, setPopulation] = useState<string>("");
  const [hypertension, setHypertension] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [earlierSAH, setEarlierSAH] = useState<string>("");
  const [site, setSite] = useState<string>("");

  const populationOptions = [
    { value: "0", label: "North American, European (other than Finnish)", points: 0 },
    { value: "3", label: "Japanese", points: 3 },
    { value: "5", label: "Finnish", points: 5 },
  ];

  const hypertensionOptions = [
    { value: "0", label: "No", points: 0 },
    { value: "1", label: "Yes", points: 1 },
  ];

  const ageOptions = [
    { value: "0", label: "< 70 years", points: 0 },
    { value: "1", label: "≥ 70 years", points: 1 },
  ];

  const sizeOptions = [
    { value: "0", label: "< 7.0 mm", points: 0 },
    { value: "3", label: "7.0 - 9.9 mm", points: 3 },
    { value: "6", label: "10.0 - 19.9 mm", points: 6 },
    { value: "10", label: "≥ 20.0 mm", points: 10 },
  ];

  const earlierSAHOptions = [
    { value: "0", label: "No", points: 0 },
    { value: "1", label: "Yes (from different aneurysm)", points: 1 },
  ];

  const siteOptions = [
    { value: "0", label: "ICA", points: 0 },
    { value: "2", label: "MCA", points: 2 },
    { value: "4", label: "ACA / PComm / Posterior", points: 4 },
  ];

  const totalScore = useMemo(() => {
    const values = [population, hypertension, age, size, earlierSAH, site];
    if (values.some(v => v === "")) return null;
    return values.reduce((sum, val) => sum + parseInt(val), 0);
  }, [population, hypertension, age, size, earlierSAH, site]);

  const getRiskData = (score: number | null): { level: RiskLevel; risk: string; description: string } => {
    if (score === null) return { level: "very-low", risk: "—", description: "Complete all fields to calculate risk" };
    if (score <= 2) return { level: "very-low", risk: "0.4%", description: "Very low 5-year rupture risk" };
    if (score <= 4) return { level: "low", risk: "0.7%", description: "Low 5-year rupture risk" };
    if (score <= 6) return { level: "moderate", risk: "2.4%", description: "Moderate 5-year rupture risk" };
    if (score <= 8) return { level: "high", risk: "3.2%", description: "High 5-year rupture risk" };
    return { level: "very-high", risk: "14.8%", description: "Very high 5-year rupture risk" };
  };

  const riskData = getRiskData(totalScore);

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case "very-low": return "bg-emerald-500";
      case "low": return "bg-green-500";
      case "moderate": return "bg-yellow-500";
      case "high": return "bg-orange-500";
      case "very-high": return "bg-red-500";
    }
  };

  const getRiskBorderColor = (level: RiskLevel) => {
    switch (level) {
      case "very-low": return "border-emerald-500";
      case "low": return "border-green-500";
      case "moderate": return "border-yellow-500";
      case "high": return "border-orange-500";
      case "very-high": return "border-red-500";
    }
  };

  const isComplete = totalScore !== null;

  const handleReset = () => {
    setPopulation("");
    setHypertension("");
    setAge("");
    setSize("");
    setEarlierSAH("");
    setSite("");
  };

  const renderRadioGroup = (
    label: string,
    description: string,
    value: string,
    onChange: (value: string) => void,
    options: { value: string; label: string; points: number }[],
    letter: string
  ) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-medical-primary border-medical-primary font-bold">
          {letter}
        </Badge>
        <Label className="text-base font-semibold">{label}</Label>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{description}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {options.map((option) => (
          <div
            key={option.value}
            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer hover:border-medical-primary/50 ${
              value === option.value 
                ? "border-medical-primary bg-medical-primary/5" 
                : "border-border bg-background"
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value={option.value} id={`${label}-${option.value}`} />
              <Label htmlFor={`${label}-${option.value}`} className="cursor-pointer">
                {option.label}
              </Label>
            </div>
            <Badge variant="secondary" className="ml-2">
              +{option.points}
            </Badge>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calculator Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              PHASES Score Calculator
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>The PHASES score predicts 5-year risk of rupture of intracranial aneurysms. Based on data from 8,382 patients with 10,272 unruptured aneurysms.</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Select options for each risk factor to calculate the 5-year rupture risk
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderRadioGroup(
                "Population",
                "Geographic/ethnic origin of the patient affects baseline rupture risk",
                population,
                setPopulation,
                populationOptions,
                "P"
              )}
              {renderRadioGroup(
                "Hypertension",
                "History of hypertension requiring treatment",
                hypertension,
                setHypertension,
                hypertensionOptions,
                "H"
              )}
              {renderRadioGroup(
                "Age",
                "Patient age at time of assessment",
                age,
                setAge,
                ageOptions,
                "A"
              )}
              {renderRadioGroup(
                "Size",
                "Maximum diameter of the aneurysm",
                size,
                setSize,
                sizeOptions,
                "S"
              )}
              {renderRadioGroup(
                "Earlier SAH",
                "Previous subarachnoid hemorrhage from a different aneurysm",
                earlierSAH,
                setEarlierSAH,
                earlierSAHOptions,
                "E"
              )}
              {renderRadioGroup(
                "Site",
                "Location of the aneurysm (ICA = Internal Carotid Artery, MCA = Middle Cerebral Artery, ACA = Anterior Cerebral Artery, PComm = Posterior Communicating)",
                site,
                setSite,
                siteOptions,
                "S"
              )}
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset Calculator
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Panel */}
      <div className="space-y-6">
        <Card className={`shadow-elevated border-2 ${isComplete ? getRiskBorderColor(riskData.level) : "border-border"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Score Display */}
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-foreground mb-2">
                {totalScore !== null ? totalScore : "—"}
              </div>
              <div className="text-sm text-muted-foreground">Total PHASES Score</div>
            </div>

            {/* Risk Level */}
            {isComplete && (
              <div className={`rounded-lg p-4 ${getRiskColor(riskData.level)} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">5-Year Rupture Risk</span>
                  {riskData.level === "very-high" || riskData.level === "high" ? (
                    <AlertTriangle className="h-5 w-5" />
                  ) : (
                    <CheckCircle className="h-5 w-5" />
                  )}
                </div>
                <div className="text-3xl font-bold">{riskData.risk}</div>
                <div className="text-sm opacity-90 mt-1">{riskData.description}</div>
              </div>
            )}

            {!isComplete && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Complete all risk factors to calculate the PHASES score
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reference Table */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Score Interpretation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {[
                { score: "0-2", risk: "0.4%", level: "very-low" as RiskLevel },
                { score: "3-4", risk: "0.7%", level: "low" as RiskLevel },
                { score: "5-6", risk: "2.4%", level: "moderate" as RiskLevel },
                { score: "7-8", risk: "3.2%", level: "high" as RiskLevel },
                { score: "9-22", risk: "14.8%", level: "very-high" as RiskLevel },
              ].map((item) => (
                <div
                  key={item.score}
                  className={`flex items-center justify-between p-2 rounded ${
                    totalScore !== null && getRiskData(totalScore).level === item.level
                      ? "bg-muted border-2 border-foreground/20"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getRiskColor(item.level)}`} />
                    <span>Score {item.score}</span>
                  </div>
                  <span className="font-medium">{item.risk}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Citation */}
        <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
          <strong>Reference:</strong> Greving JP, et al. Development of the PHASES score for prediction of risk of rupture of intracranial aneurysms: a pooled analysis of six prospective cohort studies. Lancet Neurol. 2014;13(1):59-66.
        </div>
      </div>

      {/* Caveats Section - Full Width */}
      <div className="lg:col-span-3">
        <Card className="shadow-card border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Important Limitations & Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 mb-4 border border-amber-200 dark:border-amber-800">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                ⚠️ PHASES should be used only as a guide because several other important risk factors are not included in the score.
              </p>
            </div>

            <Accordion type="multiple" className="w-full">
              <AccordionItem value="size">
                <AccordionTrigger className="text-sm font-semibold">
                  Aneurysm Size Considerations
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Aneurysmal size (maximum luminal diameter in mm) is one of the most important factors determining rupture risk. PHASES established that this risk rises above a <strong className="text-foreground">threshold diameter of 7 mm</strong>.
                  </p>
                  <p>
                    Studies have confirmed that <strong className="text-foreground">85% of aneurysms with diameter below 7 mm remained stable</strong> and did not grow during 10 years of follow-up. However, aneurysms measuring <strong className="text-foreground">≥5 mm have an increased risk of haemorrhage</strong>.
                  </p>
                  <p>
                    A diameter of <strong className="text-foreground">5–7 mm is generally considered the threshold for treatment</strong>, but the decision also rests on other factors such as age, aneurysm location and morphology, family history, and comorbidities.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="excluded">
                <AccordionTrigger className="text-sm font-semibold">
                  Risk Factors NOT Included in PHASES
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <p className="mb-3">
                    The following potentially important risk factors could not be included in the PHASES analysis due to incomplete or heterogeneously defined data:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      "Smoking status",
                      "Heavy alcohol consumption",
                      "Aneurysm morphology",
                      "Aneurysm growth",
                      "Inflammation markers",
                      "Family history",
                      "Female sex",
                      "Aneurysm multiplicity"
                    ].map((factor) => (
                      <div key={factor} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                        <AlertTriangle className="h-3 w-3 text-amber-500 flex-shrink-0" />
                        <span className="text-xs">{factor}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="smoking">
                <AccordionTrigger className="text-sm font-semibold">
                  Smoking as a Risk Factor
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <p>
                    Smoking is a <strong className="text-foreground">well-established risk factor</strong> for aneurysm formation, growth, and rupture of unruptured intracranial aneurysms (UIA), with a <strong className="text-foreground">linear, dose-dependent association</strong>. Despite its importance, it could not be incorporated into the PHASES score.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* MARTA Score Section - Full Width */}
      <div className="lg:col-span-3">
        <Card className="shadow-elevated border-l-4 border-l-medical-secondary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-3">
                  MARTA Score Calculator
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Model for Assessing the Risks of Treatment of unruptured intracranial Aneurysms
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => window.open('https://martascoreapp.shinyapps.io/martascoreapp/', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-subtle rounded-lg p-4 border">
                <h4 className="font-semibold mb-2">Treatment Risk Assessment</h4>
                <p className="text-sm text-muted-foreground">
                  Estimates the risk of unfavourable outcomes after endovascular or surgical treatment of unruptured intracranial aneurysms
                </p>
              </div>
              <div className="bg-gradient-subtle rounded-lg p-4 border">
                <h4 className="font-semibold mb-2">Informed Decision Making</h4>
                <p className="text-sm text-muted-foreground">
                  Helps balance the natural rupture risk (PHASES) against the procedural risks of intervention
                </p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden border-2 border-border bg-white">
              <iframe
                src="https://martascoreapp.shinyapps.io/martascoreapp/"
                title="MARTA Score - Risks to Treatment of Unruptured Intracranial Aneurysms"
                className="w-full h-[700px]"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
            
            <p className="text-xs text-muted-foreground mt-4 text-center">
              External tool provided by martascoreapp.shinyapps.io. For clinical use, always verify calculations independently.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PHASESCalculator;
