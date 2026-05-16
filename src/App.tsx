import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import InsulinTitration from "@/calculators/diabetes/InsulinTitration";
import HypoRiskCalculator from "@/calculators/diabetes/HypoRisk";
import RenalDoseAdjustment from "@/calculators/diabetes/RenalDosing";
import SlidingScaleInsulin from "@/calculators/diabetes/SlidingScale";
import AscvdEmr from "@/calculators/lipids/AscvdRisk";
import LipidCalculator from "@/calculators/lipids/LipidPanel";
import GfrCalculator from "@/calculators/htn/GfrCalculator";
import DrugInteractionChecker from "@/calculators/htn/DrugInteractions";
import BmiCalculator from "@/calculators/obesity/BmiCalculator";
import WaistHeightRatio from "@/calculators/obesity/WaistHeightRatio";
import NotFound from "@/components/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insulin-titration" element={<InsulinTitration />} />
          <Route path="/sliding-scale" element={<SlidingScaleInsulin />} />
          <Route path="/hypo-risk" element={<HypoRiskCalculator />} />
          <Route path="/renal-dosing" element={<RenalDoseAdjustment />} />
          <Route path="/lipid-panel" element={<LipidCalculator />} />
          <Route path="/ascvd-risk" element={<AscvdEmr />} />
          <Route path="/gfr-calculator" element={<GfrCalculator />} />
          <Route path="/drug-interactions" element={<DrugInteractionChecker />} />
          <Route path="/obesity/bmi-calculator" element={<BmiCalculator />} />
          <Route path="/obesity/waist-height-ratio" element={<WaistHeightRatio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
