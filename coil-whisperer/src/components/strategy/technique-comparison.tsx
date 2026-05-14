import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, AlertCircle, Clock, Zap, Shield } from "lucide-react";

const TechniqueComparison = () => {
  const techniques = [
    {
      id: "y-sac",
      name: "Y-SAC Configuration",
      complexity: "Complex",
      time: "60-90 min",
      success: "High",
      description: "Y-configuration double stent protects parent artery and both side branches",
      pros: [
        "Excellent parent vessel protection",
        "Bilateral branch preservation", 
        "Stable coil positioning",
        "Reduced recanalization risk"
      ],
      cons: [
        "Technically demanding",
        "Longer procedure time",
        "Dual antiplatelet requirement",
        "Higher complexity"
      ],
      indications: "Complex bifurcation aneurysms with critical branch preservation needs"
    },
    {
      id: "pconus",
      name: "pCONUS2",
      complexity: "Moderate",
      time: "45-60 min", 
      success: "High",
      description: "Distal crown and six petals provide bridging structure at the neck",
      pros: [
        "Self-expanding design",
        "Good neck coverage",
        "Preserves flow dynamics",
        "Single device deployment"
      ],
      cons: [
        "Size limitations",
        "Learning curve required",
        "Cost considerations",
        "Limited repositioning"
      ],
      indications: "Wide-neck aneurysms with adequate landing zone"
    },
    {
      id: "eclips",
      name: "eCLIPs",
      complexity: "Moderate",
      time: "30-45 min",
      success: "High",
      description: "Low-density ribs anchored in side branch, higher-density ribs cover aneurysm neck",
      pros: [
        "Minimally invasive",
        "Quick deployment",
        "Good neck reconstruction", 
        "Side branch preservation"
      ],
      cons: [
        "Anatomy dependent",
        "Limited availability",
        "Specific sizing required",
        "New technology"
      ],
      indications: "Suitable side branch anatomy for anchoring"
    },
    {
      id: "t-stent",
      name: "T-Stent / Non-overlapping Y",
      complexity: "Moderate",
      time: "45-75 min",
      success: "Moderate-High", 
      description: "Partial deployment technique without overlapping stents",
      pros: [
        "Flexible approach",
        "Good branch access",
        "Lower metal burden",
        "Established technique"
      ],
      cons: [
        "Precise positioning needed",
        "Potential coil migration",
        "Technical complexity",
        "Variable outcomes"
      ],
      indications: "Non-overlapping configuration feasible"
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Complex": return "bg-medical-error text-white";
      case "Moderate": return "bg-medical-warning text-white";
      default: return "bg-medical-success text-white";
    }
  };

  const getSuccessColor = (success: string) => {
    if (success.includes("High")) return "text-medical-success";
    if (success.includes("Moderate")) return "text-medical-warning";
    return "text-medical-error";
  };

  return (
    <Card className="bg-gradient-card shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-medical-primary" />
          Technique Comparison
        </CardTitle>
        <CardDescription>
          Comparative analysis of WNBA coiling strategies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="y-sac" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {techniques.map((technique) => (
              <TabsTrigger key={technique.id} value={technique.id} className="text-xs">
                {technique.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {techniques.map((technique) => (
            <TabsContent key={technique.id} value={technique.id} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <Clock className="h-8 w-8 text-medical-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-foreground">{technique.time}</div>
                  <div className="text-xs text-muted-foreground">Procedure Time</div>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <Zap className="h-8 w-8 text-medical-secondary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <Badge className={getComplexityColor(technique.complexity)}>
                    {technique.complexity}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">Complexity</div>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <CheckCircle2 className={`h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform ${getSuccessColor(technique.success)}`} />
                  <div className={`text-sm font-medium ${getSuccessColor(technique.success)}`}>
                    {technique.success}
                  </div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>

              <Card className="bg-secondary/20">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">{technique.description}</p>
                  <div className="bg-medical-primary/10 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-foreground">
                      <strong>Indication:</strong> {technique.indications}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-medical-success">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-medical-success" />
                      Advantages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {technique.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-medical-success mt-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-medical-warning">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-medical-warning" />
                      Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {technique.cons.map((con, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-medical-warning mt-1">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TechniqueComparison;