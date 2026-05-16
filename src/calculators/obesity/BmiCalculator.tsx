import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Scale, Calculator, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ETHNICITY_GUIDELINES,
  getBmiCategory,
  getTreatmentGuidelines,
  EthnicityType,
} from "./obesity-guidelines";

const bmiSchema = z.object({
  height: z.coerce.number().min(100).max(250).describe("Height in cm"),
  weight: z.coerce.number().min(30).max(300).describe("Weight in kg"),
  ethnicity: z.enum(["standard", "asian-pacific", "indian"] as const),
});

type BmiFormData = z.infer<typeof bmiSchema>;

interface BmiResult {
  bmi: number;
  category: string;
  color: string;
  ethnicityName: string;
}

export default function BmiCalculator() {
  const [result, setResult] = useState<BmiResult | null>(null);
  const [showTreatment, setShowTreatment] = useState(false);
  const [treatmentData, setTreatmentData] = useState<ReturnType<typeof getTreatmentGuidelines>>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BmiFormData>({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      ethnicity: "standard",
    },
  });

  const selectedEthnicity = watch("ethnicity") || "standard";

  const onSubmit = (data: BmiFormData) => {
    const heightM = data.height / 100;
    const bmi = data.weight / (heightM * heightM);
    const roundedBmi = Math.round(bmi * 10) / 10;

    const category = getBmiCategory(roundedBmi, data.ethnicity);
    const guideline = ETHNICITY_GUIDELINES.find((g) => g.id === data.ethnicity);

    const treatment = getTreatmentGuidelines(roundedBmi, data.ethnicity);

    setResult({
      bmi: roundedBmi,
      category: category.label,
      color: category.color,
      ethnicityName: guideline?.name || "Standard WHO",
    });
    setTreatmentData(treatment);
    setShowTreatment(false);
  };

  const reset = () => {
    setResult(null);
    setTreatmentData(null);
    setShowTreatment(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 px-6 py-5">
        <div className="flex items-center gap-2">
          <Scale className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">BMI Calculator</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Body Mass Index with ethnicity-specific thresholds
        </p>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8">
        <Card className="clinical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5" />
              Enter Measurements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Ethnicity Selector */}
              <div className="space-y-2">
                <Label htmlFor="ethnicity">Ethnicity / Population Group</Label>
                <Select
                  value={selectedEthnicity}
                  onValueChange={(value: EthnicityType) => {
                    // This is handled by react-hook-form
                  }}
                  {...register("ethnicity")}
                >
                  <SelectTrigger id="ethnicity" className="bg-slate-900 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    {ETHNICITY_GUIDELINES.map((guideline) => (
                      <SelectItem
                        key={guideline.id}
                        value={guideline.id}
                        className="text-slate-100 focus:bg-slate-800 focus:text-slate-100"
                      >
                        {guideline.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {ETHNICITY_GUIDELINES.find((g) => g.id === selectedEthnicity)?.description}
                </p>
              </div>

              {/* Height Input */}
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 170"
                  className="bg-slate-900 border-slate-700"
                  {...register("height", { valueAsNumber: true })}
                />
                {errors.height && (
                  <p className="text-xs text-red-500">Please enter a valid height (100-250 cm)</p>
                )}
              </div>

              {/* Weight Input */}
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  className="bg-slate-900 border-slate-700"
                  {...register("weight", { valueAsNumber: true })}
                />
                {errors.weight && (
                  <p className="text-xs text-red-500">Please enter a valid weight (30-300 kg)</p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Calculate BMI
                </Button>
                <Button type="button" variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </form>

            {/* Result Display */}
            {result && (
              <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-border bg-card/50 p-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Body Mass Index</p>
                    <p className="text-5xl font-bold text-primary">{result.bmi}</p>
                    <p className={`mt-2 text-lg font-medium ${result.color}`}>
                      {result.category}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Using {result.ethnicityName} guidelines
                    </p>
                  </div>
                </div>

                {/* Treatment Recommendations Toggle */}
                {treatmentData && (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between"
                      onClick={() => setShowTreatment(!showTreatment)}
                    >
                      <span className="flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Treatment Recommendations
                      </span>
                      {showTreatment ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>

                    {showTreatment && (
                      <Alert className="border-amber-500/50 bg-amber-500/10">
                        <AlertDescription className="space-y-3">
                          <p className="font-medium">Recommended Actions:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            {treatmentData.recommendations.map((rec, i) => (
                              <li key={i} className="text-sm">{rec}</li>
                            ))}
                          </ul>

                          {treatmentData.medications && treatmentData.medications.length > 0 && (
                            <>
                              <p className="font-medium mt-4">Consider Pharmacotherapy:</p>
                              <ul className="list-disc pl-4 space-y-1">
                                {treatmentData.medications.map((med, i) => (
                                  <li key={i} className="text-sm">{med}</li>
                                ))}
                              </ul>
                            </>
                          )}

                          {treatmentData.surgeryConsideration && (
                            <div className="mt-4 p-3 rounded bg-red-500/20 border border-red-500/30">
                              <p className="text-sm font-medium text-red-400">
                                Consider bariatric surgery referral based on current BMI
                              </p>
                            </div>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
