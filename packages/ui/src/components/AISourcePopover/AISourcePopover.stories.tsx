import type { Meta, StoryObj } from '@storybook/react';
import { AISourcePopover } from './AISourcePopover';
const meta: Meta<typeof AISourcePopover> = { title: 'Patterns/AI source popover', component: AISourcePopover, args: {
  title: 'Read from vendor quote', source: 'Adam’s Pipe Supply, quote PDF page 2, line 4: “21 in RCP Class III … $120.00/LF”', confidence: 'High', level: 0.92, editLabel: 'Edit price', viewLabel: 'Open quote', onAccept: () => {} } };
export default meta;
export const VendorQuote: StoryObj<typeof AISourcePopover> = {};
