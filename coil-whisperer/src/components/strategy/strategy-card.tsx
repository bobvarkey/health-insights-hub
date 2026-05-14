import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertTriangle, Play } from "lucide-react";
import ProtocolViewer from "./protocol-viewer";

interface StrategyCardProps {
  title: string;
  description: string;
  indication: string;
  complexity: "Simple" | "Moderate" | "Complex";
  advantages: string[];
  considerations: string[];
  onSelect?: () => void;
}

const StrategyCard = ({ 
  title, 
  description, 
  indication, 
  complexity, 
  advantages, 
  considerations,
  onSelect 
}: StrategyCardProps) => {
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);
  const getComplexityColor = (level: string) => {
    switch (level) {
      case "Simple": return "bg-medical-success text-white";
      case "Moderate": return "bg-medical-warning text-white";
      case "Complex": return "bg-medical-error text-white";
      default: return "bg-medical-neutral text-white";
    }
  };

  return (
    <Card className="h-full bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 border-l-4 border-l-medical-primary">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground mb-2">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mb-3">
              {description}
            </CardDescription>
          </div>
          <Badge className={getComplexityColor(complexity)}>
            {complexity}
          </Badge>
        </div>
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-sm font-medium text-secondary-foreground">
            <span className="text-medical-primary">Indication:</span> {indication}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-medical-success" />
            Advantages
          </h4>
          <ul className="space-y-1">
            {advantages.map((advantage, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-medical-success mt-1">•</span>
                {advantage}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-medical-warning" />
            Considerations
          </h4>
          <ul className="space-y-1">
            {considerations.map((consideration, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-medical-warning mt-1">•</span>
                {consideration}
              </li>
            ))}
          </ul>
        </div>

        <Button 
          onClick={() => setIsProtocolOpen(true)}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
        >
          <Play className="h-4 w-4" />
          Animated Protocol
          <ArrowRight className="h-4 w-4" />
        </Button>
        
        <ProtocolViewer
          isOpen={isProtocolOpen}
          onClose={() => setIsProtocolOpen(false)}
          technique={title}
        />
      </CardContent>
    </Card>
  );
};

export default StrategyCard;