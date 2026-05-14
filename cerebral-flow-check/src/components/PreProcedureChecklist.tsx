import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChecklistItem } from "./ChecklistItem";
import { Progress } from "@/components/ui/progress";

const checklistItems = [
  "Post case in Cath lab",
  "NPO except medications for 6 h prior to the procedure",
  "Place 1 peripheral IV (2 if an intervention is anticipated)",
  "Place foley catheter (only if an intervention is anticipated)",
  "Send Serology (HIV, HBsAg, HCV)",
  "Hb, Platelets, PT and Creatinine",
  "Urine pregnancy test for Women of childbearing age",
  "Nephrology opinion if renal dysfunction",
  "Groin shaving b/l",
  "Right radial hand shaving",
  "Pre carotid stenting Transcranial doppler",
  "IV fluids overnight 1L NS",
  "Informed consent",
  "PAC",
  "Inform Cath lab technician",
  "Pre op Checklist – Interventional Pause",
  "Loading with 300 mg of Clopidogrel (4 tabs) and 300 mg of Ecosprin",
  "Mark distal pulses",
  "Check materials; Diagnostic [100 cm length], guiding catheters, wires, micro catheters and wires",
  "Check if meds are available- Nimodipine, Tirofiban, Heparin, Tenecteplase, Atropine, NTG",
  "Vascular closure device",
  "Visipaque contrast if renal dysfunction",
  "Femoral sheath angiogram before sheath removal",
];

const radialAccessItems = [
  "USG assessment of RA size",
  "Pulse oximeter on thumb",
  "Use direct sheath for carotid stenting for 7 Fr stent",
  "Check ulnar artery patency",
  "RA angiogram for anatomy before putting guidewire",
  "Radial spasm treatment",
];

export function PreProcedureChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [radialCheckedItems, setRadialCheckedItems] = useState<Record<string, boolean>>({});

  const handleItemChange = (index: number, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [index]: checked }));
  };

  const handleRadialItemChange = (index: number, checked: boolean) => {
    setRadialCheckedItems(prev => ({ ...prev, [index]: checked }));
  };

  const totalMainItems = checklistItems.length;
  const checkedMainItems = Object.values(checkedItems).filter(Boolean).length;
  const mainProgress = (checkedMainItems / totalMainItems) * 100;

  const totalRadialItems = radialAccessItems.length;
  const checkedRadialItems = Object.values(radialCheckedItems).filter(Boolean).length;
  const radialProgress = (checkedRadialItems / totalRadialItems) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary flex items-center justify-between">
            Pre-Procedure Checklist
            <span className="text-sm font-normal text-muted-foreground">
              {checkedMainItems}/{totalMainItems} completed
            </span>
          </CardTitle>
          <Progress value={mainProgress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-2">
          {checklistItems.map((item, index) => (
            <ChecklistItem
              key={index}
              id={`main-${index}`}
              label={`${index + 1}. ${item}`}
              checked={checkedItems[index] || false}
              onChange={(checked) => handleItemChange(index, checked)}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-accent flex items-center justify-between">
            Radial Access Checklist
            <span className="text-sm font-normal text-muted-foreground">
              {checkedRadialItems}/{totalRadialItems} completed
            </span>
          </CardTitle>
          <Progress value={radialProgress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-2">
          {radialAccessItems.map((item, index) => (
            <ChecklistItem
              key={index}
              id={`radial-${index}`}
              label={`${String.fromCharCode(97 + index)}. ${item}`}
              checked={radialCheckedItems[index] || false}
              onChange={(checked) => handleRadialItemChange(index, checked)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}