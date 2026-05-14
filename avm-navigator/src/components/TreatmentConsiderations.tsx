import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TreatmentConsiderations = () => {
  const [treatment, setTreatment] = useState<{[key: string]: boolean}>({});
  const [approach, setApproach] = useState<string>('');
  const [sessions, setSessions] = useState<string>('');
  const [route, setRoute] = useState<string>('');
  const [catheter, setCatheter] = useState<{[key: string]: boolean}>({});
  const [agent, setAgent] = useState<{[key: string]: boolean}>({});

  const handleTreatmentChange = (key: string, checked: boolean) => {
    setTreatment(prev => ({ ...prev, [key]: checked }));
  };

  const handleCatheterChange = (key: string, checked: boolean) => {
    setCatheter(prev => ({ ...prev, [key]: checked }));
  };

  const handleAgentChange = (key: string, checked: boolean) => {
    setAgent(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">When Endovascular Treatment is Considered</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
          <div className="p-3 sm:p-4 bg-accent rounded-lg">
            <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Goal: Complete cure of the AVM</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Balance benefit vs risk through careful planning and technique selection
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Treatment Approach</h4>
            <RadioGroup value={approach} onValueChange={setApproach} className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="embolization" id="embolization" />
                <Label htmlFor="embolization" className="text-sm">Embolization alone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="combination" id="combination" />
                <Label htmlFor="combination" className="text-sm">Combination with surgery/radiosurgery</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Key Considerations</h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h5 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Session Planning</h5>
                <RadioGroup value={sessions} onValueChange={setSessions} className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single" className="text-sm">One session</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="staged" id="staged" />
                    <Label htmlFor="staged" className="text-sm">Staged sessions</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h5 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Access Route</h5>
                <RadioGroup value={route} onValueChange={setRoute} className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="arterial" id="arterial" />
                    <Label htmlFor="arterial" className="text-sm">Arterial route</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="venous" id="venous" />
                    <Label htmlFor="venous" className="text-sm">Venous route</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Role of Anatomy</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="p-3 sm:p-4 bg-accent rounded-lg">
              <h4 className="font-semibold text-sm sm:text-base">Route Selection</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Arterial vs Venous</p>
            </div>
            <div className="p-3 sm:p-4 bg-accent rounded-lg">
              <h4 className="font-semibold text-sm sm:text-base">Catheter Type</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Flow-directed vs Standard</p>
            </div>
            <div className="p-3 sm:p-4 bg-accent rounded-lg">
              <h4 className="font-semibold text-sm sm:text-base">Embolic Agent</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Adhesive vs Non-adhesive</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="catheters" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="catheters" className="text-xs sm:text-sm">Catheter Types</TabsTrigger>
          <TabsTrigger value="agents" className="text-xs sm:text-sm">Embolic Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="catheters">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Catheter Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
              <div>
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Flow-directed Catheters (e.g., MAGIC)</h4>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="efficient" checked={catheter.efficient || false} onCheckedChange={(checked) => handleCatheterChange('efficient', !!checked)} />
                    <Label htmlFor="efficient" className="text-sm">Very efficient navigation in small/tortuous vessels</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="glueCompatible" checked={catheter.glueCompatible || false} onCheckedChange={(checked) => handleCatheterChange('glueCompatible', !!checked)} />
                    <Label htmlFor="glueCompatible" className="text-sm">Best for glue-based embolization</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="glucoseFlushing" checked={catheter.glucoseFlushing || false} onCheckedChange={(checked) => handleCatheterChange('glucoseFlushing', !!checked)} />
                    <Label htmlFor="glucoseFlushing" className="text-sm">Uses glucose flushing</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <h5 className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Detachable Tip</h5>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="guidewire" checked={catheter.guidewire || false} onCheckedChange={(checked) => handleCatheterChange('guidewire', !!checked)} />
                      <Label htmlFor="guidewire" className="text-sm">Allows guidewire use</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dmsoCompatible" checked={catheter.dmsoCompatible || false} onCheckedChange={(checked) => handleCatheterChange('dmsoCompatible', !!checked)} />
                      <Label htmlFor="dmsoCompatible" className="text-sm">DMSO-compatible</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Variants</h5>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nonDetachable" checked={catheter.nonDetachable || false} onCheckedChange={(checked) => handleCatheterChange('nonDetachable', !!checked)} />
                      <Label htmlFor="nonDetachable" className="text-sm">Non-detachable tip</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="balloon" checked={catheter.balloon || false} onCheckedChange={(checked) => handleCatheterChange('balloon', !!checked)} />
                      <Label htmlFor="balloon" className="text-sm">Balloon / mini-balloon</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-success text-base sm:text-lg">Adhesive Glue (Histo-acryl, Glubran, Trufill)</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-success mb-1.5 sm:mb-2 text-sm sm:text-base">Pros</h4>
                    <ul className="space-y-1 text-xs sm:text-sm">
                      <li>• Polymerization, adhesive</li>
                      <li>• Strong sticking ability</li>
                      <li>• Produces inflammatory reaction</li>
                      <li>• Injectable via small flow-guided catheters (Magic 1.2)</li>
                      <li>• Relatively inexpensive</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-destructive mb-1.5 sm:mb-2 text-sm sm:text-base">Cons</h4>
                    <ul className="space-y-1 text-xs sm:text-sm">
                      <li>• Limited for large volume or prolonged injections</li>
                      <li>• Risk persists even with dilution or detachable catheters</li>
                      <li>• Control is difficult (arterial flow & dilution balance)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-primary text-base sm:text-lg">Non-Adhesive Liquid Embolic Agents</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-success mb-1.5 sm:mb-2 text-sm sm:text-base">Pros</h4>
                    <ul className="space-y-1 text-xs sm:text-sm">
                      <li>• Precipitation (DMSO-based) → do not stick</li>
                      <li>• Allows large volume, long-lasting injections</li>
                      <li>• More time for injection planning</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-destructive mb-1.5 sm:mb-2 text-sm sm:text-base">Cons</h4>
                    <ul className="space-y-1 text-xs sm:text-sm">
                      <li>• No inflammatory reaction</li>
                      <li>• Risk of DMSO toxicity</li>
                      <li>• Requires DMSO-compatible catheters</li>
                      <li>• Expensive</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};