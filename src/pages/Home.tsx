// @ts-nocheck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Droplets, Heart, Scale, Syringe, Activity as PulseIcon, Dna, FileText, ChevronRight, Info, ChevronDown, Upload, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PrescriptionState {
  visible: boolean;
  content: React.ReactNode;
  severity?: string;
}

const categoryColors = {
  diabetes: {
    accent: "#f87171",
    bg: "rgba(248,113,113,0.12)",
    border: "rgba(248,113,113,0.2)",
    gradient: "from-red-500 to-rose-600",
  },
  hypertension: {
    accent: "#fb923c",
    bg: "rgba(251,146,60,0.12)",
    border: "rgba(251,146,60,0.2)",
    gradient: "from-orange-500 to-amber-600",
  },
  lipid: {
    accent: "#60a5fa",
    bg: "rgba(96,165,250,0.12)",
    border: "rgba(96,165,250,0.2)",
    gradient: "from-blue-500 to-cyan-600",
  },
  obesity: {
    accent: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.2)",
    gradient: "from-violet-500 to-purple-600",
  },
};

// Full forms data for abbreviations
const fullForms: Record<string, string> = {
  // Diabetes
  "FG": "Fasting Glucose",
  "HbA1c": "Glycated Hemoglobin",
  "PP": "Post-Prandial (2-hour)",
  "CrCl": "Creatinine Clearance",
  "CVD": "Cardiovascular Disease",
  "HF": "Heart Failure",
  "CKD": "Chronic Kidney Disease",
  // Hypertension
  "SBP": "Systolic Blood Pressure",
  "DBP": "Diastolic Blood Pressure",
  "BP": "Blood Pressure",
  "DM": "Diabetes Mellitus",
  "CAD": "Coronary Artery Disease",
  "ESC": "European Society of Cardiology",
  // Lipids
  "LDL": "Low-Density Lipoprotein",
  "HDL": "High-Density Lipoprotein",
  "TG": "Triglycerides",
  "ASCVD": "Atherosclerotic Cardiovascular Disease",
  "FHx": "Family History",
  "AACE": "American Association of Clinical Endocrinology",
  // Obesity
  "BMI": "Body Mass Index",
  "HTN": "Hypertension",
  "OSA": "Obstructive Sleep Apnea",
  "NAFLD": "Non-Alcoholic Fatty Liver Disease",
  "MASLD": "Metabolic Dysfunction-Associated Steatotic Liver Disease",
  "TOS": "The Obesity Society",
  "Rx": "Prescription",
  "NCD": "Non-Communicable Disease",
};

function AbbreviationLabel({ abbr, fullForm }: { abbr: string; fullForm?: string }) {
  const displayFullForm = fullForm || fullForms[abbr] || abbr;

  return (
    <div className="group relative inline-block">
      <button className="flex items-center gap-0.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-help">
        {abbr}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity"><Info className="h-3 w-3 text-muted-foreground/50" /></span>
      </button>
      <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block z-10">
        <div className="bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg border border-border whitespace-nowrap">
          {displayFullForm}
        </div>
      </div>
    </div>
  );
}

function FullFormsLegend() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
      <Card className="border-border/40 bg-muted/20">
        <CollapsibleTrigger asChild>
          <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Abbreviations & Full Forms</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-xs">
              {Object.entries(fullForms).map(([abbr, full]) => (
                <div key={abbr} className="flex items-baseline gap-2">
                  <span className="font-medium text-foreground min-w-[3rem]">{abbr}</span>
                  <span className="text-muted-foreground">{full}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

interface OCRUploadProps {
  onValuesExtracted: (values: {
    fg?: string;
    a1c?: string;
    ldl?: string;
    hdl?: string;
    tg?: string;
    creatinine?: string;
    egfr?: string;
    age?: string;
  }) => void;
}

function OCRUpload({ onValuesExtracted }: OCRUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedValues, setExtractedValues] = useState<Record<string, string> | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setIsProcessing(true);
    setExtractedValues(null);

    // Simulate OCR processing with mock values
    // In production, this would call an OCR API like:
    // - Google Cloud Vision API
    // - Azure Computer Vision
    // - AWS Textract
    // - Tesseract.js (client-side)
    setTimeout(() => {
      // Demo extracted values - these would come from actual OCR
      const mockValues = {
        fg: "142",
        a1c: "7.2",
        ldl: "128",
        hdl: "42",
        tg: "156",
        creatinine: "1.1",
        egfr: "",
        age: "58",
      };
      setExtractedValues(mockValues);
      onValuesExtracted(mockValues);
      setIsProcessing(false);
    }, 2000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setExtractedValues(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
      <Card className="border-border/40 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <CollapsibleTrigger asChild>
          <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-foreground">Smart Lab Upload (OCR)</span>
              <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400">Beta</Badge>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 pb-4">
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              {!previewUrl ? (
                <div
                  onClick={triggerFileInput}
                  className="border-2 border-dashed border-border/60 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Upload lab report image</p>
                  <p className="text-xs text-muted-foreground">Supports JPG, PNG, PDF</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-2">Auto-extracts: Glucose, HbA1c, Lipids, Creatinine, eGFR</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <img src={previewUrl} alt="Lab report preview" className="rounded-lg max-h-48 mx-auto" />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Extracting values...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {extractedValues && !isProcessing && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-green-400">Extracted Values</span>
                        <button onClick={clearImage} className="text-[10px] text-muted-foreground hover:text-foreground">Clear</button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {extractedValues.fg && (
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">FG:</span>
                            <span className="font-medium">{extractedValues.fg}</span>
                          </div>
                        )}
                        {extractedValues.a1c && (
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">HbA1c:</span>
                            <span className="font-medium">{extractedValues.a1c}%</span>
                          </div>
                        )}
                        {extractedValues.ldl && (
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">LDL:</span>
                            <span className="font-medium">{extractedValues.ldl}</span>
                          </div>
                        )}
                        {extractedValues.hdl && (
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">HDL:</span>
                            <span className="font-medium">{extractedValues.hdl}</span>
                          </div>
                        )}
                        {extractedValues.tg && (
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">TG:</span>
                            <span className="font-medium">{extractedValues.tg}</span>
                          </div>
                        )}
                        {extractedValues.creatinine && (
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Creat:</span>
                            <span className="font-medium">{extractedValues.creatinine}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="text-xs text-muted-foreground bg-muted/30 rounded p-3">
                <p className="font-medium mb-1">Note on OCR:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>Upload clear, well-lit images for best results</li>
                  <li>Review extracted values before generating prescriptions</li>
                  <li>Manual correction may be needed for handwritten reports</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export default function Home() {
  const navigate = useNavigate();

  // Unified patient conditions - shared across all modules
  const [patientConditions, setPatientConditions] = useState({
    dm: false,        // Diabetes - shared
    htn: false,       // Hypertension - shared
    ckd: false,       // Chronic Kidney Disease - shared
    hf: false,        // Heart Failure - shared
    cvd: false,       // CVD - Diabetes only
    obesity: false,   // Obesity - Diabetes only
    cad: false,       // CAD - HTN only
    stroke: false,    // Stroke - HTN only
    smoker: false,    // Smoker - Lipid only
    fhx: false,       // Family History - Lipid only
    ascvd: false,     // ASCVD - Lipid only
    dyslipidemia: false, // Dyslipidemia - Obesity only
    osa: false,       // OSA - Obesity only
    nafld: false,     // NAFLD - Obesity only
  });

  // Helper to toggle patient condition (shared across all modules)
  const toggleCondition = (key: keyof typeof patientConditions) => {
    setPatientConditions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Diabetes state
  const [dmInputs, setDmInputs] = useState({
    fg: "",
    a1c: "",
    pp: "",
    egfr: "",
    weight: "",
    creatinine: "",
    age: "",
    currentGlucose: "",
    insulinStatus: "insulin-naive" as "insulin-naive" | "on-basal",
  });
  const [dmRx, setDmRx] = useState<PrescriptionState>({ visible: false, content: null });
  const [dmSex, setDmSex] = useState<"male" | "female">("male");

  // Calculate Creatinine Clearance (Cockcroft-Gault) - uses weight as requested
  const calculateCrCl = (creatinine: number, age: number, weight: number, sex: "male" | "female"): number => {
    if (!creatinine || !age || !weight) return 0;
    const sexCoeff = sex === "female" ? 0.85 : 1.0;
    const crCl = ((140 - age) * weight * sexCoeff) / (72 * creatinine);
    return Math.round(crCl);
  };

  // HTN state
  const [htnInputs, setHtnInputs] = useState({ sbp: "", dbp: "", age: "" });
  const [htnTarget, setHtnTarget] = useState("intensive");
  const [htnRx, setHtnRx] = useState<PrescriptionState>({ visible: false, content: null });

  // Lipid state
  const [lipInputs, setLipInputs] = useState({ ldl: "", hdl: "", tg: "", age: "", lpa: "" });
  const [lipRx, setLipRx] = useState<PrescriptionState>({ visible: false, content: null });

  // Obesity state
  const [obeInputs, setObeInputs] = useState({ bmi: "", waist: "", weight: "", height: "" });
  const [obeRx, setObeRx] = useState<PrescriptionState>({ visible: false, content: null });
  const [obeUnits, setObeUnits] = useState<{ weight: "kg" | "lb", height: "cm" | "ft" }>({ weight: "kg", height: "cm" });

  // Calculate BMI from weight and height
  const calculateBMI = (weight: number, height: number, weightUnit: "kg" | "lb", heightUnit: "cm" | "ft"): number => {
    if (!weight || !height) return 0;
    // Convert to metric
    const weightKg = weightUnit === "lb" ? weight * 0.453592 : weight;
    const heightM = heightUnit === "ft" ? height * 0.3048 : height / 100;
    if (heightM <= 0) return 0;
    return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
  };

  // Comprehensive
  const [compRx, setCompRx] = useState<PrescriptionState>({ visible: false, content: null });

  const generateDiabetesRx = () => {
    const fg = parseFloat(dmInputs.fg) || 0;
    const a1c = parseFloat(dmInputs.a1c) || 0;
    const egfr = parseFloat(dmInputs.egfr) || 90;
    const { cvd, hf, ckd, obesity } = patientConditions;

    if (!fg && !a1c) {
      setDmRx({ visible: true, content: <p className="text-sm text-muted-foreground">Enter at least fasting glucose or HbA1c to generate a prescription.</p>, severity: "low" });
      return;
    }

    let severity = "low";
    const meds: string[] = [];

    if (a1c >= 9 || fg >= 250) {
      severity = "high";
      meds.push("Metformin + combination therapy indicated — consider GLP-1 RA or insulin");
      if (a1c >= 10 || fg >= 300) meds.push("Initiate insulin therapy (basal-bolus if symptomatic)");
    } else if (a1c >= 7 || fg >= 126) {
      severity = "moderate";
      meds.push("Metformin monotherapy (500–1000 mg BID, titrate as tolerated)");
      if (a1c >= 8) meds.push("Add GLP-1 RA or SGLT2i as second agent");
    } else {
      meds.push("Metformin 500 mg BID if not contraindicated");
      meds.push("Reinforce lifestyle modification — diet, exercise, weight management");
    }

    if (cvd || hf || ckd) {
      meds.push("PREFERRED: SGLT2 inhibitor (empagliflozin 10–25 mg or dapagliflozin 10 mg) — cardio-renal benefit");
      if (hf) meds.push("Add SGLT2i regardless of glycemic control — HF indication");
    }
    if (ckd && egfr < 30) {
      meds.push("Caution: eGFR <30 — adjust metformin dose; consider DPP-4i as alternative");
    }
    if (obesity) {
      meds.push("GLP-1 RA preferred (semaglutide 0.5–1 mg weekly) — weight benefit");
      meds.push("Consider SGLT2i — modest weight reduction");
    }
    if (obesity && a1c >= 7) {
      meds.push("Tirzepatide if available — superior HbA1c and weight reduction");
    }

    const targetA1c = ckd || hf || cvd ? "<7.0% (more stringent)" : "<7.0–7.5%";

    setDmRx({
      visible: true,
      severity,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: categoryColors.diabetes.accent }}>Diabetes Prescription</span>
            <Badge className={severity === "high" ? "bg-destructive/20 text-destructive" : severity === "moderate" ? "bg-warning/20 text-warning" : "bg-success/20 text-success"}>
              {severity === "high" ? "High Intensity" : severity === "moderate" ? "Moderate" : "Low Intensity"}
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.diabetes.accent }}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Medication Plan</p>
              <ul className="space-y-1">
                {meds.map((m, i) => <li key={i} className="text-sm text-foreground">→ {m}</li>)}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.diabetes.accent }}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Glycemic Targets</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>HbA1c target: {targetA1c}</li>
                <li>Fasting glucose: &lt;7.0 mmol/L (&lt;126 mg/dL)</li>
                <li>Post-prandial: &lt;10.0 mmol/L (&lt;180 mg/dL)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    });
  };

  const generateHtnRx = () => {
    const sbp = parseFloat(htnInputs.sbp) || 0;
    const dbp = parseFloat(htnInputs.dbp) || 0;
    const { dm, ckd, cad, stroke, hf } = patientConditions;

    if (!sbp) {
      setHtnRx({ visible: true, content: <p className="text-sm text-muted-foreground">Enter SBP to generate a prescription.</p>, severity: "low" });
      return;
    }

    let targetSBP = 130, targetDBP = 80;
    if (htnTarget === "standard") { targetSBP = 140; targetDBP = 90; }
    else if (htnTarget === "elderly") { targetSBP = 150; targetDBP = 90; }

    let stage = "normal";
    if (sbp >= 180 || dbp >= 120) stage = "crisis";
    else if (sbp >= 160 || dbp >= 100) stage = "stage2";
    else if (sbp >= 140 || dbp >= 90) stage = "stage1";
    else if (sbp >= 130) stage = "elevated";

    let intensity = "low";
    const meds: string[] = [];

    if (stage === "crisis") {
      intensity = "high";
      meds.push("URGENT: Evaluate for hypertensive emergency — IV therapy if end-organ damage");
      meds.push("Initiate 2-drug combination: ACEi/ARB + CCB");
      if (hf) meds.push("If acute HF: IV nitroglycerin + diuretic");
      if (stroke) meds.push("If acute stroke: permissive HTN (SBP <220) unless thrombolysis candidate");
    } else if (stage === "stage2") {
      intensity = "high";
      meds.push("Initiate 2-drug combination therapy");
      meds.push("First-line: ACEi/ARB + CCB (amlodipine 5–10 mg)");
      if (ckd) meds.push("ACEi/ARB preferred — renoprotective");
      if (hf) meds.push("Add beta-blocker (carvedilol or bisoprolol)");
      if (cad) meds.push("Beta-blocker + ACEi/ARB — CAD benefit");
      if (dm) meds.push("ACEi/ARB first-line — nephroprotection");
      if (ckd && dm) meds.push("ACEi/ARB mandatory regardless of BP level");
    } else if (stage === "stage1") {
      intensity = "moderate";
      if (dm || ckd || cad || stroke) {
        meds.push("Start pharmacotherapy + lifestyle");
        meds.push("ACEi/ARB monotherapy — titrate to target");
        if (cad || stroke) meds.push("ACEi/ARB + CCB or thiazide if needed");
        if (ckd) meds.push("Thiazide diuretic as second agent (loop if eGFR <30)");
      } else {
        meds.push("Lifestyle modification for 3–6 months first");
      }
    } else {
      meds.push("Lifestyle modification: DASH diet, sodium <2g/day, exercise 150 min/week");
      meds.push("Recheck in 3–6 months");
    }

    setHtnRx({
      visible: true,
      severity: intensity,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: categoryColors.hypertension.accent }}>Hypertension Prescription</span>
            <Badge className={intensity === "high" ? "bg-destructive/20 text-destructive" : intensity === "moderate" ? "bg-warning/20 text-warning" : "bg-success/20 text-success"}>
              {intensity === "high" ? "Intensive" : intensity === "moderate" ? "Moderate" : "Standard"}
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.hypertension.accent }}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Classification</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Presenting: {sbp}/{dbp} mmHg — {stage === "crisis" ? "HYPERTENSIVE CRISIS" : stage === "stage2" ? "Stage 2 HTN" : stage === "stage1" ? "Stage 1 HTN" : "Elevated BP"}</li>
                <li>Target: &lt;{targetSBP}/{targetDBP} mmHg</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.hypertension.accent }}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Medication Plan</p>
              <ul className="space-y-1">
                {meds.map((m, i) => <li key={i} className="text-sm text-foreground">→ {m}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ),
    });
  };

  const generateLipidRx = () => {
    const ldl = parseFloat(lipInputs.ldl) || 0;
    const hdl = parseFloat(lipInputs.hdl) || 0;
    const tg = parseFloat(lipInputs.tg) || 0;
    const lpa = parseFloat(lipInputs.lpa) || 0;
    const age = parseFloat(lipInputs.age) || 0;
    const { dm, smoker, htn, fhx, ascvd } = patientConditions;

    if (!ldl) {
      setLipRx({ visible: true, content: <p className="text-sm text-muted-foreground">Enter LDL-C to generate a prescription.</p>, severity: "low" });
      return;
    }

    let riskCat = "low";
    let ldlTarget = "<130";
    let intensity = "low";
    let statinChoice = "Consider moderate-intensity statin if risk factors present";
    const addMeds: string[] = [];
    const laiNotes: string[] = [];

    // LAI 2023 specific thresholds for Indian population
    const isLaiHighRisk = ldl >= 160 && ldl <= 189;
    const isLaiExtremeRisk = lpa >= 50 || ldl >= 190;

    if (ascvd || (dm && age > 40 && (htn || smoker))) {
      riskCat = "very-high";
      ldlTarget = "<55 mg/dL (<1.4 mmol/L)";
      intensity = "high";
      statinChoice = "High-intensity statin: atorvastatin 40–80 mg or rosuvastatin 20–40 mg";
      if (ldl >= 70) addMeds.push("If LDL ≥70 on max statin: add ezetimibe 10 mg");
      if (ldl >= 100) addMeds.push("If LDL ≥100 despite statin + ezetimibe: consider PCSK9i");
    } else if (dm || (smoker && htn) || (fhx && (smoker || htn)) || isLaiHighRisk) {
      riskCat = "high";
      ldlTarget = "<70 mg/dL (<1.8 mmol/L)";
      intensity = "high";
      statinChoice = "High-intensity statin: atorvastatin 20–40 mg or rosuvastatin 10–20 mg";
      if (ldl >= 100) addMeds.push("Consider adding ezetimibe 10 mg if sub-optimal response");
    } else if (age >= 40 && (htn || smoker)) {
      riskCat = "moderate";
      ldlTarget = "<100 mg/dL (<2.6 mmol/L)";
      intensity = "moderate";
      statinChoice = "Moderate-intensity statin: atorvastatin 10–20 mg or rosuvastatin 5–10 mg";
    } else {
      ldlTarget = "<130 mg/dL (<3.4 mmol/L)";
      if (ldl >= 190) {
        statinChoice = "LDL ≥190 — high-intensity statin + lifestyle";
        intensity = "high";
        riskCat = "high";
      }
    }

    // LAI 2023 specific notes
    if (lpa >= 50) {
      laiNotes.push("LAI: Lp(a) ≥50 mg/dL qualifies for Extreme Risk A — consider PCSK9i after statin + ezetimibe");
    }
    if (ldl >= 160 && ldl < 190) {
      laiNotes.push("LAI: LDL 160-189 mg/dL qualifies as high risk in Indian populations");
    }
    if (hdl < 40) {
      laiNotes.push("LAI: Low HDL (<40 mg/dL) common in South Asians — prioritize lifestyle + statin therapy");
    }

    if (tg >= 500) {
      addMeds.push("TG ≥500: Consider fibrate (fenofibrate 145 mg) or high-dose EPA icosapent ethyl (2 g BID)");
    } else if (tg >= 200 && ascvd) {
      addMeds.push("Moderate TG elevation + ASCVD: consider icosapent ethyl for CV risk reduction");
    }

    setLipRx({
      visible: true,
      severity: intensity,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: categoryColors.lipid.accent }}>Lipid Prescription</span>
            <div className="flex gap-1">
              <Badge className={intensity === "high" ? "bg-destructive/20 text-destructive" : intensity === "moderate" ? "bg-warning/20 text-warning" : "bg-success/20 text-success"}>
                {riskCat === "very-high" ? "Very High Risk" : riskCat.charAt(0).toUpperCase() + riskCat.slice(1)}
              </Badge>
              <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-500">LAI</Badge>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.lipid.accent }}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Risk & Targets (ACC/AHA + LAI 2023)</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>LDL-C target: {ldlTarget}</li>
                <li>Current LDL: {ldl} mg/dL</li>
                {hdl ? <li>HDL: {hdl} mg/dL {hdl < 40 ? "(low)" : ""}</li> : null}
                {tg ? <li>TG: {tg} mg/dL {tg >= 200 ? "(elevated)" : ""}</li> : null}
                {lpa ? <li>Lp(a): {lpa} mg/dL {lpa >= 50 ? "(LAI high risk)" : ""}</li> : null}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.lipid.accent }}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Medication Plan</p>
              <ul className="space-y-1">
                <li className="text-sm text-foreground">→ {statinChoice}</li>
                {addMeds.map((m, i) => <li key={i} className="text-sm text-foreground">→ {m}</li>)}
              </ul>
            </div>
            {laiNotes.length > 0 && (
              <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                <p className="text-xs font-medium text-orange-500 uppercase mb-2">LAI 2023 Indian Guidelines</p>
                <ul className="space-y-1">
                  {laiNotes.map((note, i) => <li key={i} className="text-sm text-foreground">→ {note}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      ),
    });
  };

  const generateObesityRx = () => {
    const bmi = parseFloat(obeInputs.bmi) || 0;
    const waist = parseFloat(obeInputs.waist) || 0;
    const { dm, htn, dyslipidemia, osa, nafld } = patientConditions;

    if (!bmi) {
      setObeRx({ visible: true, content: <p className="text-sm text-muted-foreground">Enter BMI to generate a prescription.</p>, severity: "low" });
      return;
    }

    let classLabel = "Normal";
    const therapy: string[] = [];
    let intensity = "low";
    let medRec = "";
    let surgicalThreshold = false;

    if (bmi >= 40) {
      classLabel = "Class III (Severe)";
      therapy.push("Intensive lifestyle + pharmacotherapy");
      surgicalThreshold = true;
      intensity = "high";
    } else if (bmi >= 35) {
      classLabel = "Class II";
      if (dm || htn || osa || nafld) {
        therapy.push("Intensive lifestyle + pharmacotherapy");
        surgicalThreshold = true;
        intensity = "high";
      } else {
        therapy.push("Lifestyle + consider pharmacotherapy");
        intensity = "moderate";
      }
    } else if (bmi >= 30) {
      classLabel = "Class I (Obese)";
      therapy.push("Lifestyle modification + consider pharmacotherapy");
      intensity = "moderate";
    } else if (bmi >= 25) {
      classLabel = "Overweight";
      if (dm || htn || dyslipidemia) {
        therapy.push("Lifestyle — weight loss indicated for metabolic complications");
        intensity = "moderate";
      } else {
        therapy.push("Preventive lifestyle — maintain weight");
        intensity = "low";
      }
    }

    const metabolicBurden = [dm, htn, dyslipidemia, osa, nafld].filter(Boolean).length;

    if (bmi >= 30 || (bmi >= 27 && metabolicBurden >= 1)) {
      if (dm) {
        medRec = "GLP-1 RA preferred: semaglutide 2.4 mg weekly (Wegovy) — or tirzepatide if available";
      } else {
        medRec = "GLP-1 RA: semaglutide 2.4 mg SC weekly, or liraglutide 3.0 mg SC daily";
      }
      if (osa) therapy.push("GLP-1 RA + refer for sleep study and CPAP if indicated");
      if (nafld) therapy.push("GLP-1 RA ± vitamin E 800 IU/day for NASH");
    }

    let surgRec = "";
    if (surgicalThreshold && metabolicBurden >= 1) {
      surgRec = "Strongly consider bariatric surgery evaluation — Roux-en-Y or sleeve gastrectomy";
    } else if (bmi >= 35 && surgicalThreshold) {
      surgRec = "Consider bariatric surgery if lifestyle + pharmacotherapy insufficient at 6 months";
    }

    setObeRx({
      visible: true,
      severity: intensity,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: categoryColors.obesity.accent }}>Obesity Prescription</span>
            <Badge className={intensity === "high" ? "bg-destructive/20 text-destructive" : intensity === "moderate" ? "bg-warning/20 text-warning" : "bg-success/20 text-success"}>
              {intensity === "high" ? "Active Management" : intensity === "moderate" ? "Moderate" : "Preventive"}
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.obesity.accent }}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Classification</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>BMI: {bmi} kg/m² — {classLabel}</li>
                {waist ? <li>Waist circumference: {waist} cm {waist > 102 ? "(↑ cardiometabolic risk)" : ""}</li> : null}
                <li>Metabolic complications: {metabolicBurden} of 5 present</li>
                <li>Target: 5–10% weight loss over 6 months</li>
              </ul>
            </div>
            {medRec && (
              <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.obesity.accent }}>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Pharmacotherapy</p>
                <p className="text-sm text-foreground">→ {medRec}</p>
              </div>
            )}
            {surgRec && (
              <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.obesity.accent }}>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Surgical Consideration</p>
                <p className="text-sm text-foreground">→ {surgRec}</p>
              </div>
            )}
          </div>
        </div>
      ),
    });
  };

  const generateComprehensive = () => {
    generateDiabetesRx();
    generateHtnRx();
    generateLipidRx();
    generateObesityRx();
    setCompRx({ visible: true, content: null });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 pt-10 flex justify-between items-start">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-xl border border-white/10">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-semibold tracking-tight">NCD <span className="text-muted-foreground font-light">Rx</span></h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Prescription Engine</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border">
          Evidence-based · Guideline-driven · v2.0
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        <h2 className="text-4xl font-serif font-semibold tracking-tight max-w-2xl leading-tight">
          Enter values. Get a <em className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent not-italic">prescription</em>.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
          Four non-communicable disease modules — diabetes, hypertension, lipid disorders, and obesity.
          Input the patient&apos;s labs and comorbidities, and the engine generates a guideline-based prescription in seconds.
        </p>
      </section>

      {/* Stats Bar */}
      <div className="max-w-6xl mx-auto px-6 pb-10 flex gap-8 flex-wrap">
        <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full" style={{ background: categoryColors.diabetes.accent }} /> Diabetes
        </span>
        <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full" style={{ background: categoryColors.hypertension.accent }} /> Hypertension
        </span>
        <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full" style={{ background: categoryColors.lipid.accent }} /> Lipid
        </span>
        <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full" style={{ background: categoryColors.obesity.accent }} /> Obesity
        </span>
        <span className="ml-auto text-sm text-muted-foreground/60">ADA · ESC · AHA · ACC</span>
      </div>

      <OCRUpload onValuesExtracted={(values) => {
        if (values.fg) setDmInputs(prev => ({ ...prev, fg: values.fg }));
        if (values.a1c) setDmInputs(prev => ({ ...prev, a1c: values.a1c }));
        if (values.age) {
          setDmInputs(prev => ({ ...prev, age: values.age }));
          setHtnInputs(prev => ({ ...prev, age: values.age }));
          setLipInputs(prev => ({ ...prev, age: values.age }));
        }
        if (values.creatinine) setDmInputs(prev => ({ ...prev, creatinine: values.creatinine }));
        if (values.ldl) setLipInputs(prev => ({ ...prev, ldl: values.ldl }));
        if (values.hdl) setLipInputs(prev => ({ ...prev, hdl: values.hdl }));
        if (values.tg) setLipInputs(prev => ({ ...prev, tg: values.tg }));
      }} />

      {/* Patient Conditions Summary */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <Card className="border-border/60">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Patient Conditions & Risk Factors</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // Clear all inputs
                setDmInputs({ fg: "", a1c: "", pp: "", egfr: "", weight: "", creatinine: "", age: "", currentGlucose: "", insulinStatus: "insulin-naive" });
                setHtnInputs({ sbp: "", dbp: "", age: "" });
                setLipInputs({ ldl: "", hdl: "", tg: "", age: "" });
                setObeInputs({ bmi: "", waist: "", weight: "", height: "" });
                // Clear all conditions
                setPatientConditions({
                  dm: false, htn: false, ckd: false, hf: false, cvd: false, obesity: false,
                  cad: false, stroke: false, smoker: false, fhx: false, ascvd: false,
                  dyslipidemia: false, osa: false, nafld: false,
                });
                // Clear all prescriptions
                setDmRx({ visible: false, content: null });
                setHtnRx({ visible: false, content: null });
                setLipRx({ visible: false, content: null });
                setObeRx({ visible: false, content: null });
                setCompRx({ visible: false, content: null });
              }}
              className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Diabetes - Associated Conditions */}
            <div className="space-y-2">
              <Label className="text-xs font-medium" style={{ color: categoryColors.diabetes.accent }}>Diabetes Complications</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "cvd", label: "CVD", abbr: "CVD" },
                  { key: "hf", label: "HF", abbr: "HF" },
                  { key: "ckd", label: "CKD", abbr: "CKD" },
                  { key: "obesity", label: "Obesity", abbr: null },
                ].map(({ key, label, abbr }) => (
                  <label key={`dm-${key}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-md border border-border/50 cursor-pointer hover:bg-muted/60 transition-colors">
                    <Checkbox checked={patientConditions[key as keyof typeof patientConditions]} onCheckedChange={() => toggleCondition(key as keyof typeof patientConditions)} className="h-3.5 w-3.5" />
                    {abbr ? <AbbreviationLabel abbr={abbr} /> : <span className="text-xs">{label}</span>}
                  </label>
                ))}
              </div>
            </div>

            {/* Hypertension - Associated Conditions */}
            <div className="space-y-2">
              <Label className="text-xs font-medium" style={{ color: categoryColors.hypertension.accent }}>Hypertension Comorbidities</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "dm", label: "DM", abbr: "DM" },
                  { key: "ckd", label: "CKD", abbr: "CKD" },
                  { key: "cad", label: "CAD", abbr: "CAD" },
                  { key: "stroke", label: "Prior Stroke", abbr: null },
                  { key: "hf", label: "HF", abbr: "HF" },
                ].map(({ key, label, abbr }) => (
                  <label key={`htn-${key}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-md border border-border/50 cursor-pointer hover:bg-muted/60 transition-colors">
                    <Checkbox checked={patientConditions[key as keyof typeof patientConditions]} onCheckedChange={() => toggleCondition(key as keyof typeof patientConditions)} className="h-3.5 w-3.5" />
                    {abbr ? <AbbreviationLabel abbr={abbr} /> : <span className="text-xs">{label}</span>}
                  </label>
                ))}
              </div>
            </div>

            {/* Lipid - Risk Factors */}
            <div className="space-y-2">
              <Label className="text-xs font-medium" style={{ color: categoryColors.lipid.accent }}>ASCVD Risk Factors</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "dm", label: "DM", abbr: "DM" },
                  { key: "smoker", label: "Smoker", abbr: null },
                  { key: "htn", label: "HTN", abbr: "HTN" },
                  { key: "fhx", label: "FHx", abbr: "FHx" },
                  { key: "ascvd", label: "ASCVD", abbr: "ASCVD" },
                ].map(({ key, label, abbr }) => (
                  <label key={`lip-${key}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-md border border-border/50 cursor-pointer hover:bg-muted/60 transition-colors">
                    <Checkbox checked={patientConditions[key as keyof typeof patientConditions]} onCheckedChange={() => toggleCondition(key as keyof typeof patientConditions)} className="h-3.5 w-3.5" />
                    {abbr ? <AbbreviationLabel abbr={abbr} /> : <span className="text-xs">{label}</span>}
                  </label>
                ))}
              </div>
            </div>

            {/* Obesity - Metabolic Complications */}
            <div className="space-y-2">
              <Label className="text-xs font-medium" style={{ color: categoryColors.obesity.accent }}>Metabolic Complications</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "dm", label: "DM", abbr: "DM" },
                  { key: "htn", label: "HTN", abbr: "HTN" },
                  { key: "dyslipidemia", label: "Dyslipidemia", abbr: null },
                  { key: "osa", label: "OSA", abbr: "OSA" },
                  { key: "nafld", label: "NAFLD", abbr: "NAFLD" },
                ].map(({ key, label, abbr }) => (
                  <label key={`obe-${key}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-md border border-border/50 cursor-pointer hover:bg-muted/60 transition-colors">
                    <Checkbox checked={patientConditions[key as keyof typeof patientConditions]} onCheckedChange={() => toggleCondition(key as keyof typeof patientConditions)} className="h-3.5 w-3.5" />
                    {abbr ? <AbbreviationLabel abbr={abbr} /> : <span className="text-xs">{label}</span>}
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Diabetes Card */}
        <Card className="relative overflow-hidden border-border/60 hover:border-border transition-colors group">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-500/30 opacity-60" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: categoryColors.diabetes.bg }}>
                <Syringe className="h-5 w-5" style={{ color: categoryColors.diabetes.accent }} />
              </div>
              <CardTitle className="text-base">Diabetes</CardTitle>
              <Badge variant="outline" className="ml-auto text-xs" style={{ color: categoryColors.diabetes.accent, borderColor: categoryColors.diabetes.border }}>Type 2</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Essential Labs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <AbbreviationLabel abbr="FG" />
                <Input type="number" placeholder="e.g. 140" value={dmInputs.fg} onChange={e => setDmInputs({ ...dmInputs, fg: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <AbbreviationLabel abbr="HbA1c" />
                <Input type="number" step="0.1" placeholder="e.g. 7.5" value={dmInputs.a1c} onChange={e => setDmInputs({ ...dmInputs, a1c: e.target.value })} className="h-9" />
              </div>
            </div>

            {/* Collapsible Advanced Section */}
            <Collapsible className="border border-border/40 rounded-lg overflow-hidden">
              <CollapsibleTrigger asChild>
                <button className="w-full px-3 py-2 flex items-center justify-between bg-muted/20 hover:bg-muted/30 transition-colors text-xs font-medium text-muted-foreground">
                  <span>Advanced Labs (PP, CrCl Calculator)</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 space-y-3 bg-muted/10">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <AbbreviationLabel abbr="PP" />
                    <Input type="number" placeholder="e.g. 200" value={dmInputs.pp} onChange={e => setDmInputs({ ...dmInputs, pp: e.target.value })} className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Age <span className="text-muted-foreground/60">years</span></Label>
                    <Input type="number" placeholder="e.g. 55" value={dmInputs.age} onChange={e => setDmInputs({ ...dmInputs, age: e.target.value })} className="h-9" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Creatinine Clearance (Cockcroft-Gault)</p>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground/70">Sex</Label>
                      <Select value={dmSex} onValueChange={(v: "male" | "female") => setDmSex(v)}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground/70">Age <span className="text-muted-foreground/50">yrs</span></Label>
                      <Input type="number" placeholder="55" value={dmInputs.age} onChange={e => setDmInputs({ ...dmInputs, age: e.target.value })} className="h-8 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground/70">Weight <span className="text-muted-foreground/50">kg</span></Label>
                      <Input type="number" placeholder="70" value={dmInputs.weight} onChange={e => setDmInputs({ ...dmInputs, weight: e.target.value })} className="h-8 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground/70">Creat <span className="text-muted-foreground/50">mg/dL</span></Label>
                      <Input type="number" step="0.01" placeholder="1.0" value={dmInputs.creatinine} onChange={e => {
                        const val = e.target.value;
                        setDmInputs(prev => {
                          const newInputs = { ...prev, creatinine: val };
                          const crea = parseFloat(val) || 0;
                          const age = parseFloat(prev.age) || 0;
                          const weight = parseFloat(prev.weight) || 0;
                          if (crea > 0 && age > 0 && weight > 0) {
                            newInputs.egfr = calculateCrCl(crea, age, weight, dmSex).toString();
                          }
                          return newInputs;
                        });
                      }} className="h-8 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <AbbreviationLabel abbr="CrCl" />
                      <Input type="number" placeholder="90" value={dmInputs.egfr} onChange={e => setDmInputs({ ...dmInputs, egfr: e.target.value })} className="h-8 text-xs bg-muted/50" />
                    </div>
                  </div>
                  {dmInputs.creatinine && dmInputs.age && dmInputs.weight && (
                    <p className="text-[10px] text-muted-foreground mt-1.5">C-G calculated: {calculateCrCl(parseFloat(dmInputs.creatinine) || 0, parseFloat(dmInputs.age) || 0, parseFloat(dmInputs.weight) || 0, dmSex)} mL/min</p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Insulin Dosing Guide */}
            <Collapsible className="border border-border/40 rounded-lg overflow-hidden">
              <CollapsibleTrigger asChild>
                <button className="w-full px-3 py-2 flex items-center justify-between bg-muted/20 hover:bg-muted/30 transition-colors text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Syringe className="h-3.5 w-3.5" />
                    Insulin Dosing Guide
                  </span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 space-y-4 bg-muted/10">
                {/* Insulin Types Quick Reference */}
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase mb-2">Common Insulin Types</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 rounded bg-background/50">
                      <p className="font-medium text-foreground">Rapid-Acting</p>
                      <p className="text-muted-foreground">Aspart (Novolog), Lispro (Humalog), Glulisine (Apidra)</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Onset: 15 min | Peak: 1-2h | Duration: 3-5h</p>
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <p className="font-medium text-foreground">Short-Acting</p>
                      <p className="text-muted-foreground">Regular (Humulin R, Novolin R)</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Onset: 30 min | Peak: 2-4h | Duration: 6-8h</p>
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <p className="font-medium text-foreground">Intermediate</p>
                      <p className="text-muted-foreground">NPH (Humulin N, Novolin N)</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Onset: 1-2h | Peak: 4-8h | Duration: 10-16h</p>
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <p className="font-medium text-foreground">Long-Acting</p>
                      <p className="text-muted-foreground">Glargine (Lantus, Basaglar), Detemir (Levemir)</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Onset: 1-2h | Peak: None | Duration: 20-24h</p>
                    </div>
                    <div className="p-2 rounded bg-background/50 col-span-2">
                      <p className="font-medium text-foreground">Ultra Long-Acting</p>
                      <p className="text-muted-foreground">Degludec (Tresiba), Glargine U300 (Toujeo)</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Onset: 30-90 min | Peak: None | Duration: 36-42h</p>
                    </div>
                  </div>
                </div>

                {/* Mealtime Insulin Calculator */}
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase mb-2">Mealtime Insulin (Bolus)</p>
                  <p className="text-[10px] text-muted-foreground mb-2">Total dose = Carb coverage + Correction dose</p>

                  <div className="space-y-2">
                    <div className="p-2 rounded bg-background/50">
                      <p className="text-[10px] font-medium text-foreground mb-1">1. Carb Coverage Dose</p>
                      <p className="text-[9px] text-muted-foreground">Grams of carbohydrate ÷ insulin-to-carb ratio</p>
                      <div className="mt-1 p-1.5 rounded bg-muted/50">
                        <p className="text-[9px] text-muted-foreground">Example: 60g carbs ÷ ratio 1:10 = <span className="font-medium text-foreground">6 units</span></p>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-background/50">
                      <p className="text-[10px] font-medium text-foreground mb-1">2. Correction Dose</p>
                      <p className="text-[9px] text-muted-foreground">(Current glucose - target) ÷ correction factor</p>
                      <div className="mt-1 p-1.5 rounded bg-muted/50">
                        <p className="text-[9px] text-muted-foreground">Example: (220 - 120) ÷ 50 = <span className="font-medium text-foreground">2 units</span></p>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-background/50 border border-red-500/20">
                      <p className="text-[10px] font-medium text-foreground">Total Meal Dose</p>
                      <p className="text-[9px] text-muted-foreground">6 units (carb) + 2 units (correction) = <span className="font-medium text-red-500">8 units</span></p>
                    </div>
                  </div>
                </div>

                {/* Total Daily Insulin Estimate */}
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase mb-2">Total Daily Insulin (TDI) Estimates</p>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight-based:</span>
                      <span className="font-medium text-foreground">0.55 units/kg/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Alternative:</span>
                      <span className="font-medium text-foreground">Weight (lb) ÷ 4</span>
                    </div>
                    <div className="mt-2 p-1.5 rounded bg-background/50">
                      <p className="text-[9px] text-muted-foreground">50% basal + 50% prandial (divided among meals)</p>
                    </div>
                  </div>
                </div>

                {/* Starting Doses */}
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase mb-2">Starting Doses</p>
                  <div className="space-y-2 text-[10px]">
                    <div className="p-2 rounded bg-background/50">
                      <p className="font-medium text-foreground mb-0.5">Basal Insulin</p>
                      <ul className="text-muted-foreground space-y-0.5">
                        <li>• Start: 10 units daily OR 0.1-0.2 units/kg/day</li>
                        <li>• Titrate: +2 units every 3 days until FBG 80-130 mg/dL</li>
                      </ul>
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <p className="font-medium text-foreground mb-0.5">Prandial Insulin</p>
                      <ul className="text-muted-foreground space-y-0.5">
                        <li>• Start: 5 units before largest meal</li>
                        <li>• Or: 10% of basal dose before largest meal</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Insulin-to-Carb Ratio */}
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase mb-1">Insulin-to-Carb Ratio (ICR)</p>
                  <p className="text-[10px] text-muted-foreground mb-1.5">500 ÷ TDI = grams of carb covered by 1 unit</p>
                  <div className="p-1.5 rounded bg-background/50">
                    <p className="text-[9px] text-muted-foreground">Example: 500 ÷ 50 units = <span className="font-medium text-foreground">1:10 ratio</span></p>
                  </div>
                </div>

                {/* Correction Factor */}
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase mb-1">Correction Factor (ISF)</p>
                  <p className="text-[10px] text-muted-foreground mb-1.5">1700 ÷ TDI = mg/dL drop per 1 unit</p>
                  <div className="p-1.5 rounded bg-background/50">
                    <p className="text-[9px] text-muted-foreground">Example: 1700 ÷ 50 units = <span className="font-medium text-foreground">1 unit drops glucose by 34 mg/dL</span></p>
                  </div>
                </div>

                {/* Sliding Scale Reference */}
                <div className="p-2 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <p className="text-[10px] font-medium text-amber-500 uppercase mb-1.5">Typical Sliding Scale (Humalog/Novolog)</p>
                  <div className="grid grid-cols-2 gap-1 text-[9px]">
                    <div className="flex justify-between p-1 rounded bg-background/50">
                      <span className="text-muted-foreground">150-199 mg/dL</span>
                      <span className="font-medium text-foreground">+2 units</span>
                    </div>
                    <div className="flex justify-between p-1 rounded bg-background/50">
                      <span className="text-muted-foreground">200-249 mg/dL</span>
                      <span className="font-medium text-foreground">+4 units</span>
                    </div>
                    <div className="flex justify-between p-1 rounded bg-background/50">
                      <span className="text-muted-foreground">250-299 mg/dL</span>
                      <span className="font-medium text-foreground">+6 units</span>
                    </div>
                    <div className="flex justify-between p-1 rounded bg-background/50">
                      <span className="text-muted-foreground">300-350 mg/dL</span>
                      <span className="font-medium text-foreground">+8 units</span>
                    </div>
                    <div className="flex justify-between p-1 rounded bg-background/50 col-span-2">
                      <span className="text-muted-foreground">&gt;350 mg/dL</span>
                      <span className="font-medium text-foreground">+10 units + check ketones</span>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Insulin Infusion Calculator */}
            <Collapsible className="border border-border/40 rounded-lg overflow-hidden">
              <CollapsibleTrigger asChild>
                <button className="w-full px-3 py-2 flex items-center justify-between bg-red-500/10 hover:bg-red-500/15 transition-colors text-xs font-medium text-red-500">
                  <span className="flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5" />
                    IV Insulin Infusion Calculator (DKA/HHS)
                  </span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 space-y-4 bg-muted/10">
                {/* Warning Banner */}
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-[10px] text-red-500 font-medium">
                    Critical Care Setting Only — Requires continuous monitoring. Check glucose hourly (or q2h when stable).
                  </p>
                </div>

                {/* Input Section */}
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase mb-2">Patient Parameters</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground/70">Weight (kg)</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 70"
                        value={dmInputs.weight}
                        onChange={e => setDmInputs({ ...dmInputs, weight: e.target.value })}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-medium text-muted-foreground/70">Current Glucose (mg/dL)</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 450"
                        value={dmInputs.currentGlucose || ""}
                        onChange={e => setDmInputs({ ...dmInputs, currentGlucose: e.target.value })}
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <Label className="text-[10px] font-medium text-muted-foreground/70">Insulin Status</Label>
                    <Select
                      value={dmInputs.insulinStatus || "insulin-naive"}
                      onValueChange={(v) => setDmInputs({ ...dmInputs, insulinStatus: v })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="insulin-naive">Insulin-naive / Type 1 DKA</SelectItem>
                        <SelectItem value="on-basal">Already on basal insulin (T2DM/HHS)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Calculated Results */}
                {dmInputs.weight && (
                  <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/20">
                    <p className="text-[10px] font-medium text-red-500 uppercase mb-2">Calculated Infusion</p>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-background/50">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-muted-foreground">Initial Bolus (IV)</span>
                          <span className="text-sm font-bold text-red-500">
                            {Math.round((parseFloat(dmInputs.weight) || 0) * 0.1)} units
                          </span>
                        </div>
                        <p className="text-[9px] text-muted-foreground mt-0.5">0.1 units/kg (max 10 units)</p>
                      </div>

                      <div className="p-2 rounded bg-background/50 border border-red-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-muted-foreground">Infusion Rate</span>
                          <span className="text-sm font-bold text-red-500">
                            {(() => {
                              const weight = parseFloat(dmInputs.weight) || 0;
                              const status = dmInputs.insulinStatus || "insulin-naive";
                              if (weight === 0) return "0.00";
                              const multiplier = status === "insulin-naive" ? 0.1 : 0.05;
                              return (weight * multiplier).toFixed(2);
                            })()} units/hour
                          </span>
                        </div>
                        <p className="text-[9px] text-muted-foreground mt-0.5">
                          {(dmInputs.insulinStatus || "insulin-naive") === "insulin-naive"
                            ? "0.1 units/kg/hr (DKA/insulin-naive)"
                            : "0.05-0.1 units/kg/hr (on basal insulin)"}
                        </p>
                      </div>

                      <div className="p-2 rounded bg-background/50">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-muted-foreground">Daily Requirement</span>
                          <span className="text-sm font-medium text-foreground">
                            {(() => {
                              const weight = parseFloat(dmInputs.weight) || 0;
                              const status = dmInputs.insulinStatus || "insulin-naive";
                              if (weight === 0) return "0";
                              const hourly = status === "insulin-naive" ? weight * 0.1 : weight * 0.05;
                              return Math.round(hourly * 24);
                            })()} units/day
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Protocol Reference */}
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase mb-2">DKA/HHS Protocol Summary</p>
                  <div className="space-y-2 text-[10px]">
                    <div className="p-2 rounded bg-background/50">
                      <p className="font-medium text-foreground mb-1">Phase 1: Initial Resuscitation</p>
                      <ul className="text-muted-foreground space-y-0.5 list-disc pl-3">
                        <li>Fluid: 1L NS over 1 hour (or 15-20 mL/kg)</li>
                        <li>Insulin: Hold until glucose &lt;200 mg/dL AND anion gap closed</li>
                        <li>Start insulin if K+ &gt;3.3 mEq/L</li>
                      </ul>
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <p className="font-medium text-foreground mb-1">Phase 2: Insulin Infusion</p>
                      <ul className="text-muted-foreground space-y-0.5 list-disc pl-3">
                        <li>Bolus: 0.1 units/kg IV (optional per protocol)</li>
                        <li>Continuous: 0.1 units/kg/hr (DKA) or 0.05-0.1 (HHS)</li>
                        <li>Target glucose fall: 50-70 mg/dL/hour</li>
                      </ul>
                    </div>
                    <div className="p-2 rounded bg-background/50">
                      <p className="font-medium text-foreground mb-1">Phase 3: Glucose Transition</p>
                      <ul className="text-muted-foreground space-y-0.5 list-disc pl-3">
                        <li>When glucose &lt;200 mg/dL: Add dextrose (D5W or D10W)</li>
                        <li>Continue insulin until gap closed for DKA</li>
                        <li>Transition to SC insulin when eating</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Hourly Monitoring */}
                <div className="p-2 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <p className="text-[10px] font-medium text-amber-500 uppercase mb-1.5">Hourly Monitoring Checklist</p>
                  <div className="grid grid-cols-2 gap-1 text-[9px]">
                    <div className="flex items-center gap-1 p-1 rounded bg-background/50">
                      <span className="text-muted-foreground">Glucose (q1h)</span>
                    </div>
                    <div className="flex items-center gap-1 p-1 rounded bg-background/50">
                      <span className="text-muted-foreground">K+ (q2-4h)</span>
                    </div>
                    <div className="flex items-center gap-1 p-1 rounded bg-background/50">
                      <span className="text-muted-foreground">Anion gap</span>
                    </div>
                    <div className="flex items-center gap-1 p-1 rounded bg-background/50">
                      <span className="text-muted-foreground">Fluid balance</span>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex gap-2 pt-1">
              <Button onClick={generateDiabetesRx} className="flex-1 text-xs h-9" style={{ background: `linear-gradient(135deg, ${categoryColors.diabetes.bg}, rgba(248,113,113,0.08))`, borderColor: categoryColors.diabetes.border }} variant="outline">
                Generate Rx <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button variant="outline" onClick={() => { setDmInputs({ fg: "", a1c: "", pp: "", egfr: "", weight: "", creatinine: "", age: "", currentGlucose: "", insulinStatus: "insulin-naive" }); setPatientConditions(prev => ({ ...prev, cvd: false, hf: false, ckd: false, obesity: false })); setDmRx({ visible: false, content: null }); }} className="text-xs h-9">Clear</Button>
            </div>
            {dmRx.visible && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50 animate-in fade-in slide-in-from-top-2">
                {dmRx.content}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hypertension Card */}
        <Card className="relative overflow-hidden border-border/60 hover:border-border transition-colors">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-500/30 opacity-60" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: categoryColors.hypertension.bg }}>
                <Heart className="h-5 w-5" style={{ color: categoryColors.hypertension.accent }} />
              </div>
              <CardTitle className="text-base">Hypertension</CardTitle>
              <Badge variant="outline" className="ml-auto text-xs" style={{ color: categoryColors.hypertension.accent, borderColor: categoryColors.hypertension.border }}>ESC 2024</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Essential Vitals */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <AbbreviationLabel abbr="SBP" />
                <Input type="number" placeholder="e.g. 150" value={htnInputs.sbp} onChange={e => setHtnInputs({ ...htnInputs, sbp: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <AbbreviationLabel abbr="DBP" />
                <Input type="number" placeholder="e.g. 95" value={htnInputs.dbp} onChange={e => setHtnInputs({ ...htnInputs, dbp: e.target.value })} className="h-9" />
              </div>
            </div>

            {/* Collapsible Target/Advanced */}
            <Collapsible className="border border-border/40 rounded-lg overflow-hidden">
              <CollapsibleTrigger asChild>
                <button className="w-full px-3 py-2 flex items-center justify-between bg-muted/20 hover:bg-muted/30 transition-colors text-xs font-medium text-muted-foreground">
                  <span>Target BP & Additional Info</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 space-y-3 bg-muted/10">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Age <span className="text-muted-foreground/60">years</span></Label>
                    <Input type="number" placeholder="e.g. 62" value={htnInputs.age} onChange={e => setHtnInputs({ ...htnInputs, age: e.target.value })} className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <AbbreviationLabel abbr="BP" fullForm="Target Blood Pressure" />
                    <Select value={htnTarget} onValueChange={setHtnTarget}>
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">&lt;140/90 (Standard)</SelectItem>
                        <SelectItem value="intensive">&lt;130/80 (Intensive)</SelectItem>
                        <SelectItem value="elderly">&lt;150/90 (Elderly &gt;80)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex gap-2 pt-1">
              <Button onClick={generateHtnRx} className="flex-1 text-xs h-9" style={{ background: `linear-gradient(135deg, ${categoryColors.hypertension.bg}, rgba(251,146,60,0.08))`, borderColor: categoryColors.hypertension.border }} variant="outline">
                Generate Rx <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button variant="outline" onClick={() => { setHtnInputs({ sbp: "", dbp: "", age: "" }); setPatientConditions(prev => ({ ...prev, dm: false, ckd: false, cad: false, stroke: false, hf: false })); setHtnRx({ visible: false, content: null }); }} className="text-xs h-9">Clear</Button>
            </div>
            {htnRx.visible && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50 animate-in fade-in slide-in-from-top-2">
                {htnRx.content}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lipid Card */}
        <Card className="relative overflow-hidden border-border/60 hover:border-border transition-colors">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-500/30 opacity-60" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: categoryColors.lipid.bg }}>
                <Dna className="h-5 w-5" style={{ color: categoryColors.lipid.accent }} />
              </div>
              <CardTitle className="text-base">Lipid Treatment</CardTitle>
              <div className="ml-auto flex gap-1">
                <Badge variant="outline" className="text-[10px]" style={{ color: categoryColors.lipid.accent, borderColor: categoryColors.lipid.border }}>ACC/AHA</Badge>
                <Badge variant="outline" className="text-[10px]" style={{ color: "#f97316", borderColor: "rgba(249,115,22,0.3)" }}>LAI</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* LAI Guidelines Notice */}
            <div className="p-2.5 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <p className="text-[10px] text-muted-foreground">
                <span className="font-medium text-orange-500">LAI 2023:</span> Indian-specific cutoffs — LDL ≥160 mg/dL for high risk, Lp(a) ≥50 mg/dL for extreme risk. BMI ≥23 overweight, ≥25 obesity.
              </p>
            </div>

            {/* Essential Labs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <AbbreviationLabel abbr="LDL" />
                <Input type="number" placeholder="e.g. 130" value={lipInputs.ldl} onChange={e => setLipInputs({ ...lipInputs, ldl: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <AbbreviationLabel abbr="HDL" />
                <Input type="number" placeholder="e.g. 45" value={lipInputs.hdl} onChange={e => setLipInputs({ ...lipInputs, hdl: e.target.value })} className="h-9" />
              </div>
            </div>

            {/* Collapsible Additional Labs */}
            <Collapsible className="border border-border/40 rounded-lg overflow-hidden">
              <CollapsibleTrigger asChild>
                <button className="w-full px-3 py-2 flex items-center justify-between bg-muted/20 hover:bg-muted/30 transition-colors text-xs font-medium text-muted-foreground">
                  <span>Additional Labs (TG, Age, Lp(a))</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 space-y-3 bg-muted/10">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <AbbreviationLabel abbr="TG" fullForm="Triglycerides" />
                    <Input type="number" placeholder="e.g. 180" value={lipInputs.tg} onChange={e => setLipInputs({ ...lipInputs, tg: e.target.value })} className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Age <span className="text-muted-foreground/60">years</span></Label>
                    <Input type="number" placeholder="e.g. 55" value={lipInputs.age} onChange={e => setLipInputs({ ...lipInputs, age: e.target.value })} className="h-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Lp(a) <span className="text-muted-foreground/60">mg/dL (LAI: ≥50 = Extreme Risk)</span></Label>
                  <Input type="number" placeholder="e.g. 25" value={lipInputs.lpa || ""} onChange={e => setLipInputs({ ...lipInputs, lpa: e.target.value })} className="h-9" />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Link to Full Calculator */}
            <div className="flex items-center justify-between pt-1">
              <Button onClick={generateLipidRx} className="flex-1 text-xs h-9 mr-2" style={{ background: `linear-gradient(135deg, ${categoryColors.lipid.bg}, rgba(96,165,250,0.08))`, borderColor: categoryColors.lipid.border }} variant="outline">
                Generate Rx <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/lipid-panel")} className="text-[10px] h-9 px-2">
                Full LAI Calc
              </Button>
              <Button variant="outline" onClick={() => { setLipInputs({ ldl: "", hdl: "", tg: "", age: "", lpa: "" }); setPatientConditions(prev => ({ ...prev, dm: false, smoker: false, htn: false, fhx: false, ascvd: false })); setLipRx({ visible: false, content: null }); }} className="text-xs h-9 ml-2">Clear</Button>
            </div>
            {lipRx.visible && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50 animate-in fade-in slide-in-from-top-2">
                {lipRx.content}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Obesity Card */}
        <Card className="relative overflow-hidden border-border/60 hover:border-border transition-colors">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-violet-500/30 opacity-60" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: categoryColors.obesity.bg }}>
                <Scale className="h-5 w-5" style={{ color: categoryColors.obesity.accent }} />
              </div>
              <CardTitle className="text-base">Obesity</CardTitle>
              <Badge variant="outline" className="ml-auto text-xs" style={{ color: categoryColors.obesity.accent, borderColor: categoryColors.obesity.border }}>AACE/TOS</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">BMI Calculator</p>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] font-medium text-muted-foreground/70">Weight</Label>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setObeUnits(u => ({ ...u, weight: "kg" }))}
                        className={`text-[9px] px-1.5 py-0.5 rounded ${obeUnits.weight === "kg" ? "bg-primary/20 text-primary" : "text-muted-foreground/60"}`}
                      >kg</button>
                      <button
                        onClick={() => setObeUnits(u => ({ ...u, weight: "lb" }))}
                        className={`text-[9px] px-1.5 py-0.5 rounded ${obeUnits.weight === "lb" ? "bg-primary/20 text-primary" : "text-muted-foreground/60"}`}
                      >lb</button>
                    </div>
                  </div>
                  <Input type="number" placeholder={obeUnits.weight === "kg" ? "70" : "154"} value={obeInputs.weight} onChange={e => {
                    const val = e.target.value;
                    setObeInputs(prev => {
                      const newInputs = { ...prev, weight: val };
                      const w = parseFloat(val) || 0;
                      const h = parseFloat(prev.height) || 0;
                      if (w > 0 && h > 0) {
                        newInputs.bmi = calculateBMI(w, h, obeUnits.weight, obeUnits.height).toString();
                      }
                      return newInputs;
                    });
                  }} className="h-8 text-xs" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] font-medium text-muted-foreground/70">Height</Label>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setObeUnits(u => ({ ...u, height: "cm" }))}
                        className={`text-[9px] px-1.5 py-0.5 rounded ${obeUnits.height === "cm" ? "bg-primary/20 text-primary" : "text-muted-foreground/60"}`}
                      >cm</button>
                      <button
                        onClick={() => setObeUnits(u => ({ ...u, height: "ft" }))}
                        className={`text-[9px] px-1.5 py-0.5 rounded ${obeUnits.height === "ft" ? "bg-primary/20 text-primary" : "text-muted-foreground/60"}`}
                      >ft</button>
                    </div>
                  </div>
                  <Input type="number" step={obeUnits.height === "ft" ? "0.01" : "1"} placeholder={obeUnits.height === "cm" ? "170" : "5.58"} value={obeInputs.height} onChange={e => {
                    const val = e.target.value;
                    setObeInputs(prev => {
                      const newInputs = { ...prev, height: val };
                      const h = parseFloat(val) || 0;
                      const w = parseFloat(prev.weight) || 0;
                      if (w > 0 && h > 0) {
                        newInputs.bmi = calculateBMI(w, h, obeUnits.weight, obeUnits.height).toString();
                      }
                      return newInputs;
                    });
                  }} className="h-8 text-xs" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-border/30">
                <AbbreviationLabel abbr="BMI" />
                <Input type="number" step="0.1" placeholder="e.g. 32" value={obeInputs.bmi} onChange={e => setObeInputs({ ...obeInputs, bmi: e.target.value })} className="h-8 text-xs w-24 bg-muted/50" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Waist Circumference <span className="text-muted-foreground/60">cm</span></Label>
              <Input type="number" placeholder="e.g. 102" value={obeInputs.waist} onChange={e => setObeInputs({ ...obeInputs, waist: e.target.value })} className="h-9" />
            </div>
            <div className="flex gap-2 pt-1">
              <Button onClick={generateObesityRx} className="flex-1 text-xs h-9" style={{ background: `linear-gradient(135deg, ${categoryColors.obesity.bg}, rgba(167,139,250,0.08))`, borderColor: categoryColors.obesity.border }} variant="outline">
                Generate Rx <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button variant="outline" onClick={() => { setObeInputs({ bmi: "", waist: "", weight: "", height: "" }); setPatientConditions(prev => ({ ...prev, dm: false, htn: false, dyslipidemia: false, osa: false, nafld: false })); setObeRx({ visible: false, content: null }); setObeUnits({ weight: "kg", height: "cm" }); }} className="text-xs h-9">Clear</Button>
            </div>
            {obeRx.visible && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50 animate-in fade-in slide-in-from-top-2">
                {obeRx.content}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Comprehensive Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <Card className="p-8">
          <h3 className="text-xl font-serif font-semibold mb-1">Comprehensive NCD Prescription</h3>
          <p className="text-sm text-muted-foreground mb-6">Generate all four modules at once for a complete, integrated prescription.</p>
          <Button onClick={generateComprehensive} className="h-11 px-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-purple-500/25">
            Generate Complete Prescription <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
          {compRx.visible && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4">
              {dmRx.visible && (
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <h4 className="text-sm font-semibold mb-3" style={{ color: categoryColors.diabetes.accent }}>Diabetes</h4>
                  {dmRx.content}
                </div>
              )}
              {htnRx.visible && (
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <h4 className="text-sm font-semibold mb-3" style={{ color: categoryColors.hypertension.accent }}>Hypertension</h4>
                  {htnRx.content}
                </div>
              )}
              {lipRx.visible && (
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <h4 className="text-sm font-semibold mb-3" style={{ color: categoryColors.lipid.accent }}>Lipid</h4>
                  {lipRx.content}
                </div>
              )}
              {obeRx.visible && (
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <h4 className="text-sm font-semibold mb-3" style={{ color: categoryColors.obesity.accent }}>Obesity</h4>
                  {obeRx.content}
                </div>
              )}
            </div>
          )}
        </Card>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-6 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <span>NCD Rx Prescription Engine — for clinical decision support</span>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-foreground transition-colors">Guidelines</Link>
          <Link to="/" className="hover:text-foreground transition-colors">Evidence</Link>
        </div>
      </footer>
    </div>
  );
}