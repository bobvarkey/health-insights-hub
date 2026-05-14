import { gradingScales, GradingScale } from '@/data/gradingScales';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const riskColor = (risk?: string) => {
  switch (risk?.toLowerCase()) {
    case 'low':
    case 'benign':
    case 'easy': return 'bg-success/10 text-success border-success/20';
    case 'moderate': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'high':
    case 'aggressive':
    case 'difficult': return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'very high': return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'variant': return 'bg-primary/10 text-primary border-primary/20';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

interface GradingScaleCardProps {
  scale: GradingScale;
}

const GradingScaleCard = ({ scale }: GradingScaleCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="shadow-soft overflow-hidden">
      <CardHeader
        className="p-3 sm:p-4 cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <CardTitle className="text-sm sm:text-base">{scale.title}</CardTitle>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">{scale.subtitle}</p>
            </div>
          </div>
          <span className={cn(
            "text-xs transition-transform",
            expanded && "rotate-180"
          )}>▼</span>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
          {/* Images */}
          {scale.images && scale.images.length > 0 && (
            <div className="space-y-2">
              {scale.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${scale.title} reference ${i + 1}`}
                  className="w-full rounded-lg border border-border"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-2 font-semibold text-foreground">Grade</th>
                  <th className="text-left py-2 pr-2 font-semibold text-foreground">Description</th>
                  {scale.entries.some(e => e.risk) && (
                    <th className="text-left py-2 font-semibold text-foreground">Risk</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {scale.entries.map((entry, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-2 pr-2 font-medium text-foreground whitespace-nowrap align-top">{entry.grade}</td>
                    <td className="py-2 pr-2 text-muted-foreground leading-relaxed">{entry.description}</td>
                    {scale.entries.some(e => e.risk) && (
                      <td className="py-2 align-top">
                        {entry.risk && (
                          <Badge variant="outline" className={cn("text-[10px] whitespace-nowrap", riskColor(entry.risk))}>
                            {entry.risk}
                          </Badge>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

interface GradingScalesProps {
  procedureId: string;
}

export const GradingScales = ({ procedureId }: GradingScalesProps) => {
  const relevant = gradingScales.filter(s => s.procedureIds.includes(procedureId));
  if (relevant.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        Quick Reference
      </h2>
      {relevant.map(scale => (
        <GradingScaleCard key={scale.id} scale={scale} />
      ))}
    </div>
  );
};
