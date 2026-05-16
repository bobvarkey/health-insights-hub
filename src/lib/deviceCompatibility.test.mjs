import test from 'node:test';
import assert from 'node:assert/strict';

import {
  checkDeviceCompatibility,
  checkMultipleDeviceCompatibility,
  findSimilarDevices,
  getConditionModels,
  predictClinicalRisk,
} from './deviceCompatibility.mjs';

const container = {
  device_id: 'guide-071',
  name: 'Guide 071',
  category: 'Catheter',
  minid: '0.071',
  maxod: '0.086',
  length: '95',
};

const inner = {
  device_id: 'micro-027',
  name: 'Micro 027',
  category: 'Catheter',
  minid: '0.027',
  maxod: '0.032',
  length: '150',
};

test('checks inner device fit using outside diameter, container inside diameter, and length', () => {
  assert.deepEqual(checkDeviceCompatibility(container, inner), {
    status: 'fit',
    clearanceIn: 0.039,
    issues: [],
  });
});

test('reports diameter and length conflicts when a device cannot fit', () => {
  const oversized = { ...inner, maxod: '0.074', length: '80' };

  const result = checkDeviceCompatibility(container, oversized);

  assert.equal(result.status, 'conflict');
  assert.equal(result.clearanceIn, -0.003);
  assert.equal(result.issues.length, 2);
});

test('finds similar devices by category and manufacturer-aware sizing proximity', () => {
  const devices = [
    container,
    { ...container, device_id: 'guide-072', name: 'Guide 072', maxod: '0.087' },
    { ...container, device_id: 'balloon-1', name: 'Balloon', category: 'Balloon' },
  ];

  const similar = findSimilarDevices(container, devices);

  assert.equal(similar.length, 1);
  assert.equal(similar[0].device_id, 'guide-072');
});

test('estimates multi-device packing and residual angiography area', () => {
  const result = checkMultipleDeviceCompatibility(container, [
    { ...inner, maxod: '0.023', name: 'SL-10' },
    { ...inner, maxod: '0.037', name: 'Sceptre XC' },
  ]);

  assert.equal(result.status, 'fit');
  assert.ok(result.angiographyReservePercent > 50);
  assert.equal(result.method, 'area-and-packing estimate');
});

test('predicts named clinical condition risk with driver explanations', () => {
  const prediction = predictClinicalRisk('unruptured-aneurysm', {
    sizeMm: 9,
    posteriorCirculation: true,
    priorSah: false,
    irregularMorphology: true,
  });

  assert.equal(prediction.tier, 'high');
  assert.ok(prediction.score >= 7);
  assert.ok(prediction.drivers.some((driver) => driver.includes('Posterior')));
});

test('exposes all requested prediction condition tabs', () => {
  assert.deepEqual(Object.keys(getConditionModels()), [
    'unruptured-aneurysm',
    'davf',
    'avm',
    'carotid-stenosis',
    'intracranial-hypotension',
  ]);
});
