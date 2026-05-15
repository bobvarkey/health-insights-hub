// Clinical Trials Reference Database
// Based on LINNC-Trials-book-2025

export interface Trial {
  id: string;
  name: string;
  category: string;
  indication: string;
  summary: string;
  year?: number;
  status: 'published' | 'ongoing' | 'unpublished';
  keyFindings?: string[];
  relevantFor?: string[];
}

export const trials: Trial[] = [
  // Ischemic Stroke - Early Endovascular Therapies
  {
    id: 'ims-iii',
    name: 'IMS III',
    category: 'Endovascular Therapies - Early',
    indication: 'Acute Ischemic Stroke',
    summary: 'Compared IV t-PA + endovascular therapy vs IV t-PA alone for acute ischemic stroke within 3 hours of symptom onset. Phase 3 randomized trial with 656 patients.',
    year: 2013,
    status: 'published',
    keyFindings: [
      'Primary endpoint: mRS ≤2 at 90 days',
      '2:1 randomization (EVT vs t-PA alone)',
      'Assessed combined approach efficacy',
    ],
    relevantFor: ['Acute Ischemic Stroke', 'Endovascular Therapy', 'Thrombolysis'],
  },
  {
    id: 'mr-rescue',
    name: 'MR RESCUE',
    category: 'Endovascular Therapies - Early',
    indication: 'Acute Ischemic Stroke',
    summary: 'Mechanical Reperfusion and Recanalization of Stroke Clots Using Embolectomy. Evaluated mechanical thrombectomy in acute stroke.',
    status: 'published',
    relevantFor: ['Acute Ischemic Stroke', 'Mechanical Thrombectomy'],
  },
  {
    id: 'proact-ii',
    name: 'PROACT II',
    category: 'Endovascular Therapies - Early',
    indication: 'Acute Ischemic Stroke',
    summary: 'Prourokinase in Acute Cerebral Thromboembolism. Early study of intra-arterial thrombolysis.',
    status: 'published',
    relevantFor: ['Acute Ischemic Stroke', 'Intra-arterial Thrombolysis'],
  },

  // Mechanical Thrombectomy
  {
    id: 'mr-clean',
    name: 'MR CLEAN',
    category: 'Mechanical Thrombectomy',
    indication: 'Acute Ischemic Stroke',
    summary: 'Multicenter Randomized Clinical Trial of Endovascular Treatment for Acute Ischemic Stroke. Landmark trial proving efficacy of mechanical thrombectomy.',
    year: 2015,
    status: 'published',
    keyFindings: [
      'Demonstrated benefit of mechanical thrombectomy',
      'Improved functional outcomes',
      'Changed acute stroke treatment paradigm',
    ],
    relevantFor: ['Acute Ischemic Stroke', 'Mechanical Thrombectomy', 'Distal Vessel Occlusion'],
  },
  {
    id: 'escape',
    name: 'ESCAPE',
    category: 'Mechanical Thrombectomy',
    indication: 'Acute Ischemic Stroke',
    summary: 'Endovascular Treatment for Small Core and Anterior Circulation Proximal Occlusion with Emphasis on Minimizing CT to Recanalization Time.',
    year: 2015,
    status: 'published',
    keyFindings: ['Showed benefit in proximal anterior circulation occlusions'],
    relevantFor: ['Acute Ischemic Stroke', 'Mechanical Thrombectomy', 'Anterior Circulation'],
  },
  {
    id: 'swift-prime',
    name: 'SWIFT PRIME',
    category: 'Mechanical Thrombectomy',
    indication: 'Acute Ischemic Stroke',
    summary: 'Solitaire With the Intention For Thrombectomy as PRIMary Endovascular Treatment. Compared Solitaire FR device with IV t-PA alone.',
    year: 2015,
    status: 'published',
    relevantFor: ['Acute Ischemic Stroke', 'Mechanical Thrombectomy'],
  },
  {
    id: 'revascat',
    name: 'REVASCAT',
    category: 'Mechanical Thrombectomy',
    indication: 'Acute Ischemic Stroke',
    summary: 'Randomized Trial of Revascularization with Solitaire FR Device vs Best Medical Therapy in the Treatment of Acute Stroke Due to Anterior Circulation Proximal Occlusion.',
    year: 2015,
    status: 'published',
    relevantFor: ['Acute Ischemic Stroke', 'Mechanical Thrombectomy'],
  },
  {
    id: 'extend-ia',
    name: 'EXTEND-IA',
    category: 'Mechanical Thrombectomy',
    indication: 'Acute Ischemic Stroke',
    summary: 'Extending the Time for Thrombolysis in Emergency Neurological Deficits - Intra-Arterial.',
    year: 2015,
    status: 'published',
    relevantFor: ['Acute Ischemic Stroke', 'Mechanical Thrombectomy'],
  },

  // Late Window Thrombectomy
  {
    id: 'dawn',
    name: 'DAWN',
    category: 'Late Window Thrombectomy',
    indication: 'Acute Ischemic Stroke (Late Window)',
    summary: 'DWI or CTP Assessment with Clinical Mismatch in the Triage of Wake-up and Late Presenting Strokes Undergoing Neurointervention.',
    year: 2018,
    status: 'published',
    keyFindings: [
      'Extended treatment window up to 24 hours',
      'Showed benefit in carefully selected patients',
      'Mismatch-based patient selection',
    ],
    relevantFor: ['Acute Ischemic Stroke', 'Late Window Thrombectomy', 'Wake-up Stroke'],
  },
  {
    id: 'defuse-3',
    name: 'DEFUSE 3',
    category: 'Late Window Thrombectomy',
    indication: 'Acute Ischemic Stroke (Late Window)',
    summary: 'Diffusion-Weighted Imaging or Perfusion-Weighted Imaging Assessment with Clinical Mismatch in the Triage of Wake-up and Late Presenting Strokes.',
    year: 2018,
    status: 'published',
    keyFindings: [
      'Extended treatment window',
      'Perfusion-based patient selection',
      'Improved outcomes in selected patients',
    ],
    relevantFor: ['Acute Ischemic Stroke', 'Late Window Thrombectomy'],
  },

  // Basilar Artery Occlusion
  {
    id: 'basics',
    name: 'BASICS',
    category: 'Basilar Artery Occlusion',
    indication: 'Basilar Artery Occlusion',
    summary: 'Basilar Artery Stent Study. Randomized trial of mechanical thrombectomy vs medical management in basilar artery occlusion.',
    year: 2019,
    status: 'published',
    keyFindings: [
      'Showed benefit of thrombectomy in BAO',
      'Improved functional outcomes',
    ],
    relevantFor: ['Basilar Artery Occlusion', 'Mechanical Thrombectomy', 'Posterior Circulation'],
  },
  {
    id: 'best',
    name: 'BEST',
    category: 'Basilar Artery Occlusion',
    indication: 'Basilar Artery Occlusion',
    summary: 'Basilar Embolic Stroke Therapy. Study of mechanical thrombectomy for basilar artery occlusion.',
    status: 'published',
    relevantFor: ['Basilar Artery Occlusion', 'Mechanical Thrombectomy'],
  },

  // Aneurysm Treatment
  {
    id: 'fred',
    name: 'FRED',
    category: 'Intracranial Aneurysm Treatment',
    indication: 'Intracranial Aneurysms',
    summary: 'Flow Diverter Endoluminal Device Study. Evaluated Flow-Diverter devices for unruptured intracranial aneurysms.',
    status: 'published',
    keyFindings: [
      'Assessed flow diverter safety and efficacy',
      'Long-term aneurysm occlusion rates',
    ],
    relevantFor: ['Unruptured Aneurysms', 'Flow Diverters'],
  },
  {
    id: 'premier',
    name: 'PREMIER',
    category: 'Intracranial Aneurysm Treatment',
    indication: 'Intracranial Aneurysms',
    summary: 'Prospective Registry of Endovascular Management of Ruptured Intracranial Aneurysms. Multicenter registry of intracranial aneurysm treatment.',
    status: 'published',
    keyFindings: [
      '1-year and 3-year outcome data',
      'Predictors of incomplete occlusion',
    ],
    relevantFor: ['Intracranial Aneurysms', 'Ruptured Aneurysms'],
  },
  {
    id: 'web-it',
    name: 'WEB-IT',
    category: 'Intracranial Aneurysm Treatment',
    indication: 'Intracranial Aneurysms',
    summary: 'Woven EndoBridge Device for Intracranial aneurysm Treatment. Evaluated the WEB device for aneurysm treatment.',
    status: 'published',
    keyFindings: [
      '1-year and 5-year outcome follow-up',
      'Endoluminal device efficacy',
    ],
    relevantFor: ['Intracranial Aneurysms', 'Intrasaccular Devices'],
  },

  // AVM Treatment
  {
    id: 'aruba',
    name: 'ARUBA',
    category: 'Arteriovenous Malformation',
    indication: 'Unruptured Brain AVMs',
    summary: 'A Randomized Trial of Unruptured Brain AVMs. Compared intervention vs medical management for unruptured AVMs.',
    year: 2014,
    status: 'published',
    keyFindings: [
      'Interventional treatment increased stroke risk initially',
      'Long-term management considerations',
    ],
    relevantFor: ['Arteriovenous Malformations', 'Unruptured Lesions'],
  },

  // Ongoing/New Trials
  {
    id: 'escape-mevo',
    name: 'ESCAPE-MeVO',
    category: 'Distal Vessel Occlusions',
    indication: 'Distal Vessel Occlusion Stroke',
    summary: 'ESCAPE-Middle and distal vEssels: Evaluating the efficacy of mechanical embolectomy for distal vessel occlusions.',
    status: 'ongoing',
    relevantFor: ['Distal Vessel Occlusion', 'Mechanical Thrombectomy'],
  },
  {
    id: 'select2',
    name: 'SELECT2',
    category: 'Large Core Stroke',
    indication: 'Large Core Ischemic Stroke',
    summary: 'Evaluation of Recanalization in Ischemic Stroke with Emergent Large Core Hypodensity. Assessed thrombectomy in low ASPECTS strokes.',
    status: 'published',
    keyFindings: ['Extended thrombectomy indication to lower ASPECTS scores'],
    relevantFor: ['Large Core Stroke', 'Low ASPECTS', 'Mechanical Thrombectomy'],
  },
  {
    id: 'angel-aspect',
    name: 'ANGEL-ASPECT',
    category: 'Large Core Stroke',
    indication: 'Large Core Ischemic Stroke',
    summary: 'Assessment of Neurological impairment and Gaze Dysfunction for the Evaluation of large core strokes and Endovascular revascularization.',
    status: 'published',
    relevantFor: ['Large Core Stroke', 'Mechanical Thrombectomy'],
  },
];

// Trials organized by category for easy reference
export const trialsbyCategory = trials.reduce(
  (acc, trial) => {
    if (!acc[trial.category]) {
      acc[trial.category] = [];
    }
    acc[trial.category].push(trial);
    return acc;
  },
  {} as Record<string, Trial[]>
);

// Search function
export function searchTrials(query: string): Trial[] {
  const lowerQuery = query.toLowerCase();
  return trials.filter(
    (trial) =>
      trial.name.toLowerCase().includes(lowerQuery) ||
      trial.indication.toLowerCase().includes(lowerQuery) ||
      trial.summary.toLowerCase().includes(lowerQuery) ||
      trial.relevantFor?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

// Get trials by indication
export function getTrialsByIndication(indication: string): Trial[] {
  return trials.filter(
    (trial) =>
      trial.indication.toLowerCase().includes(indication.toLowerCase()) ||
      trial.relevantFor?.some((tag) =>
        tag.toLowerCase().includes(indication.toLowerCase())
      )
  );
}

// Get trials by category
export function getTrialsByCategory(category: string): Trial[] {
  return trialsbyCategory[category] || [];
}

export const categories = Object.keys(trialsbyCategory);
