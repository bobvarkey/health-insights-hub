import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowRight, GitBranch, Target } from "lucide-react";

const DecisionFlowchart = () => {
  return (
    <Card className="bg-gradient-card shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-medical-primary" />
          WNBA Treatment Decision Flowchart
        </CardTitle>
        <CardDescription>
          Systematic approach to selecting optimal coiling strategy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Initial Assessment */}
        <div className="text-center">
          <div className="inline-block p-4 bg-medical-primary/10 rounded-xl border-2 border-medical-primary/20">
            <Target className="h-6 w-6 text-medical-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground">WNBA Identified</h3>
            <p className="text-sm text-muted-foreground mt-1">Wide-neck bifurcation aneurysm</p>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>

        {/* Primary Decision Point */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-medical-secondary/20 bg-medical-secondary/5">
            <CardHeader className="pb-3">
              <Badge variant="outline" className="w-fit bg-medical-secondary text-white">
                Simple Anatomy
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium">Neck-to-dome ratio &lt; 2</p>
              <p className="text-xs text-muted-foreground">Wide neck but favorable geometry</p>
              <Button size="sm" variant="outline" className="w-full mt-3">
                Simple Coiling
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-medical-warning/20 bg-medical-warning/5">
            <CardHeader className="pb-3">
              <Badge variant="outline" className="w-fit bg-medical-warning text-white">
                Complex Anatomy
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium">Neck-to-dome ratio ≥ 2</p>
              <p className="text-xs text-muted-foreground">Requires scaffold support</p>
              <Button size="sm" variant="outline" className="w-full mt-3">
                Stent-Assisted
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-medical-error/20 bg-medical-error/5">
            <CardHeader className="pb-3">
              <Badge variant="outline" className="w-fit bg-medical-error text-white">
                High Risk
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium">Multiple branches involved</p>
              <p className="text-xs text-muted-foreground">Y-configuration required</p>
              <Button size="sm" variant="outline" className="w-full mt-3">
                Y-Stent / eCLIPs
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>

        {/* Technique Selection */}
        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-medical-primary" />
            Recommended Techniques
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="text-center p-2 bg-card rounded-lg">
              <span className="font-medium text-medical-success">Y-SAC</span>
              <p className="text-xs text-muted-foreground">Bilateral protection</p>
            </div>
            <div className="text-center p-2 bg-card rounded-lg">
              <span className="font-medium text-medical-secondary">pCONUS2</span>
              <p className="text-xs text-muted-foreground">Neck bridging</p>
            </div>
            <div className="text-center p-2 bg-card rounded-lg">
              <span className="font-medium text-medical-warning">eCLIPs</span>
              <p className="text-xs text-muted-foreground">Side branch anchor</p>
            </div>
            <div className="text-center p-2 bg-card rounded-lg">
              <span className="font-medium text-medical-primary">T-Stent</span>
              <p className="text-xs text-muted-foreground">Non-overlapping</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DecisionFlowchart;