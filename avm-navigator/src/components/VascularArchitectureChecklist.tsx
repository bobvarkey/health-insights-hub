import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const VascularArchitectureChecklist = () => {
  const [nidus, setNidus] = useState<{[key: string]: boolean}>({});
  const [arterial, setArterial] = useState<{[key: string]: boolean}>({});
  const [venous, setVenous] = useState<{[key: string]: boolean}>({});
  const [counts, setCounts] = useState<{[key: string]: string}>({});

  const handleNidusChange = (key: string, checked: boolean) => {
    setNidus(prev => ({ ...prev, [key]: checked }));
  };

  const handleArterialChange = (key: string, checked: boolean) => {
    setArterial(prev => ({ ...prev, [key]: checked }));
  };

  const handleVenousChange = (key: string, checked: boolean) => {
    setVenous(prev => ({ ...prev, [key]: checked }));
  };

  const handleCountChange = (key: string, value: string) => {
    setCounts(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Analysis – Vascular Architecture Checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Nidus Characteristics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="compact" checked={nidus.compact || false} onCheckedChange={(checked) => handleNidusChange('compact', !!checked)} />
                <Label htmlFor="compact" className="text-sm">Compact</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="diffuse" checked={nidus.diffuse || false} onCheckedChange={(checked) => handleNidusChange('diffuse', !!checked)} />
                <Label htmlFor="diffuse" className="text-sm">Diffuse</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="intranidal" checked={nidus.intranidal || false} onCheckedChange={(checked) => handleNidusChange('intranidal', !!checked)} />
                <Label htmlFor="intranidal" className="text-sm">Intranidal aneurysm</Label>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="compartmentalized" checked={nidus.compartmentalized || false} onCheckedChange={(checked) => handleNidusChange('compartmentalized', !!checked)} />
                <Label htmlFor="compartmentalized" className="text-sm">Compartmentalized</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="directFistulas" checked={nidus.directFistulas || false} onCheckedChange={(checked) => handleNidusChange('directFistulas', !!checked)} />
                <Label htmlFor="directFistulas" className="text-sm">Direct fistulas</Label>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Arterial Feeders</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3">
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground">Types</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="cortical" checked={arterial.cortical || false} onCheckedChange={(checked) => handleArterialChange('cortical', !!checked)} />
                <Label htmlFor="cortical" className="text-sm">Cortical / leptomeningeal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dural" checked={arterial.dural || false} onCheckedChange={(checked) => handleArterialChange('dural', !!checked)} />
                <Label htmlFor="dural" className="text-sm">Dural</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="perforating" checked={arterial.perforating || false} onCheckedChange={(checked) => handleArterialChange('perforating', !!checked)} />
                <Label htmlFor="perforating" className="text-sm">Perforating arteries</Label>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground">Connection</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="directFeeder" checked={arterial.directFeeder || false} onCheckedChange={(checked) => handleArterialChange('directFeeder', !!checked)} />
                <Label htmlFor="directFeeder" className="text-sm">Direct</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="indirectFeeder" checked={arterial.indirectFeeder || false} onCheckedChange={(checked) => handleArterialChange('indirectFeeder', !!checked)} />
                <Label htmlFor="indirectFeeder" className="text-sm">Indirect</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="enPassage" checked={arterial.enPassage || false} onCheckedChange={(checked) => handleArterialChange('enPassage', !!checked)} />
                <Label htmlFor="enPassage" className="text-sm">En passage</Label>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="feederNumber" className="text-sm">Number of feeders</Label>
              <Input id="feederNumber" value={counts.feederNumber || ''} onChange={(e) => handleCountChange('feederNumber', e.target.value)} placeholder="Enter number" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="feederSize" className="text-sm">Size assessment</Label>
              <Input id="feederSize" value={counts.feederSize || ''} onChange={(e) => handleCountChange('feederSize', e.target.value)} placeholder="e.g., small, medium, large" className="mt-1" />
            </div>
          </div>

          <div className="mt-2 sm:mt-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="flowAneurysms" checked={arterial.flowAneurysms || false} onCheckedChange={(checked) => handleArterialChange('flowAneurysms', !!checked)} />
              <Label htmlFor="flowAneurysms" className="text-sm">Flow-related aneurysms</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Venous Drainage</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="deepDrainage" checked={venous.deepDrainage || false} onCheckedChange={(checked) => handleVenousChange('deepDrainage', !!checked)} />
                <Label htmlFor="deepDrainage" className="text-sm">Deep drainage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="superficialDrainage" checked={venous.superficialDrainage || false} onCheckedChange={(checked) => handleVenousChange('superficialDrainage', !!checked)} />
                <Label htmlFor="superficialDrainage" className="text-sm">Superficial drainage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="stenosis" checked={venous.stenosis || false} onCheckedChange={(checked) => handleVenousChange('stenosis', !!checked)} />
                <Label htmlFor="stenosis" className="text-sm">Stenosis</Label>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="ectasia" checked={venous.ectasia || false} onCheckedChange={(checked) => handleVenousChange('ectasia', !!checked)} />
                <Label htmlFor="ectasia" className="text-sm">Ectasia</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="perinidal" checked={venous.perinidal || false} onCheckedChange={(checked) => handleVenousChange('perinidal', !!checked)} />
                <Label htmlFor="perinidal" className="text-sm">Perinidal angiogenesis</Label>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-4">
            <Label htmlFor="drainingVeins" className="text-sm">Number of draining veins</Label>
            <Input id="drainingVeins" value={counts.drainingVeins || ''} onChange={(e) => handleCountChange('drainingVeins', e.target.value)} placeholder="Enter number" className="mt-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};