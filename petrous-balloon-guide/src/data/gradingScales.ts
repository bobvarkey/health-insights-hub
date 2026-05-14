import cognardClassification from '@/assets/cognard-classification.jpeg';
import cognardHand from '@/assets/cognard-hand.jpeg';
import archesArc from '@/assets/arches-arc.jpeg';

export interface GradingScaleEntry {
  grade: string;
  description: string;
  risk?: string;
}

export interface GradingScale {
  id: string;
  title: string;
  subtitle: string;
  procedureIds: string[];
  images?: string[];
  entries: GradingScaleEntry[];
}

export const gradingScales: GradingScale[] = [
  {
    id: 'hunt-hess',
    title: 'Hunt-Hess Scale',
    subtitle: 'Clinical grading of SAH severity',
    procedureIds: ['sah'],
    entries: [
      { grade: 'Grade 1', description: 'Asymptomatic or mild headache, slight nuchal rigidity', risk: 'Low' },
      { grade: 'Grade 2', description: 'Moderate-severe headache, nuchal rigidity, no deficit except CN palsy', risk: 'Low' },
      { grade: 'Grade 3', description: 'Drowsy, confused, mild focal deficit', risk: 'Moderate' },
      { grade: 'Grade 4', description: 'Stuporous, moderate-severe hemiparesis, early decerebrate rigidity', risk: 'High' },
      { grade: 'Grade 5', description: 'Deep coma, decerebrate rigidity, moribund appearance', risk: 'Very High' },
    ],
  },
  {
    id: 'fisher',
    title: 'Modified Fisher Scale',
    subtitle: 'CT-based prediction of vasospasm risk',
    procedureIds: ['sah'],
    entries: [
      { grade: 'Grade 0', description: 'No SAH or IVH', risk: 'Low' },
      { grade: 'Grade 1', description: 'Thin SAH, no IVH', risk: 'Low' },
      { grade: 'Grade 2', description: 'Thin SAH with IVH', risk: 'Moderate' },
      { grade: 'Grade 3', description: 'Thick SAH, no IVH', risk: 'High' },
      { grade: 'Grade 4', description: 'Thick SAH with IVH', risk: 'Very High' },
    ],
  },
  {
    id: 'spetzler-martin',
    title: 'Spetzler-Martin Scale',
    subtitle: 'AVM surgical risk grading',
    procedureIds: ['avm'],
    entries: [
      { grade: 'Size: S1', description: 'Small (<3 cm) — 1 point', risk: '' },
      { grade: 'Size: S2', description: 'Medium (3–6 cm) — 2 points', risk: '' },
      { grade: 'Size: S3', description: 'Large (>6 cm) — 3 points', risk: '' },
      { grade: 'Eloquence: E0', description: 'Non-eloquent cortex — 0 points', risk: '' },
      { grade: 'Eloquence: E1', description: 'Eloquent cortex (sensorimotor, language, visual, thalamus, hypothalamus, brainstem, cerebellar peduncles, deep cerebellar nuclei) — 1 point', risk: '' },
      { grade: 'Drainage: V0', description: 'Superficial venous drainage only — 0 points', risk: '' },
      { grade: 'Drainage: V1', description: 'Any deep venous drainage — 1 point', risk: '' },
      { grade: 'Grade I (1pt)', description: 'Low surgical risk — consider microsurgery', risk: 'Low' },
      { grade: 'Grade II (2pt)', description: 'Low surgical risk — consider microsurgery', risk: 'Low' },
      { grade: 'Grade III (3pt)', description: 'Intermediate risk — multimodal treatment', risk: 'Moderate' },
      { grade: 'Grade IV (4pt)', description: 'High surgical risk — consider radiosurgery/embolization', risk: 'High' },
      { grade: 'Grade V (5pt)', description: 'Very high risk — often observation recommended', risk: 'Very High' },
    ],
  },
  {
    id: 'cognard',
    title: 'Cognard Classification',
    subtitle: 'dAVF classification by venous drainage pattern',
    procedureIds: ['davf'],
    images: [cognardClassification, cognardHand],
    entries: [
      { grade: 'Type I', description: 'Confined to sinus, antegrade flow', risk: 'Benign' },
      { grade: 'Type IIa', description: 'Confined to sinus, retrograde flow', risk: 'Low' },
      { grade: 'Type IIb', description: 'Reflux into cortical veins, retrograde flow', risk: 'High' },
      { grade: 'Type IIa+b', description: 'Sinus with CVR and retrograde flow', risk: 'High' },
      { grade: 'Type III', description: 'Direct drainage into cortical veins (no sinus)', risk: 'High' },
      { grade: 'Type IV', description: 'Into cortical veins with venous ectasia (>5mm)', risk: 'Very High' },
      { grade: 'Type V', description: 'Spinal perimedullary venous drainage', risk: 'Very High' },
    ],
  },
  {
    id: 'borden',
    title: 'Borden Classification',
    subtitle: 'Simplified dAVF classification',
    procedureIds: ['davf'],
    entries: [
      { grade: 'Type I', description: 'Dural arterial supply drains into dural sinus or meningeal vein — antegrade flow, no cortical venous drainage', risk: 'Benign' },
      { grade: 'Type II', description: 'Drains into dural sinus with retrograde flow into subarachnoid (cortical) veins', risk: 'Aggressive' },
      { grade: 'Type III', description: 'Drains directly into subarachnoid (cortical) veins — no sinus involvement', risk: 'Aggressive' },
    ],
  },
  {
    id: 'aortic-arch',
    title: 'Aortic Arch Types',
    subtitle: 'Classification of arch anatomy for catheter selection',
    procedureIds: ['ica-bto', 'sah', 'davf', 'avm'],
    images: [archesArc],
    entries: [
      { grade: 'Type I', description: 'All great vessels originate at the level of the outer curvature of the arch. Easiest catheterization.', risk: 'Easy' },
      { grade: 'Type II', description: 'Innominate artery originates between outer and inner curvature. Moderate difficulty.', risk: 'Moderate' },
      { grade: 'Type III', description: 'Innominate artery originates below inner curvature. Most difficult — may need reverse-curve catheters (Simmons).', risk: 'Difficult' },
      { grade: 'Bovine Arch', description: 'Common origin of innominate and left CCA, or left CCA arising from innominate. Present in ~15% of population.', risk: 'Variant' },
    ],
  },
];
