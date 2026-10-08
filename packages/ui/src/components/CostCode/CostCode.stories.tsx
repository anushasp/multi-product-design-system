import type { Meta, StoryObj } from '@storybook/react';
import { CostCode } from './CostCode';
import { AIMarker } from '../AIMarker/AIMarker';
const meta: Meta<typeof CostCode> = { title: 'Base/Cost code & AI marker', component: CostCode, args: { code: '040-201100' } };
export default meta;
export const Code: StoryObj<typeof CostCode> = {};
export const AI: StoryObj<typeof CostCode> = { render: () => <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><AIMarker /> Read from vendor quote</span> };
