import type { Meta, StoryObj } from '@storybook/react';
import { ReviewEntry } from './ReviewEntry';
const meta: Meta<typeof ReviewEntry> = { title: 'Patterns/Review entry', component: ReviewEntry, args: { source: 'Voice', entry: 'Installed 500 CY on 040-201100 Excavation, Scraper', evidence: '“Got about five hundred yards on the scraper cut today.” 3:58 PM', state: 'open' } };
export default meta;
type S = StoryObj<typeof ReviewEntry>;
export const Open: S = {};
export const Accepted: S = { args: { state: 'accepted' } };
export const NeedsDecision: S = { args: { state: 'needs-decision', source: 'Machine', entry: 'Cat 320 Excavator ran 9.4 engine hrs, time card shows 10', evidence: 'From telematics', primaryLabel: 'Use 9.4', secondaryLabel: 'Keep 10' } };
