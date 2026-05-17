import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, Droplets, Heart, Scale, Syringe, Activity as PulseIcon, Dna, FileText, ChevronRight } from "lucide-react";
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

export default function Home() {
  // Diabetes state
  const [dmInputs, setDmInputs] = useState({ fg: "", a1c: "", pp: "", egfr: "90" });
  const [dmChecks, setDmChecks] = useState({ cvd: false, hf: false, ckd: false, obesity: false });
  const [dmRx, setDmRx] = useState<PrescriptionState>({ visible: false, content: null });

  // HTN state
  const [htnInputs, setHtnInputs] = useState({ sbp: "", dbp: "", age: "" });
  const [htnTarget, setHtnTarget] = useState("intensive");
  const [htnChecks, setHtnChecks] = useState({ dm: false, ckd: false, cad: false, stroke: false, hf: false });
  const [htnRx, setHtnRx] = useState<PrescriptionState>({ visible: false, content: null });

  // Lipid state
  const [lipInputs, setLipInputs] = useState({ ldl: "", hdl: "", tg: "", age: "" });
  const [lipChecks, setLipChecks] = useState({ dm: false, smoker: false, htn: false, fhx: false, ascvd: false });
  const [lipRx, setLipRx] = useState<PrescriptionState>({ visible: false, content: null });

  // Obesity state
  const [obeInputs, setObeInputs] = useState({ bmi: "", waist: "" });
  const [obeChecks, setObeChecks] = useState({ dm: false, htn: false, dyslipidemia: false, osa: false, nafld: false });
  const [obeRx, setObeRx] = useState<PrescriptionState>({ visible: false, content: null });

  // Comprehensive
  const [compRx, setCompRx] = useState<PrescriptionState>({ visible: false, content: null });

  const generateDiabetesRx = () => {
    const fg = parseFloat(dmInputs.fg) || 0;
    const a1c = parseFloat(dmInputs.a1c) || 0;
    const egfr = parseFloat(dmInputs.egfr) || 90;
    const { cvd, hf, ckd, obesity } = dmChecks;

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
    const { dm, ckd, cad, stroke, hf } = htnChecks;

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
    const age = parseFloat(lipInputs.age) || 0;
    const { dm, smoker, htn, fhx, ascvd } = lipChecks;

    if (!ldl) {
      setLipRx({ visible: true, content: <p className="text-sm text-muted-foreground">Enter LDL-C to generate a prescription.</p>, severity: "low" });
      return;
    }

    let riskCat = "low";
    let ldlTarget = "<130";
    let intensity = "low";
    let statinChoice = "Consider moderate-intensity statin if risk factors present";
    const addMeds: string[] = [];

    if (ascvd || (dm && age > 40 && (htn || smoker))) {
      riskCat = "very-high";
      ldlTarget = "<55 mg/dL (<1.4 mmol/L)";
      intensity = "high";
      statinChoice = "High-intensity statin: atorvastatin 40–80 mg or rosuvastatin 20–40 mg";
      if (ldl >= 70) addMeds.push("If LDL ≥70 on max statin: add ezetimibe 10 mg");
      if (ldl >= 100) addMeds.push("If LDL ≥100 despite statin + ezetimibe: consider PCSK9i");
    } else if (dm || (smoker && htn) || (fhx && (smoker || htn))) {
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
            <Badge className={intensity === "high" ? "bg-destructive/20 text-destructive" : intensity === "moderate" ? "bg-warning/20 text-warning" : "bg-success/20 text-success"}>
              {riskCat === "very-high" ? "Very High Risk" : riskCat.charAt(0).toUpperCase() + riskCat.slice(1)}
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.lipid.accent }}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Risk & Targets</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>LDL-C target: {ldlTarget}</li>
                <li>Current LDL: {ldl} mg/dL</li>
                {hdl ? <li>HDL: {hdl} mg/dL {hdl < 40 ? "(low)" : ""}</li> : null}
                {tg ? <li>TG: {tg} mg/dL {tg >= 200 ? "(elevated)" : ""}</li> : null}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border-l-2" style={{ borderLeftColor: categoryColors.lipid.accent }}>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Medication Plan</p>
              <ul className="space-y-1">
                <li className="text-sm text-foreground">→ {statinChoice}</li>
                {addMeds.map((m, i) => <li key={i} className="text-sm text-foreground">→ {m}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ),
    });
  };

  const generateObesityRx = () => {
    const bmi = parseFloat(obeInputs.bmi) || 0;
    const waist = parseFloat(obeInputs.waist) || 0;
    const { dm, htn, dyslipidemia, osa, nafld } = obeChecks;

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
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">Fasting Glucose <span className="text-muted-foreground/60">mg/dL</span></Label>
                <Input type="number" placeholder="e.g. 140" value={dmInputs.fg} onChange={e => setDmInputs({ ...dmInputs, fg: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">HbA1c <span className="text-muted-foreground/60">%</span></Label>
                <Input type="number" step="0.1" placeholder="e.g. 7.5" value={dmInputs.a1c} onChange={e => setDmInputs({ ...dmInputs, a1c: e.target.value })} className="h-9" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">Post-prandial <span className="text-muted-foreground/60">mg/dL</span></Label>
                <Input type="number" placeholder="e.g. 200" value={dmInputs.pp} onChange={e => setDmInputs({ ...dmInputs, pp: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">eGFR <span className="text-muted-foreground/60">mL/min</span></Label>
                <Input type="number" placeholder="e.g. 90" value={dmInputs.egfr} onChange={e => setDmInputs({ ...dmInputs, egfr: e.target.value })} className="h-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">Comorbidities</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "cvd", label: "CVD" },
                  { key: "hf", label: "Heart Failure" },
                  { key: "ckd", label: "CKD" },
                  { key: "obesity", label: "Obesity" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-md border border-border/50 cursor-pointer hover:bg-muted/60 transition-colors">
                    <Checkbox checked={dmChecks[key as keyof typeof dmChecks]} onCheckedChange={checked => setDmChecks({ ...dmChecks, [key]: checked as boolean })} className="h-3.5 w-3.5" />
                    <span className="text-xs">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button onClick={generateDiabetesRx} className="flex-1 text-xs h-9" style={{ background: `linear-gradient(135deg, ${categoryColors.diabetes.bg}, rgba(248,113,113,0.08))`, borderColor: categoryColors.diabetes.border }} variant="outline">
                Generate Rx <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button variant="outline" onClick={() => { setDmInputs({ fg: "", a1c: "", pp: "", egfr: "90" }); setDmChecks({ cvd: false, hf: false, ckd: false, obesity: false }); setDmRx({ visible: false, content: null }); }} className="text-xs h-9">Clear</Button>
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
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">SBP <span className="text-muted-foreground/60">mmHg</span></Label>
                <Input type="number" placeholder="e.g. 150" value={htnInputs.sbp} onChange={e => setHtnInputs({ ...htnInputs, sbp: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">DBP <span className="text-muted-foreground/60">mmHg</span></Label>
                <Input type="number" placeholder="e.g. 95" value={htnInputs.dbp} onChange={e => setHtnInputs({ ...htnInputs, dbp: e.target.value })} className="h-9" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">Age <span className="text-muted-foreground/60">years</span></Label>
                <Input type="number" placeholder="e.g. 62" value={htnInputs.age} onChange={e => setHtnInputs({ ...htnInputs, age: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">Target BP</Label>
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
            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">Comorbidities</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "dm", label: "Diabetes" },
                  { key: "ckd", label: "CKD" },
                  { key: "cad", label: "CAD" },
                  { key: "stroke", label: "Prior Stroke" },
                  { key: "hf", label: "Heart Failure" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-md border border-border/50 cursor-pointer hover:bg-muted/60 transition-colors">
                    <Checkbox checked={htnChecks[key as keyof typeof htnChecks]} onCheckedChange={checked => setHtnChecks({ ...htnChecks, [key]: checked as boolean })} className="h-3.5 w-3.5" />
                    <span className="text-xs">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button onClick={generateHtnRx} className="flex-1 text-xs h-9" style={{ background: `linear-gradient(135deg, ${categoryColors.hypertension.bg}, rgba(251,146,60,0.08))`, borderColor: categoryColors.hypertension.border }} variant="outline">
                Generate Rx <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button variant="outline" onClick={() => { setHtnInputs({ sbp: "", dbp: "", age: "" }); setHtnChecks({ dm: false, ckd: false, cad: false, stroke: false, hf: false }); setHtnRx({ visible: false, content: null }); }} className="text-xs h-9">Clear</Button>
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
              <Badge variant="outline" className="ml-auto text-xs" style={{ color: categoryColors.lipid.accent, borderColor: categoryColors.lipid.border }}>ACC/AHA</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">LDL <span className="text-muted-foreground/60">mg/dL</span></Label>
                <Input type="number" placeholder="e.g. 130" value={lipInputs.ldl} onChange={e => setLipInputs({ ...lipInputs, ldl: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">HDL <span className="text-muted-foreground/60">mg/dL</span></Label>
                <Input type="number" placeholder="e.g. 45" value={lipInputs.hdl} onChange={e => setLipInputs({ ...lipInputs, hdl: e.target.value })} className="h-9" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">Triglycerides <span className="text-muted-foreground/60">mg/dL</span></Label>
                <Input type="number" placeholder="e.g. 180" value={lipInputs.tg} onChange={e => setLipInputs({ ...lipInputs, tg: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">Age <span className="text-muted-foreground/60">years</span></Label>
                <Input type="number" placeholder="e.g. 55" value={lipInputs.age} onChange={e => setLipInputs({ ...lipInputs, age: e.target.value })} className="h-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">Risk Factors</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "dm", label: "Diabetes" },
                  { key: "smoker", label: "Smoker" },
                  { key: "htn", label: "Hypertension" },
                  { key: "fhx", label: "Family History" },
                  { key: "ascvd", label: "ASCVD" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-md border border-border/50 cursor-pointer hover:bg-muted/60 transition-colors">
                    <Checkbox checked={lipChecks[key as keyof typeof lipChecks]} onCheckedChange={checked => setLipChecks({ ...lipChecks, [key]: checked as boolean })} className="h-3.5 w-3.5" />
                    <span className="text-xs">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button onClick={generateLipidRx} className="flex-1 text-xs h-9" style={{ background: `linear-gradient(135deg, ${categoryColors.lipid.bg}, rgba(96,165,250,0.08))`, borderColor: categoryColors.lipid.border }} variant="outline">
                Generate Rx <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button variant="outline" onClick={() => { setLipInputs({ ldl: "", hdl: "", tg: "", age: "" }); setLipChecks({ dm: false, smoker: false, htn: false, fhx: false, ascvd: false }); setLipRx({ visible: false, content: null }); }} className="text-xs h-9">Clear</Button>
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
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">BMI <span className="text-muted-foreground/60">kg/m²</span></Label>
                <Input type="number" step="0.1" placeholder="e.g. 32" value={obeInputs.bmi} onChange={e => setObeInputs({ ...obeInputs, bmi: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground">Waist <span className="text-muted-foreground/60">cm</span></Label>
                <Input type="number" placeholder="e.g. 102" value={obeInputs.waist} onChange={e => setObeInputs({ ...obeInputs, waist: e.target.value })} className="h-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">Metabolic Complications</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "dm", label: "Type 2 Diabetes" },
                  { key: "htn", label: "Hypertension" },
                  { key: "dyslipidemia", label: "Dyslipidemia" },
                  { key: "osa", label: "OSA" },
                  { key: "nafld", label: "NAFLD/MASLD" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-md border border-border/50 cursor-pointer hover:bg-muted/60 transition-colors">
                    <Checkbox checked={obeChecks[key as keyof typeof obeChecks]} onCheckedChange={checked => setObeChecks({ ...obeChecks, [key]: checked as boolean })} className="h-3.5 w-3.5" />
                    <span className="text-xs">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button onClick={generateObesityRx} className="flex-1 text-xs h-9" style={{ background: `linear-gradient(135deg, ${categoryColors.obesity.bg}, rgba(167,139,250,0.08))`, borderColor: categoryColors.obesity.border }} variant="outline">
                Generate Rx <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button variant="outline" onClick={() => { setObeInputs({ bmi: "", waist: "" }); setObeChecks({ dm: false, htn: false, dyslipidemia: false, osa: false, nafld: false }); setObeRx({ visible: false, content: null }); }} className="text-xs h-9">Clear</Button>
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
