import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InsulinTitration from "./pages/InsulinTitration";
import HypoRiskCalculator from "./pages/HypoRiskCalculator";
import RenalDoseAdjustment from "./pages/RenalDoseAdjustment";
import SlidingScaleInsulin from "./pages/SlidingScaleInsulin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/insulin-titration" element={<InsulinTitration />} />
          <Route path="/sliding-scale" element={<SlidingScaleInsulin />} />
          <Route path="/hypo-risk" element={<HypoRiskCalculator />} />
          <Route path="/renal-dosing" element={<RenalDoseAdjustment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
