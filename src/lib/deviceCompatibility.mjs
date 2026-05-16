const INCH_TOLERANCE = 0.0005;

export function parseNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (!value || typeof value !== 'string') return null;
  const match = value.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

export function getInnerDiameter(device) {
  return parseNumber(device.minid || device.inner_diameter_in || device['Internal Diameter (inch)']);
}

export function getOuterDiameter(device) {
  return parseNumber(device.maxod || device.outer_diameter_in || device['Crossing Profile (inch)']);
}

export function getLength(device) {
  return parseNumber(device.length || device.length_cm || device['Length (cm)']);
}

export function checkDeviceCompatibility(container, innerDevice) {
  const containerId = getInnerDiameter(container);
  const innerOd = getOuterDiameter(innerDevice);
  const containerLength = getLength(container);
  const innerLength = getLength(innerDevice);
  const issues = [];

  if (containerId === null) {
    issues.push('Container inner diameter is missing.');
  }

  if (innerOd === null) {
    issues.push('Inner device outer diameter is missing.');
  }

  const clearanceIn = containerId !== null && innerOd !== null
    ? round(containerId - innerOd, 4)
    : null;

  if (clearanceIn !== null && clearanceIn < -INCH_TOLERANCE) {
    issues.push(
      `${innerDevice.name} OD ${innerOd.toFixed(3)} in exceeds ${container.name} ID ${containerId.toFixed(3)} in.`
    );
  }

  if (
    containerLength !== null &&
    innerLength !== null &&
    innerLength + 5 < containerLength
  ) {
    issues.push(
      `${innerDevice.name} working length ${innerLength} cm may be too short for ${container.name} length ${containerLength} cm.`
    );
  }

  return {
    status: issues.length ? 'conflict' : 'fit',
    clearanceIn,
    issues,
  };
}

export function checkMultipleDeviceCompatibility(container, innerDevices) {
  const containerId = getInnerDiameter(container);
  const diameters = innerDevices
    .map((device) => ({ device, diameter: getOuterDiameter(device), length: getLength(device) }))
    .filter((item) => item.diameter !== null);
  const issues = [];

  if (containerId === null) {
    issues.push('Container inner diameter is missing.');
  }

  if (diameters.length !== innerDevices.length) {
    issues.push('One or more inner devices are missing outer diameter data.');
  }

  const requiredDiameter = estimatePackedDiameter(diameters.map((item) => item.diameter));
  const angiographyReservePercent = containerId === null
    ? null
    : calculateAngiographyReserve(containerId, diameters.map((item) => item.diameter));

  if (
    containerId !== null &&
    requiredDiameter !== null &&
    requiredDiameter > containerId + INCH_TOLERANCE
  ) {
    issues.push(
      `Packed device diameter ${requiredDiameter.toFixed(3)} in exceeds ${container.name} ID ${containerId.toFixed(3)} in.`
    );
  }

  const containerLength = getLength(container);
  if (containerLength !== null) {
    diameters.forEach(({ device, length }) => {
      if (length !== null && length + 5 < containerLength) {
        issues.push(
          `${device.name} working length ${length} cm may be too short for ${container.name} length ${containerLength} cm.`
        );
      }
    });
  }

  return {
    status: issues.length ? 'conflict' : 'fit',
    requiredDiameterIn: requiredDiameter === null ? null : round(requiredDiameter, 4),
    angiographyReservePercent,
    issues,
    method: 'area-and-packing estimate',
  };
}

export function findSimilarDevices(device, devices, limit = 8) {
  const deviceOd = getOuterDiameter(device);
  const deviceId = getInnerDiameter(device);

  return devices
    .filter((candidate) => (
      candidate.device_id !== device.device_id &&
      candidate.category === device.category
    ))
    .map((candidate) => {
      const odDelta = delta(deviceOd, getOuterDiameter(candidate));
      const idDelta = delta(deviceId, getInnerDiameter(candidate));
      const manufacturerPenalty = candidate.manufacturer === device.manufacturer ? 0 : 0.01;
      return {
        ...candidate,
        similarityScore: odDelta + idDelta + manufacturerPenalty,
      };
    })
    .filter((candidate) => candidate.similarityScore < 0.025)
    .sort((a, b) => a.similarityScore - b.similarityScore)
    .slice(0, limit);
}

export function calculateAngiographyReserve(containerDiameter, innerDiameters) {
  const containerArea = circleArea(containerDiameter);
  const usedArea = innerDiameters.reduce((sum, diameter) => sum + circleArea(diameter), 0);
  return Math.max(0, round(((containerArea - usedArea) / containerArea) * 100, 1));
}

export function isDmsoCompatible(device) {
  const value = String(device.dmso || device.DMSO || '').trim().toLowerCase();
  if (!value) return 'unknown';
  if (['yes', 'y', 'true', 'compatible'].some((item) => value.includes(item))) return 'compatible';
  if (['no', 'n', 'false', 'incompatible'].some((item) => value.includes(item))) return 'incompatible';
  return value;
}

const conditionModels = {
  'unruptured-aneurysm': {
    label: 'Unruptured aneurysm',
    fields: {
      sizeMm: { label: 'Aneurysm size', unit: 'mm', min: 1, max: 30, default: 7 },
      posteriorCirculation: { label: 'Posterior circulation', type: 'boolean' },
      priorSah: { label: 'Prior SAH from another aneurysm', type: 'boolean' },
      irregularMorphology: { label: 'Irregular dome or daughter sac', type: 'boolean' },
    },
    score(values) {
      return [
        bucket(values.sizeMm, [[7, 2], [10, 4], [20, 6]]),
        values.posteriorCirculation ? 2 : 0,
        values.priorSah ? 1 : 0,
        values.irregularMorphology ? 3 : 0,
      ];
    },
  },
  davf: {
    label: 'DAVF',
    fields: {
      corticalVenousReflux: { label: 'Cortical venous reflux', type: 'boolean' },
      venousEctasia: { label: 'Venous ectasia', type: 'boolean' },
      hemorrhage: { label: 'Hemorrhagic presentation', type: 'boolean' },
      ocularOrBrainstemSymptoms: { label: 'Ocular or brainstem symptoms', type: 'boolean' },
    },
    score(values) {
      return [
        values.corticalVenousReflux ? 4 : 0,
        values.venousEctasia ? 2 : 0,
        values.hemorrhage ? 3 : 0,
        values.ocularOrBrainstemSymptoms ? 1 : 0,
      ];
    },
  },
  avm: {
    label: 'AVM',
    fields: {
      nidusSizeCm: { label: 'Nidus size', unit: 'cm', min: 1, max: 8, default: 3 },
      eloquentCortex: { label: 'Eloquent location', type: 'boolean' },
      deepDrainage: { label: 'Deep venous drainage', type: 'boolean' },
      ruptured: { label: 'Ruptured presentation', type: 'boolean' },
    },
    score(values) {
      return [
        bucket(values.nidusSizeCm, [[3, 1], [6, 2]]),
        values.eloquentCortex ? 1 : 0,
        values.deepDrainage ? 1 : 0,
        values.ruptured ? 2 : 0,
      ];
    },
  },
  'carotid-stenosis': {
    label: 'Carotid stenosis',
    fields: {
      stenosisPercent: { label: 'Stenosis', unit: '%', min: 30, max: 99, default: 70 },
      symptomatic: { label: 'Symptoms within 6 months', type: 'boolean' },
      highSurgicalRisk: { label: 'High surgical risk', type: 'boolean' },
      unstablePlaque: { label: 'Ulcerated or unstable plaque', type: 'boolean' },
    },
    score(values) {
      return [
        bucket(values.stenosisPercent, [[50, 1], [70, 3], [90, 4]]),
        values.symptomatic ? 3 : 0,
        values.highSurgicalRisk ? 1 : 0,
        values.unstablePlaque ? 1 : 0,
      ];
    },
  },
  'intracranial-hypotension': {
    label: 'Intracranial hypotension',
    fields: {
      orthostaticHeadache: { label: 'Orthostatic headache', type: 'boolean' },
      pachymeningealEnhancement: { label: 'Pachymeningeal enhancement', type: 'boolean' },
      brainSag: { label: 'Brain sag or venous engorgement', type: 'boolean' },
      csfLeakSeen: { label: 'CSF leak seen on myelography', type: 'boolean' },
    },
    score(values) {
      return [
        values.orthostaticHeadache ? 2 : 0,
        values.pachymeningealEnhancement ? 2 : 0,
        values.brainSag ? 2 : 0,
        values.csfLeakSeen ? 3 : 0,
      ];
    },
  },
};

export function getConditionModels() {
  return conditionModels;
}

export function predictClinicalRisk(conditionId, values) {
  const model = conditionModels[conditionId];
  if (!model) throw new Error(`Unknown condition: ${conditionId}`);

  const score = model.score(values).reduce((sum, item) => sum + item, 0);
  const tier = score >= 6 ? 'high' : score >= 4 ? 'moderate' : 'low';
  const drivers = Object.entries(model.fields)
    .filter(([key, field]) => {
      if (field.type === 'boolean') return Boolean(values[key]);
      const defaultValue = field.default ?? field.min ?? 0;
      return Number(values[key] ?? 0) > defaultValue;
    })
    .map(([, field]) => field.label);

  return {
    condition: model.label,
    score,
    tier,
    drivers,
    recommendation: recommendations[tier],
  };
}

const recommendations = {
  low: 'Low signal in this simplified screen. Continue standard clinical review and correlate with imaging.',
  moderate: 'Moderate signal. Review anatomy, symptoms, and treatment thresholds with a senior operator.',
  high: 'High signal. Treat as a priority discussion for multidisciplinary review and procedural planning.',
};

function bucket(value, thresholds) {
  const numeric = Number(value ?? 0);
  return thresholds.reduce((score, [threshold, points]) => (
    numeric >= threshold ? points : score
  ), 0);
}

function delta(a, b) {
  if (a === null || b === null) return 0.01;
  return Math.abs(a - b);
}

function round(value, places) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

function estimatePackedDiameter(diameters) {
  if (!diameters.length) return null;
  if (diameters.length === 1) return diameters[0];
  if (diameters.length === 2) return diameters[0] + diameters[1];

  const maxDiameter = Math.max(...diameters);
  const areaDiameter = Math.sqrt(diameters.reduce((sum, diameter) => sum + diameter ** 2, 0));
  const packingPenalty = 1.12;
  return Math.max(maxDiameter, areaDiameter * packingPenalty);
}

function circleArea(diameter) {
  const radius = diameter / 2;
  return Math.PI * radius * radius;
}
