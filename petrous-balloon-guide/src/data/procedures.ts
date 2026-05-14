export interface ProcedureStep {
  title: string;
  description: string;
}

export interface Procedure {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  category: string;
  safetyNote: string;
  steps: ProcedureStep[];
}

export const procedures: Procedure[] = [
  {
    id: 'ica-bto',
    title: 'ICA Balloon Test Occlusion',
    shortTitle: 'ICA BTO',
    icon: 'Activity',
    category: 'Vascular',
    safetyNote: 'This is a high-risk neurological procedure. Ensure all safety protocols are followed. A delay of more than 1 second in venous phase between hemispheres indicates test failure.',
    steps: [
      { title: "Place patient under GA", description: "Ensure patient is properly positioned and under general anesthesia before beginning procedure." },
      { title: "Obtain dual arterial access", description: "Establish dual arterial groin or radial access, or combination thereof for optimal catheter positioning." },
      { title: "Perform diagnostic angiography", description: "Complete at least 3 vessel diagnostic angiography — two internals and a dominant vert, or both verts." },
      { title: "Place compliant balloon", description: "Position your preferred compliant balloon into the petrous segment of the test ICA or as close to the lesion as possible but do not inflate. Horizontal petrous segment is safest — the bone protects against over-inflation and there is little chance of spasm here." },
      { title: "Position contralateral catheter", description: "Place the second diagnostic catheter into the contralateral ICA for cross-flow assessment." },
      { title: "Set up imaging view", description: "Configure your frontal view to include both hemispheres for comprehensive visualization." },
      { title: "Administer heparin", description: "Give appropriate heparin dosage as clinically indicated for anticoagulation." },
      { title: "Check blood pressure", description: "Coordinate with anesthesia regarding blood pressure — assess current pressure relative to baseline. Most of the time, pressure will be lower under GA (30% less), providing your hypotensive challenge." },
      { title: "Obtain vessel roadmap", description: "Acquire a roadmap of the vessel being tested for reference during occlusion." },
      { title: "Inflate balloon", description: "Carefully inflate the test balloon to achieve complete vessel occlusion." },
      { title: "Set frame rate", description: "Configure frame rate to 2 fps for optimal imaging throughout the test period." },
      { title: "Ipsilateral guide run", description: "Perform a run of the ipsilateral guide (on side of balloon) in biplane to confirm full balloon occlusion of the ICA and visualize potential ophthalmic, ILT, and other ECA-ICA collaterals. More ECA-ICA collaterals indicate worse circle of Willis and higher likelihood of BTO failure." },
      { title: "Contralateral ICA run", description: "Execute a run of the contralateral ICA. Only frontal projection is useful. Inject sufficient contrast (10 ccs or so) and image well into the venous phase for cross-flow assessment." },
      { title: "Vertebral artery assessment", description: "Reposition the contralateral ICA catheter into the dominant vert and perform a biplane run of the head to visualize PCA/PCOM contribution to the side being tested." },
      { title: "Deflate balloon", description: "Carefully deflate the test balloon after completing all imaging sequences." },
      { title: "Post-BTO assessment", description: "Perform a post-BTO run of the internal carotid artery to check for dissections, emboli, spasm, or other complications." },
      { title: "Analyze images", description: "Review all imaging at standard 2 frames per second for the ENTIRE run. A delay of more than 1 second in venous phase between the open and occluded hemispheres indicates test failure." }
    ]
  },
  {
    id: 'sah',
    title: 'Subarachnoid Hemorrhage Management',
    shortTitle: 'SAH',
    icon: 'Brain',
    category: 'Hemorrhagic',
    safetyNote: 'SAH is a life-threatening emergency. Rapid diagnosis and early aneurysm securing (<24h) are critical. Monitor closely for vasospasm (days 4–14), hydrocephalus, and rebleeding.',
    steps: [
      { title: "Stabilize and assess ABCs", description: "Secure airway, breathing, circulation. Intubate if GCS ≤ 8. Establish large-bore IV access and begin resuscitation." },
      { title: "Obtain non-contrast CT head", description: "Emergent NCCT to confirm SAH. Assess Fisher grade for vasospasm risk: Grade 1 (no blood), Grade 2 (diffuse thin <1mm), Grade 3 (thick clot >1mm), Grade 4 (intraventricular/intracerebral)." },
      { title: "Assign Hunt-Hess grade", description: "Grade 1: Asymptomatic/mild headache. Grade 2: Severe headache, stiff neck, no deficits except CN palsy. Grade 3: Drowsy, confused, mild deficit. Grade 4: Stuporous, moderate-severe hemiparesis. Grade 5: Coma, decerebrate posturing." },
      { title: "Lumbar puncture if CT negative", description: "If CT is negative but clinical suspicion is high, perform LP looking for xanthochromia and elevated RBCs that do not clear." },
      { title: "CT angiography", description: "Obtain CTA to identify aneurysm location, size, morphology, and relationship to parent vessel. Look for multiple aneurysms." },
      { title: "Place EVD if needed", description: "Insert external ventricular drain for acute hydrocephalus (enlarged ventricles on CT with declining mental status). Target ICP < 20 mmHg." },
      { title: "Start nimodipine", description: "Begin nimodipine 60 mg PO/NG q4h for 21 days for vasospasm prophylaxis. This is the only proven medication to improve outcomes in SAH." },
      { title: "Blood pressure management", description: "Before aneurysm securing: SBP < 160 mmHg. Use IV nicardipine or labetalol infusion. After securing: allow permissive hypertension for vasospasm prevention." },
      { title: "Seizure prophylaxis", description: "Consider levetiracetam (Keppra) 500–1000 mg IV q12h. Avoid phenytoin — associated with worse cognitive outcomes in SAH patients." },
      { title: "Diagnostic cerebral angiogram", description: "Gold standard. Perform 4-vessel DSA to characterize aneurysm anatomy, identify all aneurysms, assess collateral circulation, and plan treatment." },
      { title: "Determine treatment strategy", description: "Endovascular coiling vs. surgical clipping. Consider aneurysm location, morphology, neck width, patient age/grade, and institutional expertise. Posterior circulation aneurysms generally favor coiling." },
      { title: "Secure aneurysm within 24 hours", description: "Whether coiling or clipping, aim to secure the ruptured aneurysm as early as possible to prevent rebleeding (4% risk in first 24h, 1–2%/day thereafter)." },
      { title: "Post-procedure angiogram", description: "Confirm complete aneurysm occlusion. For coiling: assess coil mass stability, residual neck. For clipping: confirm clip position, parent artery patency." },
      { title: "Vasospasm monitoring (days 4–14)", description: "Daily TCDs (MCA velocity >120 cm/s concerning, >200 cm/s severe). CTA/CTP if symptomatic. Clinical exam q1–2h for new deficits. Maintain euvolemia and normothermia." },
      { title: "Manage delayed cerebral ischemia", description: "If vasospasm develops: induced hypertension (SBP 180–220), IV fluids for euvolemia. If refractory: emergent angiography for intra-arterial verapamil/nicardipine and/or balloon angioplasty." },
      { title: "Address systemic complications", description: "Monitor for hyponatremia (cerebral salt wasting vs SIADH), cardiac dysfunction (neurogenic stunned myocardium), DVT prophylaxis, and fever management." },
      { title: "Follow-up imaging", description: "Post-coiling: MRA or DSA at 6 months, then annually. Post-clipping: CTA at 6–12 months. Screen for new/recurrent aneurysms long-term." }
    ]
  },
  {
    id: 'davf',
    title: 'Dural AV Fistula Embolization',
    shortTitle: 'dAVF',
    icon: 'GitBranch',
    category: 'Vascular',
    safetyNote: 'Cognard Type IIb–V and Borden Type II–III dAVFs carry risk of hemorrhage and require treatment. Venous drainage pattern is the critical determinant of risk. Always identify ALL arterial feeders and the exact site of the fistula before embolization.',
    steps: [
      { title: "Review imaging and classify", description: "Review MRI/MRA for edema, hemorrhage, venous congestion. Classify using Cognard (I–V) or Borden (I–III) based on venous drainage pattern. Cortical venous drainage = high risk." },
      { title: "Assess clinical presentation", description: "Document symptoms: pulsatile tinnitus (benign), progressive neurological deficit, hemorrhage, seizures. Aggressive symptoms mandate urgent treatment." },
      { title: "Obtain arterial access", description: "Femoral arterial access with 6F sheath. Consider dual access if complex anatomy anticipated." },
      { title: "Diagnostic 6-vessel angiogram", description: "Complete bilateral ECA, ICA, and vertebral angiography. Include ascending pharyngeal, occipital, MMA injections. Identify ALL feeding arteries and the exact fistula point." },
      { title: "Map venous drainage", description: "Critically assess venous outflow: sinus drainage vs cortical venous reflux. Identify retrograde leptomeningeal venous drainage, venous ectasia, or pseudoaneurysm." },
      { title: "Identify dangerous anastomoses", description: "Map ECA-ICA anastomoses: MMA–ophthalmic, accessory meningeal–ICA, ascending pharyngeal–vertebral. These are no-go zones for liquid embolic." },
      { title: "Select embolization approach", description: "Transarterial (most common): via ECA feeders with Onyx/PHIL. Transvenous: if arterial approach not feasible, occlude the draining vein/sinus. Combined approach for complex cases." },
      { title: "Administer heparin", description: "Systemic heparinization after access. ACT target 250–300 seconds. Monitor throughout procedure." },
      { title: "Navigate microcatheter to fistula", description: "Using a flow-directed or over-the-wire microcatheter, navigate to the arterial feeder closest to the fistula point. The goal is to reach the foot of the vein." },
      { title: "DMSO-compatible catheter preparation", description: "If using Onyx/PHIL, ensure DMSO-compatible microcatheter. Perform DMSO flush per protocol. Dead space calculation is critical." },
      { title: "Inject liquid embolic", description: "Slow, controlled Onyx/PHIL injection. Use 'plug and push' technique. Monitor for reflux around catheter tip (max 2cm). Watch for dangerous anastomosis filling on fluoro." },
      { title: "Assess penetration into draining vein", description: "The key to cure is penetrating the embolic material into the proximal draining vein. Sinus filling alone without fistula point occlusion = incomplete treatment." },
      { title: "Control angiogram", description: "After each stage of embolization, perform control runs to assess residual fistula, new recruitment of feeders, and safety of continued injection." },
      { title: "Post-embolization angiogram", description: "Complete 6-vessel angiogram to confirm fistula obliteration. Run well into venous phase. Any residual cortical venous drainage requires further treatment." },
      { title: "Remove catheter and close", description: "Gently retrieve microcatheter (may be stuck in Onyx cast — use gentle traction with rotation). Femoral closure device or manual compression." },
      { title: "Post-procedure monitoring", description: "Neuro checks q1h for 24 hours. Watch for headache (venous hypertension changes), new deficits, or hemorrhage from venous rerouting." }
    ]
  },
  {
    id: 'venous-sinus-stenting',
    title: 'Venous Sinus Stenting',
    shortTitle: 'Venous Stenting',
    icon: 'Waves',
    category: 'Venous',
    safetyNote: 'Venous sinus stenting carries risk of sinus thrombosis, subdural hematoma from venous perforation, and stent migration. Ensure adequate antiplatelet therapy. Trans-stenosis gradient ≥ 8 mmHg is generally considered significant.',
    steps: [
      { title: "Confirm diagnosis of IIH", description: "Verify modified Dandy criteria: symptoms of raised ICP, papilledema, normal brain imaging (except empty sella/flattened globes), elevated opening pressure (>25 cm H2O), normal CSF composition." },
      { title: "Document failed medical therapy", description: "Ensure patient has failed or is intolerant of acetazolamide (Diamox), weight management, and therapeutic lumbar punctures before proceeding to stenting." },
      { title: "Pre-procedure antiplatelet loading", description: "Dual antiplatelet therapy: aspirin 325 mg + clopidogrel 75 mg for 5–7 days pre-procedure, or load with aspirin 650 mg + clopidogrel 600 mg day before." },
      { title: "Ophthalmologic assessment", description: "Document visual acuity, visual fields (Humphrey), OCT of RNFL thickness, and Frisén papilledema grade. This is your baseline for measuring treatment success." },
      { title: "Obtain femoral venous access", description: "Right femoral vein access with 8F sheath (or longer sheath/guide catheter system). Some operators prefer jugular venous access for more direct superior sagittal sinus access." },
      { title: "Diagnostic venography", description: "Catheter venography of bilateral transverse sinuses, sigmoid sinuses, and superior sagittal sinus. Identify stenosis location (typically transverse-sigmoid junction)." },
      { title: "Measure venous pressures", description: "Perform manometry across the stenosis. Record pressures in SSS, proximal to stenosis, across stenosis, and in jugular bulb. Trans-stenosis gradient ≥ 8 mmHg is significant." },
      { title: "Administer heparin", description: "Systemic heparinization with ACT target 250–300 seconds. Venous sinus procedures carry high thrombosis risk." },
      { title: "Cross stenosis with guidewire", description: "Carefully advance a stiff 0.035\" guidewire across the stenosis into the superior sagittal sinus. Be gentle — venous sinus wall is thin and perforation causes subdural hematoma." },
      { title: "Select and deploy stent", description: "Self-expanding stent (typically 8–10mm diameter, 40–60mm length). Position across the entire stenotic segment. Deploy slowly and confirm position on fluoro." },
      { title: "Post-stent venography", description: "Repeat venography to confirm stent expansion, flow improvement, and absence of residual stenosis." },
      { title: "Repeat pressure measurements", description: "Measure trans-stent gradient. Goal is gradient < 4 mmHg. If persistent gradient, consider balloon angioplasty within the stent." },
      { title: "Assess for complications", description: "Check for subdural hematoma (contrast extravasation), stent thrombosis, or new headache. Obtain flat-panel CT if concerned." },
      { title: "Close venous access", description: "Remove sheath with manual compression or figure-of-eight suture. Venous access sites rarely cause significant bleeding." },
      { title: "Post-procedure management", description: "Continue dual antiplatelet therapy for 3–6 months, then aspirin indefinitely. Repeat ophthalmology at 1, 3, 6, 12 months. Follow-up MRV or catheter venography at 6–12 months." }
    ]
  },
  {
    id: 'avm',
    title: 'AVM Embolization',
    shortTitle: 'AVM Embo',
    icon: 'Network',
    category: 'Vascular',
    safetyNote: 'AVM embolization carries risk of hemorrhage from premature venous occlusion, ischemic stroke from non-target embolization, and normal perfusion pressure breakthrough. Never occlude venous outflow before nidus. Spetzler-Martin grade guides treatment decisions.',
    steps: [
      { title: "Review imaging and grade AVM", description: "Assign Spetzler-Martin grade: Size (S1 <3cm, S2 3–6cm, S3 >6cm) + Eloquence (E0 non, E1 eloquent) + Venous drainage (V0 superficial, V1 deep). Supplementary grade and RBAS for refined risk." },
      { title: "Multidisciplinary discussion", description: "Discuss with neurosurgery and radiation oncology. Determine if embolization is curative intent, pre-surgical, pre-radiosurgery, or targeted (to eliminate high-risk features)." },
      { title: "Identify treatment targets", description: "If not curative: target intranidal aneurysms, high-flow fistulous components, deep arterial feeders that are difficult surgical targets. These reduce hemorrhage risk." },
      { title: "Obtain femoral arterial access", description: "6F femoral sheath. Dual access if provocation testing or complex anatomy. Prepare for potential long procedure." },
      { title: "Complete diagnostic angiogram", description: "Bilateral ICA, bilateral ECA, bilateral vertebral arteries. Identify all feeding arteries, nidal angioarchitecture, and draining veins. 3D rotational angiography is essential." },
      { title: "Analyze nidal architecture", description: "Identify: fistulous vs plexiform nidus, intranidal aneurysms, venous ectasias, flow-related aneurysms, en passage feeders (DO NOT embolize), and number/pattern of draining veins." },
      { title: "Superselective catheterization", description: "Navigate flow-directed or over-the-wire microcatheter into feeding pedicle. Position as close to nidus as possible. Avoid en passage feeders." },
      { title: "Superselective angiogram", description: "Inject through microcatheter to confirm: position within nidus territory, absence of normal brain supply, and identification of the specific compartment being fed." },
      { title: "Provocative testing (if indicated)", description: "Amytal test (30mg): monitor for new neurologic deficit — if present, this pedicle supplies eloquent cortex. Lidocaine test: same principle for posterior fossa." },
      { title: "Administer heparin", description: "Systemic heparinization. ACT target 250–300. Some operators defer heparin until catheter is in position." },
      { title: "Inject liquid embolic (Onyx/PHIL)", description: "Slow, controlled injection using plug-and-push technique. Monitor nidal penetration on fluoro. CRITICAL: stop if embolic approaches draining vein — premature venous occlusion causes hemorrhage." },
      { title: "Monitor for complications during injection", description: "Watch for: reflux around catheter (>2cm stop), filling of normal branches, approach to draining veins, patient neurological changes (if awake)." },
      { title: "Control angiogram after each pedicle", description: "Assess nidal reduction, changes in flow dynamics, new recruitment of feeders, and patency of draining veins. Draining veins MUST remain patent until nidus is obliterated." },
      { title: "Retrieve microcatheter", description: "Gentle traction with rotation to free from Onyx cast. If stuck, apply sustained gentle traction — do not force. Cut and leave catheter tip if needed (rare)." },
      { title: "Final angiogram", description: "Complete angiographic assessment of all territories. Document degree of nidal obliteration. If staged, plan next session in 4–6 weeks to allow collateral remodeling." },
      { title: "Post-procedure management", description: "Strict BP control (SBP <140 or 20% below baseline) to prevent normal perfusion pressure breakthrough. CT head immediately if any neurological change. ICU monitoring for 24h." }
    ]
  },
  {
    id: 'subdural',
    title: 'Subdural Hematoma Management',
    shortTitle: 'Subdural',
    icon: 'ShieldAlert',
    category: 'Hemorrhagic',
    safetyNote: 'Acute subdural hematoma with midline shift > 5mm or thickness > 10mm typically requires emergent surgical evacuation. Chronic subdurals may be managed conservatively if small and minimally symptomatic. Always assess for underlying coagulopathy and anticoagulant use.',
    steps: [
      { title: "Initial assessment and stabilization", description: "ABCs, GCS assessment, pupil exam. Acute SDH with declining GCS is a neurosurgical emergency. Intubate if GCS ≤ 8. Establish IV access and send coagulation studies." },
      { title: "Obtain CT head without contrast", description: "Identify: hematoma location (convexity, interhemispheric, posterior fossa), density (acute=hyperdense, subacute=isodense, chronic=hypodense), thickness, midline shift, and effacement of basal cisterns." },
      { title: "Reverse anticoagulation", description: "Warfarin: IV vitamin K + 4-factor PCC (Kcentra). DOACs: idarucizumab for dabigatran, andexanet alfa for factor Xa inhibitors. Antiplatelet: consider platelet transfusion for surgical candidates." },
      { title: "Determine surgical indication", description: "Acute SDH: surgery if thickness >10mm, midline shift >5mm, GCS drop ≥2, or ICP >20. Chronic SDH: surgery if symptomatic, thickness >10mm, or midline shift >5mm despite conservative management." },
      { title: "Select surgical approach", description: "Acute SDH: large craniotomy for clot evacuation. Chronic SDH: burr hole drainage (1–2 holes), twist drill craniostomy, or subdural drain placement. MMA embolization increasingly used as adjunct for chronic SDH." },
      { title: "Consider MMA embolization", description: "For chronic/recurrent SDH: middle meningeal artery embolization (PVA particles or liquid embolic) reduces recurrence from ~25% to ~5%. Can be standalone or adjunct to surgical drainage." },
      { title: "Pre-operative preparation", description: "Type and screen, correct coagulopathy (INR <1.4, platelets >100k), pre-operative antibiotics. Ensure OR availability — acute SDH should be evacuated within 4 hours of deterioration." },
      { title: "Intra-operative considerations", description: "Acute: large trauma flap, dural opening, clot evacuation, hemostasis, identify and address bleeding source. Chronic: burr hole, dural opening, irrigation until clear, subdural drain placement." },
      { title: "Post-operative CT", description: "Obtain CT within 6 hours post-op. Assess for residual/recurrent hematoma, pneumocephalus, brain re-expansion, and midline shift improvement." },
      { title: "Subdural drain management", description: "For chronic SDH: keep drain at level of ear, allow free drainage for 24–48 hours. Gradually raise drain before removal. Keep patient flat to promote brain re-expansion." },
      { title: "Seizure prophylaxis", description: "Levetiracetam 500–1000 mg IV/PO q12h for 7 days post-operatively. Acute SDH has ~25% risk of early post-traumatic seizures, especially with cortical contusion." },
      { title: "DVT prophylaxis", description: "SCDs immediately. Start pharmacologic prophylaxis (enoxaparin 40mg SQ daily) 24–48 hours post-operatively once repeat CT is stable. Balance thrombotic vs hemorrhagic risk." },
      { title: "Monitor for recurrence", description: "Chronic SDH recurs in 10–25% of cases. Risk factors: bilateral SDH, coagulopathy, brain atrophy, incomplete re-expansion. Follow-up CT at 1, 3, 6 weeks." },
      { title: "Resume anticoagulation planning", description: "Multidisciplinary decision based on indication for anticoagulation. Generally restart after 1–4 weeks depending on surgical stability and indication urgency." },
      { title: "Rehabilitation assessment", description: "Assess need for PT/OT/ST. Cognitive evaluation, especially in elderly. Address modifiable risk factors for recurrence. Ensure appropriate follow-up arranged." }
    ]
  }
];
