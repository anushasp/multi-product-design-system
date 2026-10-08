import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover } from './Popover';
import { AIMarker } from '../AIMarker/AIMarker';
import { AISourcePopover } from '../AISourcePopover/AISourcePopover';
const meta: Meta = { title: 'Patterns/Popover' };
export default meta;
export const AnchoredToAIMarker: StoryObj = { render: function R() { const [open, setOpen] = useState(true);
  return <div style={{ padding: '0 0 260px 360px' }}><Popover open={open} onClose={() => setOpen(false)} anchor={<><AIMarker onClick={() => setOpen((o) => !o)} expanded={open} /><b>$120.00</b></>}>
    <AISourcePopover title="Read from vendor quote" source="Adam’s Pipe Supply, quote PDF page 2, line 4" confidence="High" level={0.92} onAccept={() => setOpen(false)} /></Popover></div>; } };
