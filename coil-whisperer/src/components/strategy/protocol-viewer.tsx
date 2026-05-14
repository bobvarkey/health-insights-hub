import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, X, Clock, Zap, CheckCircle2 } from "lucide-react";
import ySacImage from "@/assets/y-sac-technique.jpg";
import pconus2Image from "@/assets/pconus2-technique.jpg";
import eclipsImage from "@/assets/eclips-technique.jpg";
import tStentImage from "@/assets/t-stent-technique.jpg";

interface ProtocolStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  animation: "stent" | "coil" | "device" | "navigation";
  details: string[];
}

interface ProtocolData {
  title: string;
  complexity: string;
  estimatedTime: string;
  steps: ProtocolStep[];
}

interface ProtocolViewerProps {
  isOpen: boolean;
  onClose: () => void;
  technique: string;
}

const ProtocolViewer = ({ isOpen, onClose, technique }: ProtocolViewerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const protocols: Record<string, ProtocolData> = {
    "Y-SAC Configuration": {
      title: "Y-SAC Double Stent Configuration",
      complexity: "Complex",
      estimatedTime: "60-90 min",
      steps: [
        {
          id: 1,
          title: "Initial Access & Navigation",
          description: "Establish bilateral access and position microcatheters",
          duration: 15,
          animation: "navigation",
          details: ["6F guide catheter placement", "Bilateral microcatheter navigation", "Roadmap imaging confirmation"]
        },
        {
          id: 2,
          title: "First Stent Deployment",
          description: "Deploy first stent across dominant branch",
          duration: 20,
          animation: "stent",
          details: ["Stent positioning verification", "Controlled deployment", "Immediate angiographic check"]
        },
        {
          id: 3,
          title: "Second Stent Positioning",
          description: "Navigate through first stent and position second stent",
          duration: 25,
          animation: "stent",
          details: ["Cell navigation technique", "Y-configuration verification", "Stent-to-stent positioning"]
        },
        {
          id: 4,
          title: "Coil Embolization",
          description: "Progressive coil filling with stent protection",
          duration: 30,
          animation: "coil",
          details: ["Framing coil placement", "Progressive filling", "Dense packing completion"]
        }
      ]
    },
    "pCONUS2 Technique": {
      title: "pCONUS2 Device Deployment",
      complexity: "Moderate",
      estimatedTime: "45-60 min",
      steps: [
        {
          id: 1,
          title: "Device Preparation",
          description: "Size selection and microcatheter positioning",
          duration: 10,
          animation: "navigation",
          details: ["Device sizing calculation", "Microcatheter placement", "Working angle optimization"]
        },
        {
          id: 2,
          title: "pCONUS2 Deployment",
          description: "Self-expanding device deployment with crown positioning",
          duration: 15,
          animation: "device",
          details: ["Crown deployment first", "Petal expansion verification", "Device stability check"]
        },
        {
          id: 3,
          title: "Coil Embolization",
          description: "Coil placement with device assistance",
          duration: 20,
          animation: "coil",
          details: ["Bridging coil technique", "Device-assisted packing", "Neck reconstruction verification"]
        }
      ]
    },
    "eCLIPs System": {
      title: "eCLIPs Leaf Device System",
      complexity: "Moderate", 
      estimatedTime: "30-45 min",
      steps: [
        {
          id: 1,
          title: "Side Branch Anchoring",
          description: "Position low-density ribs in side branch",
          duration: 10,
          animation: "navigation",
          details: ["Side branch selection", "Anchoring verification", "Flow preservation check"]
        },
        {
          id: 2,
          title: "Neck Coverage",
          description: "Deploy higher-density ribs across aneurysm neck",
          duration: 15,
          animation: "device",
          details: ["Neck coverage optimization", "Rib density adjustment", "Flow dynamics check"]
        },
        {
          id: 3,
          title: "Coil Deployment",
          description: "Assisted coil embolization with device support",
          duration: 15,
          animation: "coil",
          details: ["Device-guided coiling", "Neck reconstruction", "Complete occlusion verification"]
        }
      ]
    },
    "T-Stent / Non-overlapping Y": {
      title: "T-Stent Configuration",
      complexity: "Moderate",
      estimatedTime: "45-75 min",
      steps: [
        {
          id: 1,
          title: "Initial Stent Placement",
          description: "Deploy first stent in primary branch",
          duration: 20,
          animation: "stent",
          details: ["Primary branch stenting", "Positioning verification", "Cell access preparation"]
        },
        {
          id: 2,
          title: "T-Configuration Setup",
          description: "Navigate through stent cells for T-configuration",
          duration: 25,
          animation: "navigation",
          details: ["Cell navigation", "T-angle optimization", "Branch preservation verification"]
        },
        {
          id: 3,
          title: "Coil Embolization",
          description: "Protected coiling with T-stent configuration",
          duration: 30,
          animation: "coil",
          details: ["T-stent guided coiling", "Branch protection verification", "Aneurysm occlusion completion"]
        }
      ]
    }
  };

  const currentProtocol = protocols[technique];

  const techniqueImages: Record<string, string> = {
    "Y-SAC Configuration": ySacImage,
    "pCONUS2 Technique": pconus2Image,
    "eCLIPs System": eclipsImage,
    "T-Stent / Non-overlapping Y": tStentImage,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < currentProtocol?.steps.length - 1) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((prevStep) => prevStep + 1);
            return 0;
          }
          return prev + (100 / (currentProtocol.steps[currentStep].duration * 10));
        });
      }, 100);
    } else if (progress >= 100 && currentStep === currentProtocol?.steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, progress, currentProtocol]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
  };

  const renderAnimation = (type: string) => {
    switch (type) {
      case "stent":
        return (
          <div className="stent-animation">
            <div className="stent-deployment"></div>
            <div className="absolute top-2 left-2 text-xs text-medical-primary font-medium">Stent Deployment</div>
          </div>
        );
      case "coil":
        return (
          <div className="stent-animation">
            <div className="coil-placement"></div>
            <div className="absolute top-2 left-2 text-xs text-medical-warning font-medium">Coil Placement</div>
          </div>
        );
      case "device":
        return (
          <div className="stent-animation">
            <div className="absolute inset-0 bg-gradient-radial from-medical-secondary/40 to-transparent rounded-lg animate-pulse"></div>
            <div className="absolute top-2 left-2 text-xs text-medical-secondary font-medium">Device Deployment</div>
          </div>
        );
      case "navigation":
        return (
          <div className="stent-animation">
            <div className="absolute top-1/2 w-full h-1 bg-medical-primary/60 transform -translate-y-1/2 animate-pulse"></div>
            <div className="absolute top-2 left-2 text-xs text-medical-primary font-medium">Navigation</div>
          </div>
        );
      default:
        return <div className="stent-animation"></div>;
    }
  };

  if (!currentProtocol) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-gradient-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-medical-primary" />
                {currentProtocol.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-4 mt-2">
                <Badge className="bg-medical-warning text-white">
                  {currentProtocol.complexity}
                </Badge>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {currentProtocol.estimatedTime}
                </span>
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Medical Illustration */}
          <Card className="bg-secondary/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Technique Illustration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden rounded-lg bg-white p-4">
                <img 
                  src={techniqueImages[technique]} 
                  alt={`${technique} medical illustration`}
                  className="w-full h-auto max-h-80 object-contain mx-auto"
                />
              </div>
            </CardContent>
          </Card>

          {/* Animation Section */}
          <Card className="bg-secondary/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Procedure Animation</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handlePlayPause}
                  className="gap-2"
                  variant={isPlaying ? "secondary" : "default"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button size="sm" variant="outline" onClick={handleReset} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderAnimation(currentProtocol.steps[currentStep]?.animation)}
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Steps Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Procedure Steps</h3>
            <div className="grid gap-4">
              {currentProtocol.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`technique-step animate-fade-in-up ${
                    index === currentStep ? "active" : ""
                  } ${index < currentStep ? "opacity-60" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index === currentStep
                          ? "bg-medical-primary text-white"
                          : index < currentStep
                          ? "bg-medical-success text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {index < currentStep ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">{step.title}</h4>
                        <span className="text-sm text-muted-foreground">{step.duration} min</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <span className="text-medical-primary mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProtocolViewer;