import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  ExternalLink,
  Ruler,
  Search,
  XCircle,
} from 'lucide-react';

import devices from '../data/neuroDevices.json';
import {
  checkDeviceCompatibility,
  checkMultipleDeviceCompatibility,
  findSimilarDevices,
  getConditionModels,
  getInnerDiameter,
  getLength,
  getOuterDiameter,
  isDmsoCompatible,
  predictClinicalRisk,
} from '../lib/deviceCompatibility.mjs';

const conditionModels = getConditionModels();
const conditionIds = Object.keys(conditionModels);

function getSummary(device) {
  return (
    device.Description ||
    device.description ||
    device.indications ||
    device.comments ||
    device.Comments ||
    'Specification row imported from the supplied NeuroTool-style device database.'
  );
}

function getMaterial(device) {
  return device.material || device.Material || device['Materials Used'] || device.Materials || '';
}

function getDesign(device) {
  return device.design || device.Design || device.features || device.specifications || '';
}

function getUrl(device) {
  return device.url || device.url1 || device.url2 || device.ifu || '';
}

function formatInches(value) {
  return value === null ? 'Unknown' : `${value.toFixed(3)} in`;
}

function buildSearchText(device) {
  return [
    device.name,
    device.manufacturer,
    device.category,
    device.type,
    device.subcategory,
    device.indications,
    getSummary(device),
  ].join(' ').toLowerCase();
}

const searchableDevices = devices.map((device) => ({
  ...device,
  searchText: buildSearchText(device),
}));

export default function NeuroDeviceWorkbench() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [containerId, setContainerId] = useState('NT-0006');
  const [innerId, setInnerId] = useState('NT-0005');
  const [thirdDeviceId, setThirdDeviceId] = useState('NT-0007');
  const [selectedId, setSelectedId] = useState('NT-0006');
  const [conditionId, setConditionId] = useState('unruptured-aneurysm');
  const [predictionInputs, setPredictionInputs] = useState(() => getDefaultInputs(conditionModels));

  const categories = useMemo(() => {
    const names = new Set(searchableDevices.map((device) => device.category).filter(Boolean));
    return ['All', ...Array.from(names).sort()];
  }, []);

  const filteredDevices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return searchableDevices
      .filter((device) => category === 'All' || device.category === category)
      .filter((device) => !normalizedQuery || device.searchText.includes(normalizedQuery))
      .slice(0, 80);
  }, [category, query]);

  const selectedDevice = useMemo(
    () => searchableDevices.find((device) => device.device_id === selectedId) || searchableDevices[0],
    [selectedId]
  );

  const container = useMemo(
    () => searchableDevices.find((device) => device.device_id === containerId) || searchableDevices[0],
    [containerId]
  );

  const innerDevice = useMemo(
    () => searchableDevices.find((device) => device.device_id === innerId) || searchableDevices[1],
    [innerId]
  );

  const thirdDevice = useMemo(
    () => searchableDevices.find((device) => device.device_id === thirdDeviceId) || searchableDevices[2],
    [thirdDeviceId]
  );

  const compatibility = useMemo(
    () => checkDeviceCompatibility(container, innerDevice),
    [container, innerDevice]
  );

  const multiCompatibility = useMemo(
    () => checkMultipleDeviceCompatibility(container, [innerDevice, thirdDevice]),
    [container, innerDevice, thirdDevice]
  );

  const similarDevices = useMemo(
    () => findSimilarDevices(selectedDevice, searchableDevices),
    [selectedDevice]
  );

  const prediction = useMemo(
    () => predictClinicalRisk(conditionId, predictionInputs[conditionId]),
    [conditionId, predictionInputs]
  );

  const currentModel = conditionModels[conditionId];

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#17211d]">
      <section className="border-b border-[#d7ddd2] bg-[#fbfcf8]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#3c6d64]">
              NeuroTool-informed workbench
            </p>
            <h1 className="mb-4 max-w-4xl text-3xl font-semibold text-[#17211d] md:text-5xl">
              Neuro device compatibility checker
            </h1>
            <p className="max-w-3xl text-base leading-7 text-[#4d5c55] md:text-lg">
              Search the imported device specification database, compare fit-inside catheter
              relationships, inspect sizing details, and run condition-specific prediction screens.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 self-end">
            <Metric icon={Database} label="Devices" value={devices.length.toLocaleString()} />
            <Metric icon={Ruler} label="Fit model" value="ID / OD" />
            <Metric icon={Activity} label="Predictors" value="5" />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[360px_1fr] lg:px-6">
        <aside className="space-y-4">
          <section className="border border-[#d7ddd2] bg-white p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#24332d]">
              <Search className="h-4 w-4" />
              Device search
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pipeline, Sofia, Xact, balloon..."
              className="mb-3 border-[#c9d3ca] bg-[#fbfcf8] text-[#17211d]"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="border-[#c9d3ca] bg-[#fbfcf8] text-[#17211d]"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </section>

          <section className="max-h-[660px] overflow-auto border border-[#d7ddd2] bg-white">
            {filteredDevices.map((device) => (
              <button
                key={device.device_id}
                type="button"
                onClick={() => setSelectedId(device.device_id)}
                className={`block w-full rounded-none border-b border-[#eef1eb] px-4 py-3 text-left transition ${
                  selectedDevice.device_id === device.device_id
                    ? 'bg-[#dfeadf] text-[#17211d]'
                    : 'bg-white text-[#24332d] hover:bg-[#f4f7f1]'
                }`}
              >
                <span className="block text-sm font-semibold">{device.name}</span>
                <span className="mt-1 block text-xs text-[#64736b]">
                  {device.manufacturer || 'Unknown manufacturer'} / {device.category || 'Uncategorized'}
                </span>
              </button>
            ))}
          </section>
        </aside>

        <main className="space-y-6">
          <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <DeviceSelect
              label="Container device"
              value={containerId}
              onChange={setContainerId}
              devices={searchableDevices}
            />
            <DeviceSelect
              label="Inner device"
              value={innerId}
              onChange={setInnerId}
              devices={searchableDevices}
            />
          </section>

          <section className="border border-[#d7ddd2] bg-white p-5">
            <div className="mb-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
              <DeviceSelect
                label="Additional parallel device"
                value={thirdDeviceId}
                onChange={setThirdDeviceId}
                devices={searchableDevices}
              />
              <div className="border border-[#e4e9e2] bg-[#fbfcf8] p-4">
                <div className="mb-2 text-sm font-semibold text-[#24332d]">Multi-device fit estimate</div>
                <p className="mb-3 text-sm leading-6 text-[#64736b]">
                  Based on the NeuroTool background model: 3+ device workflows become a circle-packing
                  problem, while residual angiography strength follows remaining lumen area.
                </p>
                <StatusBadge status={multiCompatibility.status} />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <SpecStat
                label="Packed diameter"
                value={multiCompatibility.requiredDiameterIn === null ? 'Unknown' : `${multiCompatibility.requiredDiameterIn.toFixed(3)} in`}
              />
              <SpecStat
                label="Angiography reserve"
                value={multiCompatibility.angiographyReservePercent === null ? 'Unknown' : `${multiCompatibility.angiographyReservePercent}%`}
              />
              <SpecStat
                label="DMSO status"
                value={[innerDevice, thirdDevice].map(isDmsoCompatible).join(' / ')}
              />
            </div>
            {multiCompatibility.issues.length > 0 && (
              <div className="mt-4 border border-[#ebc9bf] bg-[#fff4ef] p-4 text-sm text-[#7d2d1f]">
                {multiCompatibility.issues.map((issue) => (
                  <p key={issue} className="mb-2 last:mb-0">{issue}</p>
                ))}
              </div>
            )}
          </section>

          <section className="border border-[#d7ddd2] bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="mb-1 text-xl font-semibold text-[#17211d]">Compatibility result</h2>
                <p className="text-sm text-[#64736b]">
                  {container.name} as container for {innerDevice.name}
                </p>
              </div>
              <StatusBadge status={compatibility.status} />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <SpecStat label="Container ID" value={formatInches(getInnerDiameter(container))} />
              <SpecStat label="Inner device OD" value={formatInches(getOuterDiameter(innerDevice))} />
              <SpecStat
                label="Clearance"
                value={compatibility.clearanceIn === null ? 'Unknown' : `${compatibility.clearanceIn.toFixed(3)} in`}
              />
            </div>

            {compatibility.issues.length > 0 ? (
              <div className="mt-4 border border-[#ebc9bf] bg-[#fff4ef] p-4 text-sm text-[#7d2d1f]">
                {compatibility.issues.map((issue) => (
                  <p key={issue} className="mb-2 last:mb-0">{issue}</p>
                ))}
              </div>
            ) : (
              <div className="mt-4 border border-[#b9d7c4] bg-[#eef8f1] p-4 text-sm text-[#23533a]">
                Diameter relationship passes the imported ID/OD specification check. Confirm hub,
                support, device length, and IFU constraints before clinical use.
              </div>
            )}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <DeviceDetail device={selectedDevice} similarDevices={similarDevices} onSelect={setSelectedId} />
            <PredictionPanel
              conditionId={conditionId}
              setConditionId={setConditionId}
              model={currentModel}
              inputs={predictionInputs[conditionId]}
              setInputs={(nextInputs) => {
                setPredictionInputs((current) => ({
                  ...current,
                  [conditionId]: nextInputs,
                }));
              }}
              prediction={prediction}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="border border-[#d7ddd2] bg-white p-4">
      <Icon className="mb-3 h-5 w-5 text-[#3c6d64]" />
      <div className="text-2xl font-semibold text-[#17211d]">{value}</div>
      <div className="text-xs uppercase tracking-[0.14em] text-[#64736b]">{label}</div>
    </div>
  );
}

function DeviceSelect({ label, value, onChange, devices }) {
  return (
    <label className="block border border-[#d7ddd2] bg-white p-4">
      <span className="mb-2 block text-sm font-semibold text-[#24332d]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-[#c9d3ca] bg-[#fbfcf8] text-[#17211d]"
      >
        {devices.map((device) => (
          <option key={device.device_id} value={device.device_id}>
            {device.name} / {device.manufacturer || 'Unknown'}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatusBadge({ status }) {
  const isFit = status === 'fit';
  const Icon = isFit ? CheckCircle2 : XCircle;

  return (
    <div
      className={`flex items-center gap-2 border px-3 py-2 text-sm font-semibold ${
        isFit
          ? 'border-[#94c8a6] bg-[#eef8f1] text-[#23533a]'
          : 'border-[#e0a293] bg-[#fff4ef] text-[#7d2d1f]'
      }`}
    >
      <Icon className="h-4 w-4" />
      {isFit ? 'Compatible by diameter' : 'Compatibility conflict'}
    </div>
  );
}

function SpecStat({ label, value }) {
  return (
    <div className="border border-[#e4e9e2] bg-[#fbfcf8] p-4">
      <div className="text-xs uppercase tracking-[0.14em] text-[#64736b]">{label}</div>
      <div className="mt-2 text-lg font-semibold text-[#17211d]">{value}</div>
    </div>
  );
}

function DeviceDetail({ device, similarDevices, onSelect }) {
  const url = getUrl(device);
  const sizeTable = parseJsonField(device.sizetable);

  return (
    <section className="border border-[#d7ddd2] bg-white p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#3c6d64]">
            Selected device
          </p>
          <h2 className="mb-2 text-2xl font-semibold text-[#17211d]">{device.name}</h2>
          <p className="text-sm text-[#64736b]">
            {device.manufacturer || 'Unknown manufacturer'} / {device.category || 'Uncategorized'}
          </p>
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-[#c9d3ca] px-3 py-2 text-sm font-semibold text-[#315f56] hover:bg-[#f4f7f1] hover:no-underline"
          >
            Source <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <SpecStat label="Inner diameter" value={formatInches(getInnerDiameter(device))} />
        <SpecStat label="Outer diameter" value={formatInches(getOuterDiameter(device))} />
        <SpecStat label="Length" value={getLength(device) === null ? 'Unknown' : `${getLength(device)} cm`} />
      </div>

      <p className="mb-4 text-sm leading-6 text-[#4d5c55]">{getSummary(device)}</p>

      <dl className="grid gap-3 text-sm md:grid-cols-2">
        <InfoLine label="Material" value={getMaterial(device)} />
        <InfoLine label="Design / features" value={getDesign(device)} />
        <InfoLine label="DMSO" value={device.dmso} />
        <InfoLine label="Indications" value={device.indications} />
      </dl>

      {Array.isArray(sizeTable) && sizeTable.length > 0 && (
        <div className="mt-5 overflow-auto border border-[#e4e9e2]">
          <table className="w-full min-w-[520px] text-left text-xs">
            <thead className="bg-[#f4f7f1] text-[#4d5c55]">
              <tr>
                {Object.keys(sizeTable[0]).slice(0, 5).map((key) => (
                  <th key={key} className="px-3 py-2 font-semibold">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeTable.slice(0, 6).map((row, index) => (
                <tr key={`${device.device_id}-${index}`} className="border-t border-[#e4e9e2]">
                  {Object.keys(sizeTable[0]).slice(0, 5).map((key) => (
                    <td key={key} className="px-3 py-2 text-[#24332d]">{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-5">
        <h3 className="mb-3 text-base font-semibold text-[#17211d]">Similar devices</h3>
        <div className="grid gap-2">
          {similarDevices.length ? similarDevices.map((item) => (
            <button
              key={item.device_id}
              type="button"
              onClick={() => onSelect(item.device_id)}
              className="rounded-none border border-[#e4e9e2] bg-[#fbfcf8] px-3 py-2 text-left text-sm text-[#24332d] hover:bg-[#eef4ec]"
            >
              {item.name}
              <span className="ml-2 text-xs text-[#64736b]">{item.manufacturer}</span>
            </button>
          )) : (
            <p className="text-sm text-[#64736b]">No close match found in the current category.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="border-t border-[#e4e9e2] pt-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-[#64736b]">{label}</dt>
      <dd className="mt-1 line-clamp-4 text-[#24332d]">{value || 'Not specified'}</dd>
    </div>
  );
}

function PredictionPanel({ conditionId, setConditionId, model, inputs, setInputs, prediction }) {
  const tabRefs = useRef({});

  useEffect(() => {
    tabRefs.current[conditionId]?.focus();
  }, [conditionId]);

  return (
    <section className="border border-[#d7ddd2] bg-[#18231f] p-5 text-white">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-[#e8c66a]" />
        <h2 className="mb-0 text-xl font-semibold">Prediction tools</h2>
      </div>

      <div
        className="mb-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Prediction condition"
      >
        {conditionIds.map((id) => (
          <button
            key={id}
            type="button"
            id={`prediction-tab-${id}`}
            ref={(element) => {
              if (element) tabRefs.current[id] = element;
            }}
            role="tab"
            aria-selected={conditionId === id}
            aria-controls={`prediction-panel-${id}`}
            tabIndex={conditionId === id ? 0 : -1}
            onClick={() => setConditionId(id)}
            onKeyDown={(event) => {
              const currentIndex = conditionIds.indexOf(conditionId);
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                setConditionId(conditionIds[(currentIndex + 1) % conditionIds.length]);
              }
              if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                setConditionId(conditionIds[(currentIndex - 1 + conditionIds.length) % conditionIds.length]);
              }
              if (event.key === 'Home') {
                event.preventDefault();
                setConditionId(conditionIds[0]);
              }
              if (event.key === 'End') {
                event.preventDefault();
                setConditionId(conditionIds[conditionIds.length - 1]);
              }
            }}
            className={`rounded-none border px-3 py-2 text-sm ${
              conditionId === id
                ? 'border-[#e8c66a] bg-[#e8c66a] text-[#17211d]'
                : 'border-[#3b4a43] bg-transparent text-[#d7ddd2] hover:bg-[#26342e]'
            }`}
          >
            {conditionModels[id].label}
          </button>
        ))}
      </div>

      <div
        id={`prediction-panel-${conditionId}`}
        role="tabpanel"
        aria-labelledby={`prediction-tab-${conditionId}`}
        className="space-y-4"
      >
        {Object.entries(model.fields).map(([key, field]) => (
          field.type === 'boolean' ? (
            <label key={key} className="flex items-center justify-between gap-4 border border-[#3b4a43] p-3">
              <span className="text-sm text-[#e8ece5]">{field.label}</span>
              <input
                type="checkbox"
                checked={Boolean(inputs[key])}
                onChange={(event) => setInputs({ ...inputs, [key]: event.target.checked })}
                className="h-5 w-5 accent-[#e8c66a]"
              />
            </label>
          ) : (
            <label key={key} className="block border border-[#3b4a43] p-3">
              <span className="mb-2 flex items-center justify-between text-sm text-[#e8ece5]">
                {field.label}
                <strong>{inputs[key]} {field.unit || ''}</strong>
              </span>
              <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step || 1}
                value={inputs[key]}
                onChange={(event) => setInputs({ ...inputs, [key]: Number(event.target.value) })}
                className="w-full accent-[#e8c66a]"
              />
            </label>
          )
        ))}
      </div>

      <div className="mt-5 border border-[#3b4a43] bg-[#111a17] p-4">
        <div className="mb-2 text-xs uppercase tracking-[0.14em] text-[#aab7af]">Risk screen</div>
        <div className="mb-2 text-3xl font-semibold capitalize text-[#e8c66a]">{prediction.tier}</div>
        <p className="mb-3 text-sm text-[#d7ddd2]">
          Score {prediction.score}. {prediction.recommendation}
        </p>
        <p className="text-xs text-[#aab7af]">
          Drivers: {prediction.drivers.length ? prediction.drivers.join(', ') : 'No high-signal drivers selected'}.
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-[#aab7af]">
        Educational screen only. It is not a validated diagnostic, treatment, or device-use directive.
      </p>
    </section>
  );
}

function parseJsonField(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function getDefaultInputs(models) {
  return Object.fromEntries(
    Object.entries(models).map(([conditionId, model]) => [
      conditionId,
      Object.fromEntries(
        Object.entries(model.fields).map(([key, field]) => [
          key,
          field.type === 'boolean' ? false : field.default ?? field.min ?? 0,
        ])
      ),
    ])
  );
}
