// Corning BioOps — Mock Data
const DATA = {
  // ===== DASHBOARD =====
  dashboardMetrics: [
    { label: 'Active Bioprocess Runs', value: '12', change: '+2', trend: 'up', icon: 'flask' },
    { label: 'Connected Hardware', value: '47', change: '3 offline', trend: 'neutral', icon: 'cpu' },
    { label: 'Inventory Health', value: '84%', change: '-3%', trend: 'down', icon: 'package' },
    { label: 'Open Alerts', value: '8', change: '+1', trend: 'up', icon: 'alert' },
    { label: 'Pending Replenishments', value: '5', change: '', trend: 'neutral', icon: 'refresh' },
    { label: 'Shipments In Transit', value: '14', change: '+4', trend: 'up', icon: 'truck' },
  ],

  dashboardAlerts: [
    { type: 'warning', title: 'Low Inventory: T-75 Flasks', desc: 'Current stock at 18% capacity. Estimated 4 days of supply remaining.', time: '12 min ago', actionable: true, action: 'replenish' },
    { type: 'danger', title: 'Reactor BRX-007 Contamination Risk', desc: 'pH deviation detected at 7.8 (threshold: 7.2-7.5). Immediate review recommended.', time: '28 min ago', actionable: true, action: 'review' },
    { type: 'info', title: 'Predictive Maintenance: CellSTACK Handler', desc: 'Calibration due in 3 days. Schedule service to avoid workflow interruption.', time: '1 hr ago', actionable: true, action: 'schedule' },
    { type: 'success', title: 'Batch B-2024-091 Completed', desc: 'CHO cell expansion completed successfully. Final viability: 96.2%.', time: '2 hr ago', actionable: false },
    { type: 'warning', title: 'Regional Demand Spike: Asia-Pacific', desc: 'CellBIND surface consumables demand up 34% vs. forecast.', time: '3 hr ago', actionable: true, action: 'reallocate' },
  ],

  shipments: [
    { id: 'SHP-20241201', origin: 'Corning, NY', dest: 'Boston BioLab', status: 'In Transit', eta: 'Mar 14', items: 'T-75 Flasks (500), CellSTACK-2 (25)' },
    { id: 'SHP-20241198', origin: 'Durham, NC', dest: 'Singapore MfgHub', status: 'Customs', eta: 'Mar 16', items: 'Roller Bottles (1000), Media (200L)' },
    { id: 'SHP-20241195', origin: 'Kaiserslautern, DE', dest: 'Basel Pharma', status: 'Delivered', eta: 'Mar 11', items: 'HYPERFlask (100), Matrigel (50)' },
    { id: 'SHP-20241190', origin: 'Corning, NY', dest: 'San Diego Gene', status: 'Processing', eta: 'Mar 18', items: 'CellCube (10), Sensors (20)' },
  ],

  demandForecast: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    actual: [420, 480, 510, 0, 0, 0],
    forecast: [420, 475, 520, 560, 590, 620],
  },

  // ===== BIOPROCESS =====
  reactors: [
    {
      id: 'BRX-001', batch: 'B-2024-089', phase: 'Cell Expansion', elapsed: '72h 14m',
      status: 'normal', riskLevel: 'Low',
      sensors: { pH: 7.35, temp: 37.0, dO2: 45, gasFlow: 0.5 },
      aiRec: null,
    },
    {
      id: 'BRX-003', batch: 'B-2024-090', phase: 'Transfection', elapsed: '24h 08m',
      status: 'normal', riskLevel: 'Low',
      sensors: { pH: 7.28, temp: 37.1, dO2: 52, gasFlow: 0.8 },
      aiRec: 'Consider reducing agitation speed by 5 RPM to optimize transfection efficiency based on current cell density.',
    },
    {
      id: 'BRX-007', batch: 'B-2024-092', phase: 'Production', elapsed: '148h 32m',
      status: 'warning', riskLevel: 'High',
      sensors: { pH: 7.82, temp: 37.4, dO2: 38, gasFlow: 1.2 },
      aiRec: 'ALERT: pH level 7.82 exceeds upper threshold. Recommend immediate base addition (0.5M NaOH) and increase CO2 gas flow to 1.5 L/min.',
    },
    {
      id: 'BRX-012', batch: 'B-2024-093', phase: 'Harvest Prep', elapsed: '192h 05m',
      status: 'normal', riskLevel: 'Low',
      sensors: { pH: 7.15, temp: 36.8, dO2: 60, gasFlow: 0.3 },
      aiRec: 'Cell viability holding at 94.8%. Optimal harvest window: next 8-12 hours.',
    },
    {
      id: 'BRX-015', batch: 'B-2024-094', phase: 'Seed Train', elapsed: '12h 45m',
      status: 'normal', riskLevel: 'Low',
      sensors: { pH: 7.40, temp: 37.0, dO2: 55, gasFlow: 0.4 },
      aiRec: null,
    },
    {
      id: 'BRX-022', batch: 'B-2024-095', phase: 'Cell Expansion', elapsed: '96h 20m',
      status: 'caution', riskLevel: 'Medium',
      sensors: { pH: 7.48, temp: 37.3, dO2: 41, gasFlow: 0.9 },
      aiRec: 'Dissolved oxygen trending below optimal range. Recommend increasing gas flow to 1.1 L/min.',
    },
  ],

  sensorTrend: {
    labels: ['0h', '12h', '24h', '36h', '48h', '60h', '72h'],
    pH: [7.40, 7.38, 7.35, 7.30, 7.28, 7.25, 7.35],
    temp: [37.0, 37.0, 37.1, 37.0, 37.1, 37.2, 37.0],
    dO2: [55, 52, 48, 45, 43, 42, 45],
  },

  // ===== HARDWARE =====
  devices: [
    { name: 'CellSTACK-40 Handler', type: 'Cell Culture System', status: 'Online', statusType: 'success', lastSync: '2 min ago', nextCal: 'Mar 18', icon: 'layers' },
    { name: 'AMBR 250 Bioreactor', type: 'Bioreactor Controller', status: 'Online', statusType: 'success', lastSync: '5 min ago', nextCal: 'Mar 25', icon: 'activity' },
    { name: 'CellXpress.ai', type: 'Automated Cell Culture', status: 'Online', statusType: 'success', lastSync: '1 min ago', nextCal: 'Apr 02', icon: 'cpu' },
    { name: 'Corning Cell Counter', type: 'Analytics Instrument', status: 'Maintenance', statusType: 'warning', lastSync: '1 hr ago', nextCal: 'Overdue', icon: 'search' },
    { name: 'Media Prep Station', type: 'Fluid Handling', status: 'Online', statusType: 'success', lastSync: '8 min ago', nextCal: 'Apr 10', icon: 'droplet' },
    { name: 'Roller Bottle Apparatus', type: 'Culture Expansion', status: 'Offline', statusType: 'danger', lastSync: '3 hr ago', nextCal: 'Mar 15', icon: 'rotate' },
    { name: 'CentriStacker System', type: 'Centrifugation', status: 'Online', statusType: 'success', lastSync: '12 min ago', nextCal: 'Apr 22', icon: 'refresh' },
    { name: 'Environmental Monitor', type: 'Facility Monitoring', status: 'Online', statusType: 'success', lastSync: '30 sec ago', nextCal: 'May 01', icon: 'thermometer' },
  ],

  maintenanceSchedule: [
    { device: 'Corning Cell Counter', task: 'Optics Calibration', due: 'Mar 12', priority: 'High', status: 'Overdue' },
    { device: 'Roller Bottle Apparatus', task: 'Motor Replacement', due: 'Mar 15', priority: 'High', status: 'Scheduled' },
    { device: 'CellSTACK-40 Handler', task: 'Routine Calibration', due: 'Mar 18', priority: 'Medium', status: 'Scheduled' },
    { device: 'AMBR 250 Bioreactor', task: 'Sensor Verification', due: 'Mar 25', priority: 'Low', status: 'Scheduled' },
    { device: 'CellXpress.ai', task: 'Software Update v3.2', due: 'Apr 02', priority: 'Medium', status: 'Pending' },
  ],

  workflowNodes: [
    { label: 'Cell Counter', status: 'Data Capture', active: true },
    { label: 'LIMS', status: 'Processing', active: true },
    { label: 'Bioreactor', status: 'Control Loop', active: true },
    { label: 'BioOps Cloud', status: 'Analytics', active: true },
    { label: 'Inventory Mgmt', status: 'Auto-Reorder', active: false },
    { label: 'Supply Chain', status: 'Fulfillment', active: false },
  ],

  // ===== INVENTORY =====
  inventory: [
    { name: 'T-75 Cell Culture Flasks', sku: 'CLS-430641', stock: 180, capacity: 1000, daysSupply: 4, status: 'critical', reorderQty: 500 },
    { name: 'CellSTACK-2 Culture Chambers', sku: 'CLS-353118', stock: 45, capacity: 100, daysSupply: 12, status: 'warning', reorderQty: 50 },
    { name: 'HYPERFlask Cell Culture Vessels', sku: 'CLS-353137', stock: 320, capacity: 500, daysSupply: 28, status: 'good', reorderQty: 0 },
    { name: 'Corning Matrigel Matrix', sku: 'CLS-354234', stock: 85, capacity: 200, daysSupply: 18, status: 'good', reorderQty: 0 },
    { name: 'Roller Bottles 850cm²', sku: 'CLS-431191', stock: 60, capacity: 400, daysSupply: 6, status: 'warning', reorderQty: 200 },
    { name: 'CellBIND Surface Plates', sku: 'CLS-353950', stock: 520, capacity: 600, daysSupply: 45, status: 'good', reorderQty: 0 },
    { name: 'Cell Culture Media (DMEM)', sku: 'CLS-10013CV', stock: 30, capacity: 200, daysSupply: 8, status: 'warning', reorderQty: 100 },
    { name: 'Trypsin-EDTA Solution', sku: 'CLS-25200056', stock: 150, capacity: 300, daysSupply: 35, status: 'good', reorderQty: 0 },
  ],

  regionalDemand: {
    labels: ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East'],
    current: [340, 280, 420, 85, 55],
    forecast: [360, 300, 560, 95, 60],
  },

  supplyShipments: [
    { id: 'PO-78234', item: 'T-75 Flasks', qty: 500, origin: 'Corning, NY', status: 'Processing', eta: 'Mar 18' },
    { id: 'PO-78228', item: 'Roller Bottles', qty: 200, origin: 'Durham, NC', status: 'Shipped', eta: 'Mar 15' },
    { id: 'PO-78220', item: 'Cell Media', qty: 100, origin: 'Manassas, VA', status: 'In Transit', eta: 'Mar 14' },
    { id: 'PO-78215', item: 'CellSTACK-2', qty: 50, origin: 'Kaiserslautern, DE', status: 'Customs', eta: 'Mar 17' },
  ],

  // ===== CONTROL TOWER =====
  globalLabs: [
    { region: 'North America', labs: 28, reactorsActive: 84, utilization: 78 },
    { region: 'Europe', labs: 19, reactorsActive: 52, utilization: 71 },
    { region: 'Asia-Pacific', labs: 34, reactorsActive: 112, utilization: 89 },
    { region: 'Latin America', labs: 6, reactorsActive: 14, utilization: 62 },
    { region: 'Middle East & Africa', labs: 4, reactorsActive: 8, utilization: 55 },
  ],

  categoryDemand: {
    labels: ['Cell Culture Vessels', 'Bioreactor Consumables', 'Media & Reagents', 'Surface Coatings', 'Accessories'],
    values: [2800, 1950, 3200, 820, 1400],
  },

  warehouseAllocation: [
    { warehouse: 'Corning, NY (Primary)', stock: 85, capacity: '24,000 units', orders: 142 },
    { warehouse: 'Durham, NC', stock: 72, capacity: '18,000 units', orders: 89 },
    { warehouse: 'Kaiserslautern, DE', stock: 68, capacity: '15,000 units', orders: 76 },
    { warehouse: 'Singapore Hub', stock: 91, capacity: '20,000 units', orders: 134 },
  ],

  serviceTickets: [
    { id: 'TKT-4521', lab: 'Boston BioLab', issue: 'Bioreactor sensor drift', priority: 'High', status: 'In Progress', assigned: 'J. Martinez', age: '2d' },
    { id: 'TKT-4518', lab: 'Singapore MfgHub', issue: 'CellXpress connectivity', priority: 'Medium', status: 'Open', assigned: 'L. Chen', age: '3d' },
    { id: 'TKT-4515', lab: 'Basel Pharma', issue: 'Media Prep calibration', priority: 'Low', status: 'Resolved', assigned: 'K. Müller', age: '5d' },
    { id: 'TKT-4510', lab: 'San Diego Gene', issue: 'Roller Bottle motor fault', priority: 'High', status: 'Escalated', assigned: 'R. Patel', age: '4d' },
    { id: 'TKT-4508', lab: 'Tokyo BioPharma', issue: 'Environmental monitor alarm', priority: 'Medium', status: 'In Progress', assigned: 'Y. Tanaka', age: '1d' },
  ],

  supplyChainBottlenecks: [
    { item: 'Roller Bottle Raw Material', location: 'Durham Supplier', severity: 'High', impact: 'Est. 5-day delay on 3 orders', action: 'Alternate supplier activated' },
    { item: 'Sensor Components', location: 'Shenzhen', severity: 'Medium', impact: '2-day delay on sensor kits', action: 'Air freight approved' },
    { item: 'Matrigel Packaging', location: 'Corning, NY', severity: 'Low', impact: 'Minor labeling delay', action: 'Resolved — back on schedule' },
  ],

  // ===== SUBSCRIPTION =====
  plans: [
    {
      name: 'BioOps Essentials',
      price: '$2,400',
      period: '/mo',
      features: ['Up to 10 connected devices', 'Basic inventory tracking', 'Standard alerts', 'Email support', '5 user accounts'],
      active: false,
    },
    {
      name: 'BioOps Professional',
      price: '$6,800',
      period: '/mo',
      features: ['Up to 50 connected devices', 'Advanced inventory & forecasting', 'AI recommendations', 'Priority support', '25 user accounts', 'API access'],
      active: true,
    },
    {
      name: 'BioOps Enterprise',
      price: 'Custom',
      period: '',
      features: ['Unlimited devices', 'Full Control Tower access', 'Custom AI models', 'Dedicated support team', 'Unlimited users', 'Full API & SSO', 'On-site integration'],
      active: false,
    },
  ],

  accountInfo: {
    org: 'Boston BioLab Inc.',
    plan: 'BioOps Professional',
    devices: 47,
    maxDevices: 50,
    users: 18,
    maxUsers: 25,
    supportTier: 'Priority',
    nextBilling: 'Apr 01, 2024',
    monthlySpend: '$6,800',
    modules: [
      { name: 'Bioprocess Monitoring', desc: 'Real-time reactor & workflow data', enabled: true },
      { name: 'Hardware Workflows', desc: 'Device connectivity & diagnostics', enabled: true },
      { name: 'Inventory Intelligence', desc: 'Predictive stock management', enabled: true },
      { name: 'AI Recommendations', desc: 'Process optimization insights', enabled: true },
      { name: 'Control Tower', desc: 'Global operations visibility', enabled: false },
      { name: 'Supply Chain Integration', desc: 'End-to-end logistics tracking', enabled: false },
    ],
  },

  usageAnalytics: {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    apiCalls: [12400, 15800, 18200, 22100, 24500, 26800],
    dataPoints: [84000, 92000, 105000, 118000, 130000, 142000],
  },
};
