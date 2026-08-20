export const vehicle = {
  name: 'My Model Y',
  plate: 'EV 402 CC',
  batteryPct: 62,
  rangeMi: 187,
  connector: 'NACS',
}

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

export const services = [
  { id: 'sv-1', name: 'Full Wash', desc: 'Interior + exterior', priceFrom: 28, mins: 45, accent: 'tide' },
  { id: 'sv-2', name: 'Interior Only', desc: 'Vacuum, wipe down, mats', priceFrom: 18, mins: 25, accent: 'tide' },
  { id: 'sv-3', name: 'Exterior Only', desc: 'Hand wash + dry', priceFrom: 16, mins: 20, accent: 'tide' },
  { id: 'sv-4', name: 'Oil Change', desc: 'Synthetic blend, up to 5qt', priceFrom: 59, mins: 30, accent: 'copper' },
  { id: 'sv-5', name: 'Tire Rotation', desc: '4-wheel rotation + inspection', priceFrom: 24, mins: 20, accent: 'copper' },
  { id: 'sv-6', name: 'Brake Inspection', desc: 'Pads, rotors, fluid check', priceFrom: 0, mins: 15, accent: 'copper' },
]

export const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM']

export const nextBooking = {
  service: 'Full Wash',
  provider: 'Suds & Co — Downtown',
  when: 'Today, 2:30 PM',
  queuePosition: 2,
}
