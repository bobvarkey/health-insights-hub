import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RaymondRoyClassification = () => {
  const classifications = [
    {
      class: "I",
      name: "Complete Obliteration",
      description: "No residual filling of the aneurysm sac or neck",
      equivalent: "~100% obliteration",
      prognosis: "Excellent",
      icon: CheckCircle,
      color: "bg-medical-success/10 border-medical-success text-medical-success",
      badgeColor: "bg-medical-success text-white"
    },
    {
      class: "II",
      name: "Residual Neck",
      description: "Residual filling of the aneurysm neck only",
      equivalent: ">90% obliteration",
      prognosis: "Good",
      icon: AlertCircle,
      color: "bg-medical-warning/10 border-medical-warning text-medical-warning",
      badgeColor: "bg-medical-warning text-white"
    },
    {
      class: "III",
      name: "Residual Aneurysm",
      description: "Residual filling of the aneurysm sac",
      equivalent: "<90% obliteration",
      prognosis: "Monitor closely",
      icon: AlertTriangle,
      color: "bg-medical-danger/10 border-medical-danger text-medical-danger",
      badgeColor: "bg-medical-danger text-white"
    }
  ];

  const modifiedClassifications = [
    {
      class: "IIIa",
      name: "Coil Interstices Filling",
      description: "Contrast opacification within the coil interstices of a residual aneurysm",
      progression: "Higher likelihood of progression to complete occlusion",
      color: "bg-amber-500/10 border-amber-500 text-amber-600"
    },
    {
      class: "IIIb",
      name: "Wall Opacification",
      description: "Contrast opacification outside the coil interstices, along the residual aneurysm wall",
      progression: "Lower likelihood of spontaneous occlusion",
      color: "bg-red-500/10 border-red-500 text-red-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Classification */}
      <Card className="shadow-elevated border-l-4 border-l-medical-primary">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-2xl">Raymond-Roy Occlusion Classification</CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Also known as the Raymond class, Montreal scale, or Raymond Montreal scale. An angiographic classification scheme for grading occlusion of endovascularly treated intracranial aneurysms.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <CardDescription className="text-base">
            Angiographic grading system for endovascularly treated intracranial aneurysm occlusion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classifications.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.class}
                  className={`rounded-xl border-2 p-5 transition-all hover:shadow-card ${item.color}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={item.badgeColor}>Class {item.class}</Badge>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground mb-2">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Equivalent:</span>
                      <span className="font-medium text-foreground">{item.equivalent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prognosis:</span>
                      <span className="font-medium text-foreground">{item.prognosis}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modified Classification */}
      <Card className="shadow-card border-l-4 border-l-medical-secondary">
        <CardHeader>
          <CardTitle className="text-xl">Modified Raymond-Roy Classification (MRRC)</CardTitle>
          <CardDescription>
            Proposed by Mascitelli et al. (2015) - subdivides Class III to reflect progression to occlusion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modifiedClassifications.map((item) => (
              <div
                key={item.class}
                className={`rounded-xl border-2 p-5 transition-all hover:shadow-card ${item.color}`}
              >
                <Badge variant="outline" className="mb-3">Class {item.class}</Badge>
                <h4 className="font-bold text-foreground mb-2">{item.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-xs font-medium text-foreground">
                    <span className="text-muted-foreground">Progression: </span>
                    {item.progression}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Key Finding:</strong> The study from Mascitelli et al. found that Class IIIa aneurysms have a higher likelihood of progressing to complete occlusion compared to Class IIIb aneurysms.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RaymondRoyClassification;
