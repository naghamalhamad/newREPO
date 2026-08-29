export const vehicle = {
  name: 'My Model Y',
  plate: 'EV 402 CC',
  batteryPct: 62,
  rangeMi: 187,
  connector: 'NACS',
}

// EV brands actually sold/available in the Jordanian market
export const carBrands = [
  'Hyundai', 'Kia', 'Nissan', 'MG', 'BYD', 'JAC', 'Changan', 'Renault',
  'Chevrolet', 'Tesla', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen',
  'Volvo', 'Porsche',
]

// Short monogram shown on each brand's selection card — not the brands'
// actual logo artwork (we have no licensed asset source for those), just a
// recognizable abbreviation so the card reads as brand-specific at a glance.
export const carBrandMonograms = {
  Hyundai: 'HY',
  Kia: 'KIA',
  Nissan: 'NI',
  MG: 'MG',
  BYD: 'BYD',
  JAC: 'JAC',
  Changan: 'CA',
  Renault: 'RE',
  Chevrolet: 'CHV',
  Tesla: 'TE',
  BMW: 'BMW',
  'Mercedes-Benz': 'MB',
  Audi: 'AU',
  Volkswagen: 'VW',
  Volvo: 'VOL',
  Porsche: 'PO',
}

// EV model lineup sold under each brand — shown once the brand is picked,
// so the user selects their actual car rather than a generic body type.
export const carModelsByBrand = {
  Hyundai: ['Kona Electric', 'Ioniq 5', 'Ioniq 6'],
  Kia: ['Niro EV', 'EV6', 'Soul EV'],
  Nissan: ['Leaf', 'Ariya'],
  MG: ['MG4', 'ZS EV', 'MG5'],
  BYD: ['Seagull', 'Dolphin', 'Atto 3', 'Seal', 'Han', 'Tang', 'Song Plus', 'Yuan Plus'],
  JAC: ['e-JS1', 'JS4 EV', 'JS6 EV', 'iEV7S'],
  Changan: ['Lumin', 'Benben E-Star', 'UNI-K EV'],
  Renault: ['Zoe', 'Megane E-Tech', 'Kangoo E-Tech'],
  Chevrolet: ['Bolt EV', 'Bolt EUV'],
  Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X'],
  BMW: ['i4', 'iX1', 'iX', 'i7'],
  'Mercedes-Benz': ['EQA', 'EQB', 'EQC', 'EQS'],
  Audi: ['Q4 e-tron', 'e-tron', 'e-tron GT'],
  Volkswagen: ['ID.3', 'ID.4', 'ID.5'],
  Volvo: ['EX30', 'XC40 Recharge', 'C40 Recharge'],
  Porsche: ['Taycan', 'Macan Electric'],
}

export const chargerTypes = ['NACS', 'CCS', 'CHAdeMO']

export const stations = [
  {
    id: 'st-1',
    name: 'Cedar Ave Supercharge',
    address: '412 Cedar Ave, Portland, OR',
    distanceMi: 0.6,
    connectors: ['NACS', 'CCS'],
    priceKwh: 0.42,
    occupied: 5,
    total: 8,
    etaFreeMin: 6,
  },
  {
    id: 'st-2',
    name: 'Riverside Charge Hub',
    address: '88 Riverside Dr, Portland, OR',
    distanceMi: 1.2,
    connectors: ['CCS', 'CHAdeMO'],
    priceKwh: 0.38,
    occupied: 2,
    total: 12,
    etaFreeMin: 0,
  },
  {
    id: 'st-3',
    name: 'Uptown Parkade EV',
    address: '900 Morrison St, Portland, OR',
    distanceMi: 1.8,
    connectors: ['NACS'],
    priceKwh: 0.45,
    occupied: 4,
    total: 4,
    etaFreeMin: 22,
  },
  {
    id: 'st-4',
    name: 'Harbor Point Fast Charge',
    address: '15 Harbor Point Way, Portland, OR',
    distanceMi: 2.4,
    connectors: ['CCS', 'NACS'],
    priceKwh: 0.4,
    occupied: 1,
    total: 6,
    etaFreeMin: 0,
  },
]

export const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM']

export const vehicles = [
  { id: 'v-1', name: 'My Model Y', plate: 'EV 402 CC', connector: 'NACS', color: 'Pearl White' },
  { id: 'v-2', name: 'Weekend Bolt', plate: 'EV 118 KX', connector: 'CCS', color: 'Slate Blue' },
]

export const paymentMethods = [
  { id: 'pm-1', brand: 'Visa', last4: '4821', expiry: '09/28', primary: true },
  { id: 'pm-2', brand: 'Mastercard', last4: '2290', expiry: '02/27', primary: false },
]

export const chargingHistory = [
  { id: 'rc-1', station: 'Cedar Ave Supercharge', date: 'Aug 18, 2026', kwh: 42.6, cost: 17.89, mins: 38 },
  { id: 'rc-2', station: 'Riverside Charge Hub', date: 'Aug 14, 2026', kwh: 31.2, cost: 11.86, mins: 29 },
  { id: 'rc-3', station: 'Harbor Point Fast Charge', date: 'Aug 9, 2026', kwh: 55.0, cost: 22.0, mins: 44 },
]

export const notifications = [
  { id: 'nt-1', kind: 'charging', title: 'Charging complete', body: 'Cedar Ave Supercharge — 42.6 kWh delivered, $17.89 charged.', when: '2h ago', unread: true },
  { id: 'nt-3', kind: 'charging', title: 'Slot available', body: 'A connector just opened up at Uptown Parkade EV.', when: 'Yesterday', unread: false },
]

export const activeSession = {
  station: 'Cedar Ave Supercharge',
  connector: 'NACS',
  priceKwh: 0.42,
  startBatteryPct: 41,
  targetBatteryPct: 90,
}
