import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export const SpetzlerMartinClassification = () => {
  const [size, setSize] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [drainage, setDrainage] = useState<string>('');

  const calculateScore = () => {
    let score = 0;
    if (size === 'small') score += 1;
    if (size === 'medium') score += 2;
    if (size === 'large') score += 3;
    if (location === 'eloquent') score += 1;
    if (drainage === 'deep') score += 1;
    return score;
  };

  const getGradeColor = (grade: number) => {
    if (grade <= 2) return 'bg-success text-success-foreground';
    if (grade <= 4) return 'bg-warning text-warning-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  const getRiskLevel = (grade: number) => {
    if (grade <= 2) return 'Low Risk';
    if (grade <= 4) return 'Moderate Risk';
    return 'High Risk';
  };

  const totalScore = calculateScore();

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base sm:text-lg">
          Spetzler-Martin Neurosurgical Classification
          <Badge className={getGradeColor(totalScore)}>
            Grade {totalScore} - {getRiskLevel(totalScore)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Size of AVM</h4>
          <RadioGroup value={size} onValueChange={setSize} className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="small" />
              <Label htmlFor="small" className="text-sm">Small (&lt;3 cm) - 1 point</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="text-sm">Medium (3–6 cm) - 2 points</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large" />
              <Label htmlFor="large" className="text-sm">Large (&gt;6 cm) - 3 points</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Location</h4>
          <RadioGroup value={location} onValueChange={setLocation} className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="noneloquent" id="noneloquent" />
              <Label htmlFor="noneloquent" className="text-sm">Noneloquent site - 0 points</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="eloquent" id="eloquent" />
              <Label htmlFor="eloquent" className="text-sm">Eloquent site - 1 point</Label>
            </div>
          </RadioGroup>
          <div className="mt-2 p-2.5 sm:p-3 bg-accent rounded-md">
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong>Eloquent areas include:</strong> Sensorimotor cortex, Language, Vision, 
              Corpus callosum, Thalamus, Deep cerebellar nuclei, Brainstem
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Pattern of Venous Drainage</h4>
          <RadioGroup value={drainage} onValueChange={setDrainage} className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="superficial" id="superficial" />
              <Label htmlFor="superficial" className="text-sm">Superficial only - 0 points</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="deep" id="deep" />
              <Label htmlFor="deep" className="text-sm">Deep component - 1 point</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};