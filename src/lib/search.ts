export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'procedure' | 'decision-tree' | 'calculator' | 'classification' | 'trial' | 'resource';
  url: string;
  type: string;
}

// Mock data - will be populated from procedures
export const searchIndex: SearchResult[] = [
  {
    id: 'cerebral-angiogram',
    title: 'Cerebral Angiogram Protocol',
    description: 'Step-by-step checklist for cerebral angiography procedures',
    category: 'procedure',
    url: '/tools/procedural-checklists/cerebral-angiogram/',
    type: 'Procedural Checklist',
  },
  {
    id: 'avm-grading',
    title: 'AVM Grading System',
    description: 'Spetzler-Martin grading scale for arteriovenous malformations',
    category: 'classification',
    url: '/tools/classifications/avm-grading/',
    type: 'Classification Tool',
  },
  {
    id: 'aneurysm-risk',
    title: 'Aneurysm Risk Assessment',
    description: 'Decision tree for assessing aneurysm rupture risk',
    category: 'decision-tree',
    url: '/tools/decision-trees/aneurysm-risk/',
    type: 'Decision Tree',
  },
  {
    id: 'vasospasm-calculator',
    title: 'Vasospasm Probability Calculator',
    description: 'Calculate risk of delayed cerebral vasospasm post-SAH',
    category: 'calculator',
    url: '/tools/calculators/vasospasm-probability/',
    type: 'Clinical Calculator',
  },
  {
    id: 'modified-rankin',
    title: 'Modified Rankin Scale',
    description: 'Assess functional outcome and disability in neurological patients',
    category: 'classification',
    url: '/tools/classifications/modified-rankin/',
    type: 'Assessment Scale',
  },
  {
    id: 'niihss',
    title: 'NIH Stroke Scale',
    description: 'Standardized neurological assessment tool for acute stroke',
    category: 'calculator',
    url: '/tools/calculators/niihss/',
    type: 'Clinical Calculator',
  },
  {
    id: 'coiling-vs-clipping',
    title: 'Coiling vs Clipping Decision',
    description: 'Decision tree for choosing between endovascular coiling and microsurgical clipping',
    category: 'decision-tree',
    url: '/tools/decision-trees/coiling-vs-clipping/',
    type: 'Decision Tree',
  },
  {
    id: 'intracranial-pressure',
    title: 'Intracranial Pressure Management',
    description: 'Protocol for managing elevated ICP in critical care settings',
    category: 'procedure',
    url: '/tools/procedural-checklists/icp-management/',
    type: 'Procedural Checklist',
  },
  {
    id: 'clinical-trials',
    title: 'Clinical Trials Reference',
    description: 'Comprehensive database of landmark and emerging interventional neurology trials',
    category: 'resource',
    url: '/learning-resources/clinical-trials/',
    type: 'Trials Reference',
  },
  {
    id: 'mr-clean-trial',
    title: 'MR CLEAN Trial',
    description: 'Landmark mechanical thrombectomy trial demonstrating efficacy in acute ischemic stroke',
    category: 'trial',
    url: '/learning-resources/clinical-trials/',
    type: 'Clinical Trial',
  },
  {
    id: 'dawn-trial',
    title: 'DAWN Trial',
    description: 'Extended window mechanical thrombectomy trial for late presenting strokes',
    category: 'trial',
    url: '/learning-resources/clinical-trials/',
    type: 'Clinical Trial',
  },
  {
    id: 'swift-prime-trial',
    title: 'SWIFT PRIME Trial',
    description: 'Mechanical thrombectomy with Solitaire FR device for acute ischemic stroke',
    category: 'trial',
    url: '/learning-resources/clinical-trials/',
    type: 'Clinical Trial',
  },
  {
    id: 'aruba-trial',
    title: 'ARUBA Trial',
    description: 'Randomized trial of intervention vs medical management for unruptured brain AVMs',
    category: 'trial',
    url: '/learning-resources/clinical-trials/',
    type: 'Clinical Trial',
  },
];

export function searchProcedures(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  return searchIndex.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.type.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
  );
}

export function getCategoryLabel(category: SearchResult['category']): string {
  const labels: Record<SearchResult['category'], string> = {
    procedure: 'Procedure',
    'decision-tree': 'Decision Tree',
    calculator: 'Calculator',
    classification: 'Classification',
    trial: 'Clinical Trial',
    resource: 'Resource',
  };
  return labels[category];
}
