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
    inverse: true, // ค่าต่ำ = เครียด
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
