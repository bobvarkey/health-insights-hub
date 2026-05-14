import { procedures } from '@/data/procedures';
import { cn } from '@/lib/utils';
import { Activity, Brain, GitBranch, Waves, Network, ShieldAlert, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ProcedureSearch } from './ProcedureSearch';

const iconMap: Record<string, React.ElementType> = {
  Activity, Brain, GitBranch, Waves, Network, ShieldAlert,
};

interface ProcedureNavProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export const ProcedureNav = ({ activeId, onSelect }: ProcedureNavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (id: string) => {
    onSelect(id);
    setMobileOpen(false);
  };

  const NavItems = () => (
    <>
      {procedures.map((proc) => {
        const Icon = iconMap[proc.icon] || Activity;
        const isActive = activeId === proc.id;
        return (
          <button
            key={proc.id}
            onClick={() => handleSelect(proc.id)}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm transition-all",
              isActive
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{proc.shortTitle}</span>
            <span className={cn(
              "ml-auto text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0",
              isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {proc.steps.length}
            </span>
          </button>
        );
      })}
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm text-foreground">NeuroIR Checklists</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5 rounded-lg hover:bg-accent">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-[52px] left-0 right-0 bottom-0 z-40">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setMobileOpen(false)} />
          <div className="relative bg-card border-b border-border p-3 space-y-2 max-h-[70vh] overflow-y-auto">
            <ProcedureSearch onNavigate={handleSelect} />
            <NavItems />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border overflow-y-auto">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <div>
              <h1 className="font-bold text-sm text-foreground">NeuroIR Checklists</h1>
              <p className="text-[10px] text-muted-foreground">Interventional Neuroradiology</p>
            </div>
          </div>
        </div>
        <div className="p-3 border-b border-border">
          <ProcedureSearch onNavigate={handleSelect} />
        </div>
        <nav className="p-3 space-y-1">
          <NavItems />
        </nav>
      </aside>
    </>
  );
};
