import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, User, Wrench, Syringe, ShieldAlert, CheckCircle2, Stethoscope } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

// Device table rows
const deviceRows = [
  "Sheath", "Guiding Catheter", "Intermediate Catheter",
  "Microcatheter (Primary)", "Microcatheter (Secondary)",
  "Wire (Guide / Exchange)", "Coil Size(s)", "Stent / Flow Diverter", "Balloon (if used)"
];

// Procedure checklists
const procedures: Record<string, { title: string; items: string[] }> = {
  simpleCoiling: {
    title: "A. Simple Coiling",
    items: [
      "Pressure bags: 1 Nemo Hepsaline + 2 Hepsaline (3 total)",
      "Single Y connectors: 2",
      "3-way connector: 1",
      "Intermediate catheter: 0.058 in (Catalyst 5)",
      "Microcatheter: 0.017 (SL-10)",
    ],
  },
  stentAssisted: {
    title: "B. Stent-Assisted Coiling",
    items: [
      "Pressure bags: 4 total",
      "Single Y connectors: 2",
      "Double Y connector: 1",
      "3-way connector: 1",
      "Intermediate catheter: 0.071 in (Vecta 71)",
      "Microcatheter: SL-10 ×2",
    ],
  },
  balloonAssisted: {
    title: "C. Balloon-Assisted Coiling",
    items: [
      "Pressure bags: 3 total",
      "Single Y connectors: 2",
      "Double Y connector: 1",
      "3-way connector: 1",
      "Intermediate catheter: 0.071 in",
      "Microcatheter: SL-10",
      "Balloon catheter: Transform",
    ],
  },
  flowDiverter: {
    title: "D. Flow Diverter",
    items: [
      "Pressure bags: 3 total",
      "Single Y connectors: 2",
      "3-way connector: 1",
      "Intermediate catheter: 0.058 in",
      "Microcatheter: 0.027 (XT-27)",
    ],
  },
  flowDiverterCoiling: {
    title: "E. Flow Diverter + Coiling",
    items: [
      "Pressure bags: 4 total",
      "Single Y connectors: 2",
      "Double Y connector: 1",
      "3-way connector: 1",
      "Intermediate catheter: 0.071 in",
      "Microcatheter: XT-27 (FD)",
      "Microcatheter: SL-10 (coiling)",
    ],
  },
};

const sheathItems = [
  "Short sheath: 4F / 5F / 8F",
  "Long sheath: 0.091 in (Infinity LS Plus, 80–90 cm)",
];

const accessoryItems = [
  "Guide wire",
  "Exchange wire (Amplatz stiff wire)",
  "Guiding catheter: 4F / 5F",
  "Long sheath: Infinity LS Plus (80/90 cm)",
  "Intermediate catheter: Catalyst 5 / Vecta 71 (115 cm)",
  "Microcatheter: Excelsior SL-10 (coiling)",
  "Microcatheter: XT-27 (flow diverter)",
];

const anticoagPre = [
  "Loading dose given (Dual antiplatelet if indicated)",
  "Baseline ACT obtained",
  "Platelet function testing (if applicable)",
];

const anticoagIntra = [
  "Heparin bolus administered",
  "Target ACT: 250–300 sec or 300–350 sec",
  "ACT monitoring interval set",
  "Additional heparin doses documented",
];

const anticoagPost = [
  "Heparin continuation / reversal planned",
  "Dual antiplatelet continuation",
  "ICU monitoring orders placed",
];

const ruptureKit = [
  "Reversal agents ready (Protamine)",
  "Additional coils available (various sizes)",
  "Balloon catheter ready for tamponade",
  "Rapid microcatheter access maintained",
  "Suction setup ready",
];

const thromboembolic = [
  "Glycoprotein IIb/IIIa inhibitors ready",
  "Aspiration system available",
  "Additional guidewire access ready",
];

const deviceComplications = [
  "Snare device available",
  "Exchange-length wire ready",
  "Backup microcatheter available",
];

const generalEmergency = [
  "Crash cart checked",
  "Airway equipment ready",
  "Anesthesia team alerted",
  "Blood products available",
];

const finalVerification = [
  "Patient identity confirmed",
  "Procedure confirmed",
  "Site and access confirmed",
  "Devices checked and flushed",
  "Anticoagulation initiated",
  "Imaging reviewed",
];

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="text-primary flex items-center justify-between text-sm sm:text-base">
              <span className="flex items-center gap-2">{icon}{title}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function CheckGroup({ items, checked, onChange, prefix }: {
  items: string[];
  checked: Record<string, boolean>;
  onChange: (key: string, val: boolean) => void;
  prefix: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const key = `${prefix}-${i}`;
        return (
          <div key={key} className="flex items-start space-x-3 py-1.5">
            <Checkbox
              id={key}
              checked={checked[key] || false}
              onCheckedChange={(v) => onChange(key, !!v)}
              className="mt-0.5 data-[state=checked]:bg-success data-[state=checked]:border-success"
            />
            <Label
              htmlFor={key}
              className={`text-xs sm:text-sm leading-relaxed cursor-pointer ${
                checked[key] ? "line-through text-muted-foreground" : "text-foreground"
              }`}
            >
              {item}
            </Label>
          </div>
        );
      })}
    </div>
  );
}

export function NeurointerventionChecklist() {
  const [patientInfo, setPatientInfo] = useState<Record<string, string>>({});
  const [deviceTable, setDeviceTable] = useState<Record<string, Record<string, string>>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handleCheck = (key: string, val: boolean) => {
    setChecked((prev) => ({ ...prev, [key]: val }));
  };

  const handleDeviceChange = (row: string, col: string, val: string) => {
    setDeviceTable((prev) => ({
      ...prev,
      [row]: { ...prev[row], [col]: val },
    }));
  };

  // Count all checkable items for progress
  const allCheckableItems = [
    ...sheathItems, ...accessoryItems,
    ...Object.values(procedures).flatMap(p => p.items),
    ...anticoagPre, ...anticoagIntra, ...anticoagPost,
    ...ruptureKit, ...thromboembolic, ...deviceComplications, ...generalEmergency,
    ...finalVerification,
  ];
  const totalItems = allCheckableItems.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  const patientFields = [
    { key: "name", label: "Patient Name" },
    { key: "ageSex", label: "Age/Sex" },
    { key: "uhid", label: "UHID" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "procedure", label: "Planned Procedure" },
    { key: "targetVessel", label: "Target Vessel" },
    { key: "aneurysmSize", label: "Aneurysm Size/Neck" },
    { key: "date", label: "Date" },
    { key: "operator", label: "Operator" },
  ];

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card>
        <CardContent className="pt-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">Overall Progress</span>
            <span className="text-xs text-muted-foreground">{checkedCount}/{totalItems}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Patient Details */}
      <CollapsibleSection title="Patient & Procedure Details" icon={<User className="h-4 w-4" />} defaultOpen>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {patientFields.map((f) => (
            <div key={f.key} className="space-y-1">
              <Label className="text-xs text-muted-foreground">{f.label}</Label>
              <Input
                value={patientInfo[f.key] || ""}
                onChange={(e) => setPatientInfo((p) => ({ ...p, [f.key]: e.target.value }))}
                className="h-8 text-sm"
                placeholder={f.label}
              />
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Device Size Customization */}
      <CollapsibleSection title="Device Size Customization" icon={<Wrench className="h-4 w-4" />}>
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs min-w-[120px]">Component</TableHead>
                <TableHead className="text-xs min-w-[100px]">Planned Size</TableHead>
                <TableHead className="text-xs min-w-[100px]">Selected Device</TableHead>
                <TableHead className="text-xs min-w-[100px]">Backup Option</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deviceRows.map((row) => (
                <TableRow key={row}>
                  <TableCell className="text-xs font-medium py-1.5">{row}</TableCell>
                  {["plannedSize", "selectedDevice", "backupOption"].map((col) => (
                    <TableCell key={col} className="py-1.5">
                      <Input
                        value={deviceTable[row]?.[col] || ""}
                        onChange={(e) => handleDeviceChange(row, col, e.target.value)}
                        className="h-7 text-xs"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CollapsibleSection>

      {/* Sheaths & Accessories */}
      <CollapsibleSection title="Sheaths & Accessories" icon={<Stethoscope className="h-4 w-4" />}>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Sheaths</h4>
            <CheckGroup items={sheathItems} checked={checked} onChange={handleCheck} prefix="sheath" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Accessories</h4>
            <CheckGroup items={accessoryItems} checked={checked} onChange={handleCheck} prefix="acc" />
          </div>
        </div>
      </CollapsibleSection>

      {/* Procedures A-E */}
      <CollapsibleSection title="Procedure-Specific Equipment" icon={<Wrench className="h-4 w-4" />}>
        <div className="space-y-4">
          {Object.entries(procedures).map(([key, proc]) => (
            <div key={key}>
              <h4 className="text-xs font-semibold text-primary mb-2">{proc.title}</h4>
              <CheckGroup items={proc.items} checked={checked} onChange={handleCheck} prefix={key} />
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Anticoagulation Protocol */}
      <CollapsibleSection title="Anticoagulation Protocol" icon={<Syringe className="h-4 w-4" />}>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Pre-Procedure</h4>
            <CheckGroup items={anticoagPre} checked={checked} onChange={handleCheck} prefix="acPre" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Intra-Procedure</h4>
            <CheckGroup items={anticoagIntra} checked={checked} onChange={handleCheck} prefix="acIntra" />
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Heparin Dose (IU)</Label>
                <Input className="h-7 text-xs" placeholder="Dose" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">ACT Monitoring Interval (min)</Label>
                <Input className="h-7 text-xs" placeholder="Interval" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Post-Procedure</h4>
            <CheckGroup items={anticoagPost} checked={checked} onChange={handleCheck} prefix="acPost" />
          </div>
        </div>
      </CollapsibleSection>

      {/* Complication Readiness */}
      <CollapsibleSection title="Complication Readiness" icon={<ShieldAlert className="h-4 w-4" />}>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-destructive mb-2">Aneurysm Rupture Kit</h4>
            <CheckGroup items={ruptureKit} checked={checked} onChange={handleCheck} prefix="rupture" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-warning mb-2">Thromboembolic Management</h4>
            <CheckGroup items={thromboembolic} checked={checked} onChange={handleCheck} prefix="thrombo" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-accent mb-2">Device-Related Complications</h4>
            <CheckGroup items={deviceComplications} checked={checked} onChange={handleCheck} prefix="devComp" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-primary mb-2">General Emergency Preparedness</h4>
            <CheckGroup items={generalEmergency} checked={checked} onChange={handleCheck} prefix="genEmg" />
          </div>
        </div>
      </CollapsibleSection>

      {/* Final Verification */}
      <CollapsibleSection title="Final Verification (Time-Out)" icon={<CheckCircle2 className="h-4 w-4" />}>
        <CheckGroup items={finalVerification} checked={checked} onChange={handleCheck} prefix="final" />
      </CollapsibleSection>
    </div>
  );
}
