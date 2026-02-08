export const normalData = {
  status: 'normal',
  stressLevel: 25,
  hr: 74,
  hrv: 48,
  rhr: 68,
  scl: 3.4,
  timestamp: new Date().toISOString(),
}

export const stressedData = {
  status: 'stressed',
  stressLevel: 78,
  hr: 96,
  hrv: 24,
  rhr: 72,
  scl: 6.7,
  timestamp: new Date().toISOString(),
}

export const thresholds = {
  hr: {
    normal: { min: 60, max: 85 },
    stressed: { min: 85, max: 110 },
    label: 'Heart Rate',
    unit: 'bpm',
  },
  hrv: {
    normal: { min: 35, max: 65 },
    stressed: { min: 15, max: 35 },
    label: 'Heart Rate Variability',
    unit: 'ms',
    inverse: true,
  },
  rhr: {
    normal: { min: 60, max: 75 },
    stressed: { min: 75, max: 90 },
    label: 'Resting Heart Rate',
    unit: 'bpm',
  },
  scl: {
    normal: { min: 2, max: 5 },
    stressed: { min: 5, max: 10 },
    label: 'Skin Conductance Level',
    unit: 'µS',
  },
}
