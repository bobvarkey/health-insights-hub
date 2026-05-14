import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export const AnalysisChecklist = () => {
  const [status, setStatus] = useState<string>('');
  const [location, setLocation] = useState<{[key: string]: boolean}>({});
  const [imaging, setImaging] = useState<{[key: string]: boolean}>({});

  const handleLocationChange = (key: string, checked: boolean) => {
    setLocation(prev => ({ ...prev, [key]: checked }));
  };

  const handleImagingChange = (key: string, checked: boolean) => {
    setImaging(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Analysis – Description Checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Status</h4>
          <RadioGroup value={status} onValueChange={setStatus} className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ruptured" id="ruptured" />
              <Label htmlFor="ruptured" className="text-sm">Ruptured</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unruptured" id="unruptured" />
              <Label htmlFor="unruptured" className="text-sm">Unruptured</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Location Characteristics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3">
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground">Depth</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="deep" checked={location.deep || false} onCheckedChange={(checked) => handleLocationChange('deep', !!checked)} />
                <Label htmlFor="deep" className="text-sm">Deep</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="superficial" checked={location.superficial || false} onCheckedChange={(checked) => handleLocationChange('superficial', !!checked)} />
                <Label htmlFor="superficial" className="text-sm">Superficial</Label>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground">Anatomical</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="supratentorial" checked={location.supratentorial || false} onCheckedChange={(checked) => handleLocationChange('supratentorial', !!checked)} />
                <Label htmlFor="supratentorial" className="text-sm">Supratentorial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="infratentorial" checked={location.infratentorial || false} onCheckedChange={(checked) => handleLocationChange('infratentorial', !!checked)} />
                <Label htmlFor="infratentorial" className="text-sm">Infratentorial</Label>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3">
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground">Eloquence</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="eloquent" checked={location.eloquent || false} onCheckedChange={(checked) => handleLocationChange('eloquent', !!checked)} />
                <Label htmlFor="eloquent" className="text-sm">Eloquent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="noneloquent" checked={location.noneloquent || false} onCheckedChange={(checked) => handleLocationChange('noneloquent', !!checked)} />
                <Label htmlFor="noneloquent" className="text-sm">Non-eloquent</Label>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground">Size Assessment</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="size" checked={location.size || false} onCheckedChange={(checked) => handleLocationChange('size', !!checked)} />
                <Label htmlFor="size" className="text-sm">Size documented</Label>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Imaging Studies</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3">
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground">MRI</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="t2star" checked={imaging.t2star || false} onCheckedChange={(checked) => handleImagingChange('t2star', !!checked)} />
                <Label htmlFor="t2star" className="text-sm">T2*</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="swi" checked={imaging.swi || false} onCheckedChange={(checked) => handleImagingChange('swi', !!checked)} />
                <Label htmlFor="swi" className="text-sm">SWI (hemosiderin)</Label>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h5 className="text-xs sm:text-sm font-medium text-muted-foreground">DSA</h5>
              <div className="flex items-center space-x-2">
                <Checkbox id="2d" checked={imaging['2d'] || false} onCheckedChange={(checked) => handleImagingChange('2d', !!checked)} />
                <Label htmlFor="2d" className="text-sm">2D</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="3d" checked={imaging['3d'] || false} onCheckedChange={(checked) => handleImagingChange('3d', !!checked)} />
                <Label htmlFor="3d" className="text-sm">3D</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="4d" checked={imaging['4d'] || false} onCheckedChange={(checked) => handleImagingChange('4d', !!checked)} />
                <Label htmlFor="4d" className="text-sm">4D</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="6d" checked={imaging['6d'] || false} onCheckedChange={(checked) => handleImagingChange('6d', !!checked)} />
                <Label htmlFor="6d" className="text-sm">6D (René Chapot)</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};