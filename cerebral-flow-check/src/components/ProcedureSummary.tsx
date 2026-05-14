import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertTriangle, FileText, Activity } from "lucide-react";

interface ProcedureSummaryProps {
  checklistProgress: {
    main: { completed: number; total: number; };
    radial: { completed: number; total: number; };
  };
  angiogramData: {
    anesthesia: string;
    route: string;
    closure: string;
    usgGuidance: boolean;
    vessels: string[];
    notes: string;
  };
  complications: {
    hasComplications: boolean;
    count: number;
    categories: string[];
  };
}

export function ProcedureSummary({ checklistProgress, angiogramData, complications }: ProcedureSummaryProps) {
  const totalChecklist = checklistProgress.main.total + checklistProgress.radial.total;
  const totalCompleted = checklistProgress.main.completed + checklistProgress.radial.completed;
  const overallProgress = (totalCompleted / totalChecklist) * 100;

  const getProgressStatus = () => {
    if (overallProgress === 100) return { status: "Complete", color: "bg-success", icon: CheckCircle };
    if (overallProgress >= 80) return { status: "Nearly Complete", color: "bg-accent", icon: Activity };
    if (overallProgress >= 50) return { status: "In Progress", color: "bg-primary", icon: Activity };
    return { status: "Started", color: "bg-muted", icon: Activity };
  };

  const progressStatus = getProgressStatus();
  const ProgressIcon = progressStatus.icon;

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Procedure Summary
            </span>
            <Badge variant="outline" className={`${progressStatus.color} text-white`}>
              <ProgressIcon className="h-3 w-3 mr-1" />
              {progressStatus.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{Math.round(overallProgress)}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-accent">{totalCompleted}/{totalChecklist}</div>
              <div className="text-sm text-muted-foreground">Items Completed</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className={`text-2xl font-bold ${complications.hasComplications ? 'text-destructive' : 'text-success'}`}>
                {complications.count}
              </div>
              <div className="text-sm text-muted-foreground">Complications</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Checklist Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Pre-Procedure Checklist</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {checklistProgress.main.completed}/{checklistProgress.main.total}
              </span>
              {checklistProgress.main.completed === checklistProgress.main.total ? (
                <CheckCircle className="h-4 w-4 text-success" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-muted border-2 border-primary" />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Radial Access Checklist</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {checklistProgress.radial.completed}/{checklistProgress.radial.total}
              </span>
              {checklistProgress.radial.completed === checklistProgress.radial.total ? (
                <CheckCircle className="h-4 w-4 text-success" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-muted border-2 border-accent" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Procedure Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Procedure Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Anesthesia</div>
              <div className="text-base">{angiogramData.anesthesia || "Not specified"}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Access Route</div>
              <div className="text-base">{angiogramData.route || "Not specified"}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-muted-foreground">Closure Method</div>
              <div className="text-base">{angiogramData.closure || "Not specified"}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-muted-foreground">USG Guidance</div>
              <div className="text-base">{angiogramData.usgGuidance ? "Yes" : "No"}</div>
            </div>
          </div>
          
          {angiogramData.vessels.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="text-sm font-semibold text-muted-foreground mb-2">Vessels Studied</div>
                <div className="flex flex-wrap gap-1">
                  {angiogramData.vessels.map((vessel) => (
                    <Badge key={vessel} variant="secondary" className="text-xs">
                      {vessel}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {angiogramData.notes && (
            <>
              <Separator />
              <div>
                <div className="text-sm font-semibold text-muted-foreground mb-2">Additional Notes</div>
                <div className="text-sm bg-muted/30 p-3 rounded-md">{angiogramData.notes}</div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Complications Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className={`h-5 w-5 ${complications.hasComplications ? 'text-destructive' : 'text-muted-foreground'}`} />
            Complications Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {complications.hasComplications ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-semibold">{complications.count} complication(s) documented</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Categories affected: {complications.categories.join(", ")}
              </div>
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                ⚠️ Immediate review and appropriate management required
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
              <div className="text-sm">No complications documented</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}