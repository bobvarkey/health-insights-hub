import { Activity, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavigationHeader = () => {
  return (
    <header className="bg-gradient-card border-b shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-medical">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">WNBA Coiling Strategy</h1>
              <p className="text-sm text-muted-foreground">Wide-Neck Bifurcation Aneurysm Treatment Planning</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Activity className="h-4 w-4" />
              Quick Assessment
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;