import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreProcedureChecklist } from "@/components/PreProcedureChecklist";
import { AngiogramReport } from "@/components/AngiogramReport";
import { ComplicationsTracker } from "@/components/ComplicationsTracker";
import { ProcedureSummary } from "@/components/ProcedureSummary";
import { NeurointerventionChecklist } from "@/components/NeurointerventionChecklist";
import { Activity, FileText, AlertTriangle, ClipboardCheck, BrainCircuit } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("checklist");

  // Mock data for summary - in real app this would come from state management
  const mockChecklistProgress = {
    main: { completed: 15, total: 23 },
    radial: { completed: 4, total: 6 }
  };

  const mockAngiogramData = {
    anesthesia: "Local Anesthesia",
    route: "Radial",
    closure: "Manual",
    usgGuidance: true,
    vessels: ["Rt CCA", "Rt ICA", "Lt CCA"],
    notes: "Procedure completed successfully with good visualization of all target vessels."
  };

  const mockComplications = {
    hasComplications: false,
    count: 0,
    categories: []
  };

  const tabs = [
    { value: "checklist", label: "Checklist", icon: Activity },
    { value: "neuro", label: "Neuro", icon: BrainCircuit },
    { value: "report", label: "Report", icon: FileText },
    { value: "complications", label: "Alerts", icon: AlertTriangle },
    { value: "summary", label: "Summary", icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <h1 className="text-xl sm:text-3xl font-bold text-primary">Cerebral Angiogram Protocol</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            Comprehensive checklist and documentation system
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop top tabs */}
          <TabsList className="hidden sm:grid w-full grid-cols-5 mb-8">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="checklist" className="space-y-6">
            <PreProcedureChecklist />
          </TabsContent>
          <TabsContent value="neuro" className="space-y-6">
            <NeurointerventionChecklist />
          </TabsContent>
          <TabsContent value="report" className="space-y-6">
            <AngiogramReport />
          </TabsContent>
          <TabsContent value="complications" className="space-y-6">
            <ComplicationsTracker />
          </TabsContent>
          <TabsContent value="summary" className="space-y-6">
            <ProcedureSummary 
              checklistProgress={mockChecklistProgress}
              angiogramData={mockAngiogramData}
              complications={mockComplications}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] sm:hidden">
        <div className="grid grid-cols-5">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`relative flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-all duration-200 ${
                activeTab === tab.value
                  ? "text-primary scale-105"
                  : "text-muted-foreground"
              }`}
            >
              {activeTab === tab.value && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full bg-primary animate-scale-in" />
              )}
              <tab.icon className={`h-5 w-5 transition-transform duration-200 ${activeTab === tab.value ? "text-primary" : ""}`} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;