import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ChecklistItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function ChecklistItem({ id, label, checked, onChange, className }: ChecklistItemProps) {
  return (
    <div className={`flex items-start space-x-3 py-2 ${className || ""}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="mt-0.5 data-[state=checked]:bg-success data-[state=checked]:border-success"
      />
      <Label
        htmlFor={id}
        className={`text-sm leading-relaxed cursor-pointer ${
          checked ? "line-through text-muted-foreground" : "text-foreground"
        }`}
      >
        {label}
      </Label>
    </div>
  );
}