import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationHeader from "@/components/ui/navigation-header";
import StrategyCard from "@/components/strategy/strategy-card";
import DecisionFlowchart from "@/components/strategy/decision-flowchart";
import TechniqueComparison from "@/components/strategy/technique-comparison";
import RaymondRoyClassification from "@/components/strategy/raymond-roy-classification";
import AngioCalcEmbed from "@/components/strategy/angiocalc-embed";
import PHASESCalculator from "@/components/strategy/phases-calculator";
import { Brain, FileText, GitBranch, BookOpen, ArrowRight, Stethoscope, Download, Activity, Calculator, ClipboardList } from "lucide-react";
import heroImage from "@/assets/aneurysm-hero.jpg";

const Index = () => {
  const strategies = [
    {
      title: "Y-SAC Configuration",
      description: "Y-configuration double stent approach for complex bifurcation aneurysms",
      indication: "Wide-neck aneurysms requiring bilateral branch protection",
      complexity: "Complex" as const,
      advantages: [
        "Excellent parent vessel protection",
        "Bilateral branch preservation",
        "Stable coil positioning"
      ],
      considerations: [
        "Technically demanding procedure",
        "Longer operative time",
        "Dual antiplatelet therapy required"
      ]
    },
    {
      title: "pCONUS2 Technique",
      description: "Self-expanding device with distal crown and six petals for neck bridging",
      indication: "Wide-neck aneurysms with adequate landing zone",
      complexity: "Moderate" as const,
      advantages: [
        "Self-expanding design",
        "Good aneurysm neck coverage",
        "Single device deployment"
      ],
      considerations: [
        "Size limitations exist",
        "Learning curve required",
        "Cost considerations"
      ]
    },
    {
      title: "eCLIPs System",
      description: "Low-density ribs anchored in side branch with higher-density neck coverage",
      indication: "Suitable side branch anatomy for device anchoring",
      complexity: "Moderate" as const,
      advantages: [
        "Minimally invasive approach", 
        "Quick deployment time",
        "Preserves side branch flow"
      ],
      considerations: [
        "Anatomy dependent technique",
        "Specific sizing requirements",
        "Limited long-term data"
      ]
    },
    {
      title: "T-Stent / Non-overlapping Y",
      description: "Partial deployment technique without overlapping stent configuration",
      indication: "Cases where non-overlapping configuration is feasible",
      complexity: "Moderate" as const,
      advantages: [
        "Flexible deployment approach",
        "Good branch vessel access",
        "Lower metal burden"
      ],
      considerations: [
        "Precise positioning required",
        "Potential for coil migration",
        "Variable clinical outcomes"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                WNBA Coiling Strategy Platform
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Evidence-based decision support for Wide-Neck Bifurcation Aneurysm endovascular treatment planning
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Brain className="h-5 w-5" />
                  Start Assessment
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <FileText className="h-5 w-5" />
                  View Guidelines
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => window.open('/WNBA_aneurysm_stenting.docx', '_blank')}
                >
                  <Download className="h-5 w-5" />
                  Download Protocols
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img 
                  src={heroImage} 
                  alt="Aneurysm coiling procedure illustration"
                  className="w-full h-64 object-cover rounded-lg shadow-elevated"
                />
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">4</div>
                    <div className="text-sm text-blue-100">Primary Techniques</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">95%</div>
                    <div className="text-sm text-blue-100">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="strategies" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-card shadow-card">
            <TabsTrigger value="strategies" className="gap-2">
              <Stethoscope className="h-4 w-4" />
              <span className="hidden lg:inline">Treatment</span> Strategies
            </TabsTrigger>
            <TabsTrigger value="flowchart" className="gap-2">
              <GitBranch className="h-4 w-4" />
              <span className="hidden lg:inline">Decision</span> Flowchart
            </TabsTrigger>
            <TabsTrigger value="comparison" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden lg:inline">Technique</span> Comparison
            </TabsTrigger>
            <TabsTrigger value="classification" className="gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden lg:inline">RROC</span> Classification
            </TabsTrigger>
            <TabsTrigger value="phases" className="gap-2">
              <ClipboardList className="h-4 w-4" />
              PHASES
            </TabsTrigger>
            <TabsTrigger value="calculator" className="gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden lg:inline">Angio</span>Calc
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Endovascular Treatment Strategies
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive collection of proven techniques for wide-neck bifurcation aneurysm coiling, 
                based on current clinical evidence and best practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies.map((strategy, index) => (
                <StrategyCard
                  key={index}
                  title={strategy.title}
                  description={strategy.description}
                  indication={strategy.indication}
                  complexity={strategy.complexity}
                  advantages={strategy.advantages}
                  considerations={strategy.considerations}
                  onSelect={() => {}} // Protocol viewer handles the interaction now
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flowchart" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Clinical Decision Algorithm
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Systematic approach to selecting the most appropriate coiling technique 
                based on aneurysm characteristics and patient factors.
              </p>
            </div>
            
            <DecisionFlowchart />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Technique Analysis
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Detailed comparison of procedural approaches, success rates, 
                and clinical considerations for optimal treatment selection.
              </p>
            </div>
            
            <TechniqueComparison />
          </TabsContent>

          <TabsContent value="classification" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Raymond-Roy Occlusion Classification
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Standardized angiographic grading system for evaluating occlusion of 
                endovascularly treated intracranial aneurysms.
              </p>
            </div>
            
            <RaymondRoyClassification />
          </TabsContent>

          <TabsContent value="phases" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                PHASES Score Calculator
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Predict 5-year rupture risk based on Population, Hypertension, Age, Size, 
                Earlier SAH, and Site of aneurysm.
              </p>
            </div>
            
            <PHASESCalculator />
          </TabsContent>

          <TabsContent value="calculator" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Aneurysm Calculators
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Calculate aneurysm volume, packing density, and PHASES rupture risk score 
                for comprehensive treatment planning.
              </p>
            </div>
            
            <AngioCalcEmbed />
          </TabsContent>
        </Tabs>

        {/* Quick Reference Section */}
        <section className="mt-16">
          <Card className="bg-gradient-card shadow-elevated border-l-4 border-l-medical-secondary">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Brain className="h-6 w-6 text-medical-secondary" />
                Quick Reference Guide
              </CardTitle>
              <CardDescription className="text-base">
                Essential considerations for WNBA treatment planning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-medical-primary">Patient Assessment</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Aneurysm neck-to-dome ratio</li>
                    <li>• Branch vessel anatomy</li>
                    <li>• Parent vessel tortuosity</li>
                    <li>• Previous treatment history</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-medical-warning">Technical Factors</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Device sizing compatibility</li>
                    <li>• Access route planning</li>
                    <li>• Antiplatelet regimen</li>
                    <li>• Backup strategy preparation</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-medical-success">Outcome Optimization</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Complete occlusion target</li>
                    <li>• Branch preservation priority</li>
                    <li>• Long-term stability focus</li>
                    <li>• Follow-up imaging protocol</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;