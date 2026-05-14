import { useState } from 'react';
import { ChecklistItem } from './ChecklistItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle, Activity } from 'lucide-react';
import { Procedure } from '@/data/procedures';
import { GradingScales } from './GradingScales';

interface ProcedureChecklistProps {
  procedure: Procedure;
}

export const ProcedureChecklist = ({ procedure }: ProcedureChecklistProps) => {
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>({});

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const totalItems = procedure.steps.length;
  const progressPercentage = (completedCount / totalItems) * 100;

  const handleItemToggle = (index: number, completed: boolean) => {
    setCompletedItems(prev => ({ ...prev, [index]: completed }));
  };

  const resetChecklist = () => setCompletedItems({});

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Progress Card */}
      <Card className="shadow-soft">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Progress
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs sm:text-sm">
                {completedCount}/{totalItems}
              </Badge>
              {completedCount > 0 && (
                <button
                  onClick={resetChecklist}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {progressPercentage.toFixed(0)}% complete
          </p>
        </CardContent>
      </Card>

      {/* Safety Alert */}
      <Card className="border-destructive/20 bg-destructive/5 shadow-soft">
        <CardContent className="p-4 sm:pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-destructive text-sm sm:text-base mb-1">Safety Note</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {procedure.safetyNote}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grading Scales */}
      <GradingScales procedureId={procedure.id} />

      {/* Checklist Items */}
      <div className="space-y-3">
        {procedure.steps.map((item, index) => (
          <ChecklistItem
            key={`${procedure.id}-${index}`}
            step={index + 1}
            title={item.title}
            description={item.description}
            isCompleted={completedItems[index] || false}
            onToggle={(completed) => handleItemToggle(index, completed)}
          />
        ))}
      </div>

      {/* Completion */}
      {completedCount === totalItems && (
        <Card className="border-success/20 bg-success/5 shadow-soft">
          <CardContent className="p-4 sm:pt-6">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-success/10 flex items-center justify-center">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-success" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-success mb-1">
                Procedure Complete
              </h3>
              <p className="text-sm text-muted-foreground">
                All steps completed. Review for final assessment.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
