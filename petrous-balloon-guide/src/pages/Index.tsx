import { useState } from 'react';
import { ProcedureNav } from '@/components/ProcedureNav';
import { ProcedureChecklist } from '@/components/ProcedureChecklist';
import { procedures } from '@/data/procedures';
import { Activity, Brain, GitBranch, Waves, Network, ShieldAlert } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Activity, Brain, GitBranch, Waves, Network, ShieldAlert,
};

const Index = () => {
  const [activeId, setActiveId] = useState(procedures[0].id);
  const activeProcedure = procedures.find(p => p.id === activeId) || procedures[0];
  const Icon = iconMap[activeProcedure.icon] || Activity;

  return (
    <div className="min-h-screen bg-background">
      <ProcedureNav activeId={activeId} onSelect={setActiveId} />

      {/* Main content */}
      <main className="pt-[52px] lg:pt-0 lg:ml-64">
        {/* Header */}
        <div className="bg-medical-gradient text-primary-foreground py-6 px-4 sm:py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
              <h1 className="text-xl sm:text-3xl font-bold">{activeProcedure.title}</h1>
            </div>
            <p className="text-primary-foreground/80 text-sm sm:text-base">
              {activeProcedure.category} • {activeProcedure.steps.length} steps
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
          <ProcedureChecklist key={activeId} procedure={activeProcedure} />
        </div>
      </main>
    </div>
  );
};

export default Index;
