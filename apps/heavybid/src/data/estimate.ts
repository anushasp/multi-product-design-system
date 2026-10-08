import type { ResourceType } from '@groundwork/ui';
export const payItems = [
  { code: '100', name: 'Clear Debris', amount: 16611.99 },
  { code: '100001', name: 'Clear & Grub - Heavy', amount: 15429.03, child: true },
  { code: '200', name: 'Excavation & Removal', amount: 26633.91 },
  { code: '300', name: 'Install 36" RCP', amount: 83866.41 },
  { code: '400', name: 'Manholes', amount: 7543.28 },
  { code: '500', name: 'Curb Inlets - Type C', amount: 6814.92 },
  { code: '600', name: 'Pavement Restoration', amount: 26890.17 },
  { code: 'IND', name: 'Indirects', amount: 5401.82 },
];
export const bidTotal = 173762.5;
export interface CrewResource { type: ResourceType; code: string; description: string; pieces: number; hours: number; unitCost: number; actualUnit: number; cost: number; }
export const crew: CrewResource[] = [
  { type: 'equipment', code: 'D6', description: 'Cat D6 Dozer', pieces: 1, hours: 24, unitCost: 28.41, actualUnit: 78.71, cost: 1889.04 },
  { type: 'equipment', code: 'D8', description: 'Cat D8 Dozer', pieces: 1, hours: 24, unitCost: 68.18, actualUnit: 128.48, cost: 3083.52 },
  { type: 'equipment', code: 'EX330', description: 'Cat 330 Excavator', pieces: 1, hours: 24, unitCost: 36.93, actualUnit: 85.23, cost: 2045.52 },
  { type: 'equipment', code: 'L953', description: 'Cat 953 Track Loader', pieces: 1, hours: 24, unitCost: 30.11, actualUnit: 77.41, cost: 1857.84 },
  { type: 'equipment', code: 'T2T', description: 'Truck 2 Ton Flatbed', pieces: 1, hours: 24, unitCost: 7.67, actualUnit: 22.5, cost: 540 },
  { type: 'equipment', code: 'XPU', description: 'Pickup Truck', pieces: 1, hours: 24, unitCost: 6.82, actualUnit: 16.76, cost: 402.24 },
  { type: 'labor', code: 'L1', description: 'Laborer, Unskilled', pieces: 2, hours: 48, unitCost: 18, actualUnit: 24.65, cost: 1182.96 },
  { type: 'labor', code: 'L2', description: 'Laborer, Semiskilled', pieces: 1, hours: 24, unitCost: 18.5, actualUnit: 25.22, cost: 605.31 },
  { type: 'labor', code: 'O1', description: 'Operator, General', pieces: 3, hours: 72, unitCost: 20, actualUnit: 29.55, cost: 2127.6 },
  { type: 'labor', code: 'O4', description: 'Operator, Excavator', pieces: 1, hours: 24, unitCost: 22, actualUnit: 31.86, cost: 764.52 },
  { type: 'labor', code: 'O9', description: 'Operator, Foreman', pieces: 1, hours: 24, unitCost: 28, actualUnit: 38.77, cost: 930.48 },
];
