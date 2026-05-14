import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calculator, Activity } from "lucide-react";

const AngioCalcEmbed = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-elevated border-l-4 border-l-medical-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Calculator className="h-6 w-6 text-medical-primary" />
                AngioCalc Calculator
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Cerebral and Peripheral Aneurysm Calculator - Volume calculation and PHASES score
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open('https://www.angiocalc.com/', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-subtle rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-5 w-5 text-medical-primary" />
                <h4 className="font-semibold">Aneurysm Volume</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Calculate precise aneurysm volume using dimensions for treatment planning and coil selection
              </p>
            </div>
            <div className="bg-gradient-subtle rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-medical-secondary" />
                <h4 className="font-semibold">PHASES Score</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Predict 5-year rupture risk based on population, hypertension, age, size, earlier SAH, and site
              </p>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden border-2 border-border bg-white">
            <iframe
              src="https://www.angiocalc.com/"
              title="AngioCalc - Cerebral and Peripheral Aneurysm Calculator"
              className="w-full h-[700px]"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
          
          <p className="text-xs text-muted-foreground mt-4 text-center">
            External tool provided by AngioCalc.com. For clinical use, always verify calculations independently.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AngioCalcEmbed;
