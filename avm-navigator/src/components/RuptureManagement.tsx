import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock } from 'lucide-react';

export const RuptureManagement = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const emergencySteps = [
    {
      id: 'balloon',
      step: 'Inflate balloon',
      priority: 'immediate',
      description: 'Immediate balloon inflation to control bleeding'
    },
    {
      id: 'bp',
      step: 'Lower BP',
      priority: 'immediate', 
      description: 'Reduce blood pressure to minimize bleeding'
    },
    {
      id: 'protamine',
      step: 'Give protamine reversal',
      priority: 'immediate',
      description: 'Reverse anticoagulation if applicable'
    },
    {
      id: 'maintain',
      step: 'Keep balloon inflated for up to 45-60 minutes',
      priority: 'monitor',
      description: 'Maintain hemostasis while preparing next steps'
    },
    {
      id: 'coiling',
      step: 'Coil, coil, coil',
      priority: 'treatment',
      description: 'Deploy coils for mechanical occlusion'
    },
    {
      id: 'glue',
      step: 'Glue',
      priority: 'treatment',
      description: 'Apply liquid embolic agent'
    },
    {
      id: 'parent-vessel',
      step: 'Parent vessel occlusion',
      priority: 'treatment',
      description: 'Occlude parent vessel if necessary'
    },
    {
      id: 'stent-graft',
      step: 'Stent graft placement',
      priority: 'treatment',
      description: 'Deploy covered stent for vessel reconstruction'
    }
  ];

  const handleStepToggle = (stepId: string, checked: boolean) => {
    if (checked) {
      setCompletedSteps([...completedSteps, stepId]);
    } else {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'destructive';
      case 'monitor':
        return 'secondary';
      case 'treatment':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'IMMEDIATE';
      case 'monitor':
        return 'MONITOR';
      case 'treatment':
        return 'TREATMENT';
      default:
        return priority.toUpperCase();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-destructive text-base sm:text-lg">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
            Emergency: Inadvertent Rupture During Procedure
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Critical steps to manage procedural rupture complications. Follow in sequence.
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-3 sm:gap-4">
        {emergencySteps.map((step, index) => (
          <Card 
            key={step.id}
            className={`transition-all duration-200 ${
              completedSteps.includes(step.id) 
                ? 'bg-muted/50 border-success/30' 
                : 'hover:shadow-md'
            }`}
          >
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-start gap-2.5 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className={`
                      w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold
                      ${completedSteps.includes(step.id)
                        ? 'bg-success text-success-foreground'
                        : 'bg-primary text-primary-foreground'
                      }
                    `}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                    <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
                      <h3 className={`font-semibold text-sm sm:text-lg ${
                        completedSteps.includes(step.id) 
                          ? 'line-through text-muted-foreground' 
                          : ''
                      }`}>
                        {step.step}
                      </h3>
                      <Badge variant={getPriorityColor(step.priority)} className="text-[10px] sm:text-xs">
                        {getPriorityLabel(step.priority)}
                      </Badge>
                      {step.id === 'maintain' && (
                        <Badge variant="outline" className="gap-1 text-[10px] sm:text-xs">
                          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          45-60 min
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                <Checkbox
                  checked={completedSteps.includes(step.id)}
                  onCheckedChange={(checked) => handleStepToggle(step.id, !!checked)}
                  className="mt-0.5 sm:mt-1"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium">Progress:</span>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {completedSteps.length} of {emergencySteps.length} steps completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 sm:h-2 mt-2">
          <div 
            className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / emergencySteps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};