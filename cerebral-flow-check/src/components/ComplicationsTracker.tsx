import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { ChecklistItem } from "./ChecklistItem";
import { Progress } from "@/components/ui/progress";

const complications = [
  {
    category: "Neurological",
    items: [
      "ICH - symptomatic (if NIHSS score increase ≥4 or ≥2 in a subcategory of NIHSS)",
      "SAH (if present and there is an NIHSS score increase ≥4)",
    ]
  },
  {
    category: "Vascular",
    items: [
      "Vessel perforation (involving a target or conduit artery)",
      "Vasospasm requiring pharmacological or interventional treatment",
      "Distal embolisation (at least one MeVO occurs after MT)",
      "Emboli to new territory (ENT)",
      "Iatrogenic dissection",
      "Symptomatic re-occlusion of tandem lesions",
    ]
  },
  {
    category: "Access Site",
    items: [
      "Acute access site arterial complications (dissection/occlusion/pseudoaneurysm/closure device failure)",
      "Clinically relevant haematoma formation",
      "Groin or neck hematoma (in case of direct Carotid puncture)",
      "Pseudoaneurysm at puncture site",
    ]
  },
  {
    category: "Other",
    items: [
      "All allergic contrast reactions",
      "Contrast staining post-MT",
      "Contrast reaction/allergy",
      "Contrast induced kidney injury",
    ]
  }
];

const emergencySteps = [
  "Inflate balloon",
  "Lower BP",
  "Give protamine reversal",
  "Keep balloon inflated for upto 45-60 minutes",
  "Coil, coil, coil",
  "Glue",
  "Parent vessel occlusion",
  "Stent graft placement",
];

export function ComplicationsTracker() {
  const [selectedComplications, setSelectedComplications] = useState<Record<string, boolean>>({});
  const [complicationNotes, setComplicationNotes] = useState<Record<string, string>>({});
  const [emergencyCheckedItems, setEmergencyCheckedItems] = useState<Record<string, boolean>>({});

  const handleComplicationChange = (complication: string, checked: boolean) => {
    setSelectedComplications(prev => ({ ...prev, [complication]: checked }));
  };

  const handleNotesChange = (complication: string, notes: string) => {
    setComplicationNotes(prev => ({ ...prev, [complication]: notes }));
  };

  const handleEmergencyItemChange = (index: number, checked: boolean) => {
    setEmergencyCheckedItems(prev => ({ ...prev, [index]: checked }));
  };

  const totalEmergencyItems = emergencySteps.length;
  const checkedEmergencyItems = Object.values(emergencyCheckedItems).filter(Boolean).length;
  const emergencyProgress = (checkedEmergencyItems / totalEmergencyItems) * 100;

  const hasComplications = Object.values(selectedComplications).some(Boolean);

  return (
    <div className="space-y-6">
      <Card>
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Complications Documentation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {hasComplications && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Complications have been documented. Please ensure immediate appropriate management and documentation.
            </AlertDescription>
          </Alert>
        )}

        {complications.map((category) => (
          <div key={category.category} className="space-y-3">
            <h3 className="font-semibold text-foreground border-b border-border pb-1">
              {category.category} Complications
            </h3>
            <div className="space-y-3">
              {category.items.map((item) => (
                <div key={item} className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={item}
                      checked={selectedComplications[item] || false}
                      onCheckedChange={(checked) => handleComplicationChange(item, checked as boolean)}
                      className="mt-0.5 data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
                    />
                    <Label htmlFor={item} className="text-sm leading-relaxed cursor-pointer">
                      {item}
                    </Label>
                  </div>
                  {selectedComplications[item] && (
                    <div className="ml-6">
                      <Textarea
                        placeholder="Describe the complication, severity, and management..."
                        value={complicationNotes[item] || ""}
                        onChange={(e) => handleNotesChange(item, e.target.value)}
                        className="min-h-[80px] border-destructive/20"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {!hasComplications && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No complications documented</p>
            <p className="text-sm">Check any complications that occurred during the procedure</p>
          </div>
        )}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-destructive flex items-center justify-between">
          Emergency Steps - Intra-procedural Rupture
          <span className="text-sm font-normal text-muted-foreground">
            {checkedEmergencyItems}/{totalEmergencyItems} completed
          </span>
        </CardTitle>
        <Progress value={emergencyProgress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-2">
        {emergencySteps.map((item, index) => (
          <ChecklistItem
            key={index}
            id={`emergency-${index}`}
            label={`${index + 1}. ${item}`}
            checked={emergencyCheckedItems[index] || false}
            onChange={(checked) => handleEmergencyItemChange(index, checked)}
          />
        ))}
      </CardContent>
    </Card>
    </div>
  );
}