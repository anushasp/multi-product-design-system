import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
const meta: Meta<typeof Stepper> = { title: 'Patterns/Stepper', component: Stepper, args: { label: 'Quote folder progress', steps: [
  { label: 'Created', state: 'done' }, { label: 'In progress', state: 'done' }, { label: 'Quoted', state: 'current' }, { label: 'Selected', state: 'upcoming' }, { label: 'Done', state: 'upcoming' }] } };
export default meta;
export const QuoteFolder: StoryObj<typeof Stepper> = {};
