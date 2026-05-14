import { useState, useMemo } from 'react';
import { procedures } from '@/data/procedures';
import { Search, X, Activity, Brain, GitBranch, Waves, Network, ShieldAlert } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Activity, Brain, GitBranch, Waves, Network, ShieldAlert,
};

interface SearchResult {
  procedureId: string;
  procedureTitle: string;
  procedureIcon: string;
  stepIndex: number;
  title: string;
  description: string;
}

interface ProcedureSearchProps {
  onNavigate: (procedureId: string) => void;
}

export const ProcedureSearch = ({ onNavigate }: ProcedureSearchProps) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return procedures.flatMap(proc =>
      proc.steps
        .map((step, i) => ({
          procedureId: proc.id,
          procedureTitle: proc.shortTitle,
          procedureIcon: proc.icon,
          stepIndex: i,
          title: step.title,
          description: step.description,
        }))
        .filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
    );
  }, [query]);

  const handleSelect = (procedureId: string) => {
    onNavigate(procedureId);
    setQuery('');
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search steps…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className="pl-9 pr-8 h-9 text-sm bg-background"
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false); }} className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {open && query.length >= 2 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-card border border-border rounded-lg shadow-lg max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground text-center">No steps found</p>
            ) : (
              <div className="p-1">
                <p className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                {results.map((r, i) => {
                  const Icon = iconMap[r.procedureIcon] || Activity;
                  return (
                    <button
                      key={`${r.procedureId}-${r.stepIndex}-${i}`}
                      onClick={() => handleSelect(r.procedureId)}
                      className="w-full text-left px-3 py-2.5 rounded-md hover:bg-accent transition-colors flex items-start gap-3"
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5",
                        "bg-primary/10 text-primary"
                      )}>
                        {r.stepIndex + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{r.description}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Icon className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">{r.procedureTitle}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
