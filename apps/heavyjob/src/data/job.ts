export const job = { id: '07-1960', name: 'FM 1960', date: 'Thu, Aug 2' };
export const costCodes = [
  { code: '040-201100', description: 'Excavation, Scraper', quantity: '500.0 CY' },
  { code: '010-100001', description: 'Clear & Grub - Heavy', quantity: '1.0 AC' },
];
export interface CrewRow { id: string; name: string; role: string; equipment?: string; }
export const crew: CrewRow[] = [
  { id: 'ortega', name: 'Ray Ortega', role: 'Foreman' },
  { id: 'herrera', name: 'Luis Herrera', role: 'Laborer' },
  { id: 'brooks', name: 'Dana Brooks', role: 'Laborer' },
  { id: 'vega', name: 'Marisol Vega', role: 'Operator' },
  { id: '02-001', name: 'Cat D-3 Dozer', role: 'Linked to Marisol Vega', equipment: '02-001' },
  { id: 'alvarez', name: 'Ken Alvarez', role: 'Operator' },
  { id: '04-101', name: 'Cat 320 Excavator', role: 'Linked to Ken Alvarez', equipment: '04-101' },
];
export const signoffQuestions = [
  { en: 'I confirm these hours are correct.', es: 'Confirmo que estas horas son correctas.' },
  { en: 'I left the job uninjured today.', es: 'Hoy salí del trabajo sin lesiones.' },
  { en: 'I was offered a break every 4 hours.', es: 'Me ofrecieron un descanso cada 4 horas.' },
];
export type Source = 'Voice' | 'Photo' | 'Machine';
export interface DraftEntry { id: string; source: Source; entry: string; evidence: string; conflict?: { keep: string; use: string } }
export const draft: DraftEntry[] = [
  { id: 'qty', source: 'Voice', entry: 'Installed 500 CY on 040-201100 Excavation, Scraper', evidence: '“Got about five hundred yards on the scraper cut today.” 3:58 PM' },
  { id: 'breakdown', source: 'Photo', entry: 'Equipment breakdown: 02-001 Cat D-3 Dozer', evidence: 'Tagged from photo at 2:41 PM, hydraulic line' },
  { id: 'hours', source: 'Machine', entry: 'Cat 320 Excavator ran 9.4 engine hrs, time card shows 10', evidence: 'From telematics', conflict: { keep: 'Keep 10', use: 'Use 9.4' } },
  { id: 'diary', source: 'Voice', entry: 'Diary: light rain 6–8 AM, scraper start delayed 2 hrs', evidence: '“Rain this morning, didn’t start the scrapers till eight.” 8:12 AM' },
];
