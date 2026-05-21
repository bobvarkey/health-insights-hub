import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TabNavigation } from "@/components/TabNavigation";
import Home from "@/pages/Home";
import Diabetes from "@/pages/Diabetes";
import Hypertension from "@/pages/Hypertension";
import Lipids from "@/pages/Lipids";
import InsulinTitration from "@/calculators/diabetes/InsulinTitration";
import HypoRiskCalculator from "@/calculators/diabetes/HypoRisk";
import RenalDoseAdjustment from "@/calculators/diabetes/RenalDosing";
import SlidingScaleInsulin from "@/calculators/diabetes/SlidingScale";
import DiabetesMedicationAlgorithm from "@/calculators/diabetes/DiabetesMedicationAlgorithm";
import AscvdEmr from "@/calculators/lipids/AscvdRisk";
import LipidCalculator from "@/calculators/lipids/LipidPanel";
import GfrCalculator from "@/calculators/htn/GfrCalculator";
import DrugInteractionChecker from "@/calculators/htn/DrugInteractions";
import AntihypertensiveTreatmentAlgorithm from "@/calculators/htn/AntihypertensiveTreatmentAlgorithm";
import AntihypertensivePotencyTable from "@/calculators/htn/AntihypertensivePotencyTable";
import BmiCalculator from "@/calculators/obesity/BmiCalculator";
import WaistHeightRatio from "@/calculators/obesity/WaistHeightRatio";
import GLP1ObesityAlgorithm from "@/calculators/obesity/GLP1ObesityAlgorithm";
import NotFound from "@/components/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TabNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Tab Pages */}
          <Route path="/diabetes" element={<Diabetes />} />
          <Route path="/hypertension" element={<Hypertension />} />
          <Route path="/lipids" element={<Lipids />} />
          {/* Diabetes Calculators */}
          <Route path="/insulin-titration" element={<InsulinTitration />} />
          <Route path="/sliding-scale" element={<SlidingScaleInsulin />} />
          <Route path="/hypo-risk" element={<HypoRiskCalculator />} />
          <Route path="/renal-dosing" element={<RenalDoseAdjustment />} />
          <Route path="/diabetes/medication-algorithm" element={<DiabetesMedicationAlgorithm />} />
          {/* Lipid Calculators */}
          <Route path="/lipid-panel" element={<LipidCalculator />} />
          <Route path="/ascvd-risk" element={<AscvdEmr />} />
          {/* Hypertension Calculators */}
          <Route path="/gfr-calculator" element={<GfrCalculator />} />
          <Route path="/drug-interactions" element={<DrugInteractionChecker />} />
          <Route path="/htn/treatment-algorithm" element={<AntihypertensiveTreatmentAlgorithm />} />
          <Route path="/htn/potency-table" element={<AntihypertensivePotencyTable />} />
          {/* Obesity Calculators */}
          <Route path="/obesity/bmi-calculator" element={<BmiCalculator />} />
          <Route path="/obesity/waist-height-ratio" element={<WaistHeightRatio />} />
          <Route path="/obesity/glp1-algorithm" element={<GLP1ObesityAlgorithm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
