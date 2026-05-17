import { Link } from "react-router-dom";
import { Activity, Droplets, Heart, Scale, GitBranch, Pill, Table2, Syringe } from "lucide-react";

const categories = [
  {
    id: "diabetes",
    label: "Diabetes",
    icon: Activity,
    calculators: [
      { name: "Insulin Titration", path: "/insulin-titration" },
      { name: "Sliding Scale Insulin", path: "/sliding-scale" },
      { name: "Hypoglycemia Risk", path: "/hypo-risk" },
      { name: "Renal Dose Adjustment", path: "/renal-dosing" },
      { name: "Medication Algorithm", path: "/diabetes/medication-algorithm", isNew: true },
    ],
  },
  {
    id: "lipids",
    label: "Lipids",
    icon: Droplets,
    calculators: [
      { name: "Lipid Panel", path: "/lipid-panel" },
      { name: "ASCVD Risk", path: "/ascvd-risk" },
    ],
  },
  {
    id: "htn",
    label: "Hypertension",
    icon: Heart,
    calculators: [
      { name: "GFR Calculator", path: "/gfr-calculator" },
      { name: "Drug Interactions", path: "/drug-interactions" },
      { name: "Treatment Algorithm", path: "/htn/treatment-algorithm", isNew: true },
      { name: "Potency Table", path: "/htn/potency-table", isNew: true },
    ],
  },
  {
    id: "obesity",
    label: "Obesity",
    icon: Scale,
    calculators: [
      { name: "BMI Calculator", path: "/obesity/bmi-calculator" },
      { name: "Waist-to-Height Ratio", path: "/obesity/waist-height-ratio" },
      { name: "GLP-1 Algorithm", path: "/obesity/glp1-algorithm", isNew: true },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 px-6 py-5">
        <h1 className="text-2xl font-bold tracking-tight">ClinCalc NCD</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Clinical calculators for non-communicable disease management
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-4">
          {categories.map(({ id, label, icon: Icon, calculators }) => (
            <div key={id} className="clinical-card space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">{label}</h2>
              </div>
              <ul className="space-y-1">
                {calculators.map(({ name, path, isNew }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <span>{name}</span>
                      {isNew && (
                        <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
