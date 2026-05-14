import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const vessels = [
  "Rt CCA",
  "Rt ICA", 
  "Rt ECA",
  "Rt Vertebral",
  "Lt CCA",
  "Lt ICA",
  "Lt ECA", 
  "Lt Vertebral",
  "Other"
];

const anesthesiaOptions = ["Local Anesthesia", "Sedation", "General Anesthesia"];
const routeOptions = ["Radial", "Femoral", "Carotid", "Other"];
const closureOptions = ["Manual", "Closure Device"];

const eticiOptions = [
  "Grade 0: No perfusion (0% reperfusion)",
  "Grade 1: Reduction in thrombus but no distal filling",
  "Grade 2A: Reperfusion of 1-49% of territory",
  "Grade 2B50: Reperfusion of 50-66% of territory", 
  "Grade 2B67: Reperfusion of 67-89% of territory",
  "Grade 2C: Extensive reperfusion of 90-99% of territory",
  "Grade 3: Complete reperfusion (100%)"
];

export function AngiogramReport() {
  const [selectedVessels, setSelectedVessels] = useState<Record<string, boolean>>({});
  const [anesthesia, setAnesthesia] = useState("");
  const [usgGuidance, setUsgGuidance] = useState(false);
  const [route, setRoute] = useState("");
  const [closure, setClosure] = useState("");
  const [eticiGrade, setEticiGrade] = useState("");
  const [notes, setNotes] = useState("");

  const handleVesselChange = (vessel: string, checked: boolean) => {
    setSelectedVessels(prev => ({ ...prev, [vessel]: checked }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Angiogram Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="anesthesia">Anesthesia Type</Label>
            <Select onValueChange={setAnesthesia}>
              <SelectTrigger>
                <SelectValue placeholder="Select anesthesia type" />
              </SelectTrigger>
              <SelectContent>
                {anesthesiaOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="route">Access Route</Label>
            <Select onValueChange={setRoute}>
              <SelectTrigger>
                <SelectValue placeholder="Select access route" />
              </SelectTrigger>
              <SelectContent>
                {routeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="closure">Closure Method</Label>
            <Select onValueChange={setClosure}>
              <SelectTrigger>
                <SelectValue placeholder="Select closure method" />
              </SelectTrigger>
              <SelectContent>
                {closureOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="usg-guidance"
              checked={usgGuidance}
              onCheckedChange={(checked) => setUsgGuidance(checked as boolean)}
            />
            <Label htmlFor="usg-guidance">USG Guidance Used</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="etici-grade">eTICI Grade (Hermes 2019)</Label>
          <Select onValueChange={setEticiGrade}>
            <SelectTrigger>
              <SelectValue placeholder="Select eTICI grade" />
            </SelectTrigger>
            <SelectContent>
              {eticiOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">Vessels Studied</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {vessels.map((vessel) => (
              <div key={vessel} className="flex items-center space-x-2">
                <Checkbox
                  id={vessel}
                  checked={selectedVessels[vessel] || false}
                  onCheckedChange={(checked) => handleVesselChange(vessel, checked as boolean)}
                />
                <Label htmlFor={vessel} className="text-sm cursor-pointer">
                  {vessel}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Enter any additional findings or notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}