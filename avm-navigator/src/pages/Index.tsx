import { useState } from 'react';
import { SpetzlerMartinClassification } from '@/components/SpetzlerMartinClassification';
import { AnalysisChecklist } from '@/components/AnalysisChecklist';
import { VascularArchitectureChecklist } from '@/components/VascularArchitectureChecklist';
import { EmbolizationFactors } from '@/components/EmbolizationFactors';
import { TreatmentConsiderations } from '@/components/TreatmentConsiderations';
import { RuptureManagement } from '@/components/RuptureManagement';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Brain, Stethoscope, AlertTriangle, Settings, Shield } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('classification');
  
  const tabs = [
    { id: 'classification', label: 'Classification', icon: Brain, component: SpetzlerMartinClassification },
    { id: 'analysis', label: 'Analysis', icon: FileText, component: AnalysisChecklist },
    { id: 'architecture', label: 'Vascular Architecture', icon: Stethoscope, component: VascularArchitectureChecklist },
    { id: 'factors', label: 'Risk Factors', icon: AlertTriangle, component: EmbolizationFactors },
    { id: 'treatment', label: 'Treatment', icon: Settings, component: TreatmentConsiderations },
    { id: 'rupture', label: 'Emergency', icon: Shield, component: RuptureManagement },
  ];

  const getCurrentTabIndex = () => tabs.findIndex(tab => tab.id === activeTab);
  const progress = ((getCurrentTabIndex() + 1) / tabs.length) * 100;

  const handleNext = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-4">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
            AVM Evaluation and Embolization Checklist
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Comprehensive assessment tool for arteriovenous malformation evaluation and treatment planning
          </p>
          
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex-1 mr-4">
              <Progress value={progress} className="h-2" />
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              {getCurrentTabIndex() + 1} of {tabs.length}
            </span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop top tabs */}
          <TabsList className="hidden sm:grid w-full grid-cols-6 mb-8 h-auto p-1">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 text-sm py-2 px-3"
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <div className="space-y-4 sm:space-y-6">
                <tab.component />
                
                <div className="flex justify-between items-center pt-4 sm:pt-6 border-t gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={getCurrentTabIndex() === 0}
                    size="sm"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-1.5 sm:gap-2">
                    <Button variant="outline" onClick={handlePrint} size="sm" className="hidden sm:inline-flex">
                      Print
                    </Button>
                    
                    {getCurrentTabIndex() < tabs.length - 1 ? (
                      <Button onClick={handleNext} size="sm">
                        Next
                      </Button>
                    ) : (
                      <Button onClick={() => alert('Checklist completed!')} size="sm">
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}

          {/* Mobile bottom navigation */}
          <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-background border-t border-border z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div className="grid grid-cols-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-0.5 py-2 px-1 text-[9px] leading-tight transition-colors ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <tab.icon className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
                    <span className="text-center">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;