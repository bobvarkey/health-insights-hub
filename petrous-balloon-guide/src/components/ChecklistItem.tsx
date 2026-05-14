import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItemProps {
  step: number;
  title: string;
  description?: string;
  isCompleted?: boolean;
  onToggle?: (completed: boolean) => void;
}

export const ChecklistItem = ({ 
  step, 
  title, 
  description, 
  isCompleted = false, 
  onToggle 
}: ChecklistItemProps) => {
  const [completed, setCompleted] = useState(isCompleted);

  const handleToggle = () => {
    const newState = !completed;
    setCompleted(newState);
    onToggle?.(newState);
  };

  return (
    <div 
      className={cn(
        "group border border-border rounded-lg p-3 sm:p-4 transition-all duration-300 cursor-pointer bg-card shadow-soft hover:shadow-medical active:scale-[0.98]",
        completed && "bg-accent border-primary"
      )}
      onClick={handleToggle}
    >
      <div className="flex items-start gap-4">
        {/* Step Number & Checkbox */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300",
            completed 
              ? "bg-success border-success text-success-foreground" 
              : "border-primary text-primary bg-card group-hover:bg-primary group-hover:text-primary-foreground"
          )}>
            {completed ? <Check className="w-4 h-4" /> : step}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-medium text-sm sm:text-base text-card-foreground transition-colors duration-300",
            completed && "text-accent-foreground"
          )}>
            {title}
          </h3>
          {description && (
            <p className={cn(
              "mt-2 text-sm text-muted-foreground leading-relaxed",
              completed && "text-accent-foreground/70"
            )}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};