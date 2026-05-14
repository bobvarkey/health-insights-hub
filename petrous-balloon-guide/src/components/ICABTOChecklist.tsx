import { useState } from 'react';
import { ChecklistItem } from './ChecklistItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle, Activity } from 'lucide-react';

const checklistItems = [
  {
    title: "Place patient under GA",
    description: "Ensure patient is properly positioned and under general anesthesia before beginning procedure."
  },
  {
    title: "Obtain dual arterial access",
    description: "Establish dual arterial groin or radial access, or combination thereof for optimal catheter positioning."
  },
  {
    title: "Perform diagnostic angiography",
    description: "Complete at least 3 vessel diagnostic angiography — two internals and a dominant vert, or both verts."
  },
  {
    title: "Place compliant balloon",
    description: "Position your preferred compliant balloon into the petrous segment of the test ICA or as close to the lesion as possible but do not inflate. Horizontal petrous segment is safest — the bone protects against over-inflation and there is little chance of spasm here."
  },
  {
    title: "Position contralateral catheter",
    description: "Place the second diagnostic catheter into the contralateral ICA for cross-flow assessment."
  },
  {
    title: "Set up imaging view",
    description: "Configure your frontal view to include both hemispheres for comprehensive visualization."
  },
  {
    title: "Administer heparin",
    description: "Give appropriate heparin dosage as clinically indicated for anticoagulation."
  },
  {
    title: "Check blood pressure",
    description: "Coordinate with anesthesia regarding blood pressure — assess current pressure relative to baseline. Most of the time, pressure will be lower under GA (30% less), providing your hypotensive challenge."
  },
  {
    title: "Obtain vessel roadmap",
    description: "Acquire a roadmap of the vessel being tested for reference during occlusion."
  },
  {
    title: "Inflate balloon",
    description: "Carefully inflate the test balloon to achieve complete vessel occlusion."
  },
  {
    title: "Set frame rate",
    description: "Configure frame rate to 2 fps for optimal imaging throughout the test period."
  },
  {
    title: "Ipsilateral guide run",
    description: "Perform a run of the ipsilateral guide (on side of balloon) in biplane to confirm full balloon occlusion of the ICA and visualize potential ophthalmic, ILT, and other ECA-ICA collaterals. More ECA-ICA collaterals indicate worse circle of Willis and higher likelihood of BTO failure."
  },
  {
    title: "Contralateral ICA run",
    description: "Execute a run of the contralateral ICA. Only frontal projection is useful. Inject sufficient contrast (10 ccs or so) and image well into the venous phase for cross-flow assessment."
  },
  {
    title: "Vertebral artery assessment",
    description: "Reposition the contralateral ICA catheter into the dominant vert and perform a biplane run of the head to visualize PCA/PCOM contribution to the side being tested."
  },
  {
    title: "Deflate balloon",
    description: "Carefully deflate the test balloon after completing all imaging sequences."
  },
  {
    title: "Post-BTO assessment",
    description: "Perform a post-BTO run of the internal carotid artery to check for dissections, emboli, spasm, or other complications."
  },
  {
    title: "Analyze images",
    description: "Review all imaging at standard 2 frames per second for the ENTIRE run. A delay of more than 1 second in venous phase between the open and occluded hemispheres indicates test failure."
  }
];

export const ICABTOChecklist = () => {
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>({});
  
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const totalItems = checklistItems.length;
  const progressPercentage = (completedCount / totalItems) * 100;

  const handleItemToggle = (index: number, completed: boolean) => {
    setCompletedItems(prev => ({
      ...prev,
      [index]: completed
    }));
  };

  const resetChecklist = () => {
    setCompletedItems({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-medical-gradient text-primary-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8" />
            <h1 className="text-3xl font-bold">ICA BTO Procedure Checklist</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">
            Internal Carotid Artery Balloon Test Occlusion - Systematic procedural checklist
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Card */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Procedure Progress
              </CardTitle>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-sm">
                  {completedCount} of {totalItems} completed
                </Badge>
                {completedCount > 0 && (
                  <button
                    onClick={resetChecklist}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Reset All
                  </button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {progressPercentage.toFixed(0)}% of procedure completed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Safety Alert */}
        <Card className="mb-8 border-destructive/20 bg-destructive/5 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive mb-2">Critical Safety Note</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is a high-risk neurological procedure. Ensure all safety protocols are followed. 
                  A delay of more than 1 second in venous phase between hemispheres indicates test failure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist Items */}
        <div className="space-y-4">
          {checklistItems.map((item, index) => (
            <ChecklistItem
              key={index}
              step={index + 1}
              title={item.title}
              description={item.description}
              isCompleted={completedItems[index] || false}
              onToggle={(completed) => handleItemToggle(index, completed)}
            />
          ))}
        </div>

        {/* Completion Message */}
        {completedCount === totalItems && (
          <Card className="mt-8 border-success/20 bg-success/5 shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-success mb-2">
                  ICA BTO Procedure Completed
                </h3>
                <p className="text-muted-foreground">
                  All checklist items have been completed. Review imaging analysis for final assessment.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};