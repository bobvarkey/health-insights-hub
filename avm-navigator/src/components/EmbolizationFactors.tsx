import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export const EmbolizationFactors = () => {
  const [accessibility, setAccessibility] = useState<{[key: string]: boolean}>({});
  const [architecture, setArchitecture] = useState<{[key: string]: boolean}>({});
  const [complications, setComplications] = useState<{[key: string]: boolean}>({});

  const handleAccessibilityChange = (key: string, checked: boolean) => {
    setAccessibility(prev => ({ ...prev, [key]: checked }));
  };

  const handleArchitectureChange = (key: string, checked: boolean) => {
    setArchitecture(prev => ({ ...prev, [key]: checked }));
  };

  const handleComplicationChange = (key: string, checked: boolean) => {
    setComplications(prev => ({ ...prev, [key]: checked }));
  };

  const getRiskCount = () => {
    return Object.values(accessibility).filter(Boolean).length + 
           Object.values(architecture).filter(Boolean).length + 
           Object.values(complications).filter(Boolean).length;
  };

  const getRiskLevel = (count: number) => {
    if (count === 0) return { level: 'Low Risk', color: 'bg-success text-success-foreground' };
    if (count <= 3) return { level: 'Moderate Risk', color: 'bg-warning text-warning-foreground' };
    return { level: 'High Risk', color: 'bg-destructive text-destructive-foreground' };
  };

  const riskCount = getRiskCount();
  const riskLevel = getRiskLevel(riskCount);

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base sm:text-lg">
          Embolization: Specific Problematic Factors
          <Badge className={riskLevel.color}>
            {riskLevel.level} ({riskCount} factors)
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Anatomy Accessibility</h4>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Navigation Issues</h5>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="tortuosity" checked={accessibility.tortuosity || false} onCheckedChange={(checked) => handleAccessibilityChange('tortuosity', !!checked)} />
                  <Label htmlFor="tortuosity" className="text-sm">Tortuosity of arterial feeders or veins</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="vesselSize" checked={accessibility.vesselSize || false} onCheckedChange={(checked) => handleAccessibilityChange('vesselSize', !!checked)} />
                  <Label htmlFor="vesselSize" className="text-sm">Small size of arterial feeders or veins</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="refluxRisk" checked={accessibility.refluxRisk || false} onCheckedChange={(checked) => handleAccessibilityChange('refluxRisk', !!checked)} />
                  <Label htmlFor="refluxRisk" className="text-sm">Risk of reflux along catheter</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Angioarchitecture</h4>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="compactNidus" checked={architecture.compactNidus || false} onCheckedChange={(checked) => handleArchitectureChange('compactNidus', !!checked)} />
              <Label htmlFor="compactNidus" className="text-sm">Compact nidus (challenging penetration)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="diffuseNidus" checked={architecture.diffuseNidus || false} onCheckedChange={(checked) => handleArchitectureChange('diffuseNidus', !!checked)} />
              <Label htmlFor="diffuseNidus" className="text-sm">Diffuse nidus (incomplete occlusion risk)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enPassageFeeders" checked={architecture.enPassageFeeders || false} onCheckedChange={(checked) => handleArchitectureChange('enPassageFeeders', !!checked)} />
              <Label htmlFor="enPassageFeeders" className="text-sm">En passage feeders</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Specific Complications</h4>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Navigation Complications</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="ruptureRisk" checked={complications.ruptureRisk || false} onCheckedChange={(checked) => handleComplicationChange('ruptureRisk', !!checked)} />
                <Label htmlFor="ruptureRisk" className="text-sm">Tortuosity → rupture risk</Label>
              </div>
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Reflux Complications</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="ischemia" checked={complications.ischemia || false} onCheckedChange={(checked) => handleComplicationChange('ischemia', !!checked)} />
                <Label htmlFor="ischemia" className="text-sm">Risk of ischemia</Label>
              </div>
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Delayed Complications</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="hemorrhage" checked={complications.hemorrhage || false} onCheckedChange={(checked) => handleComplicationChange('hemorrhage', !!checked)} />
                <Label htmlFor="hemorrhage" className="text-sm">Delayed hemorrhage</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};