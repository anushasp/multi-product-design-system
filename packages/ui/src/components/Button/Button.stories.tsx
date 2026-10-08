import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
const meta: Meta<typeof Button> = { title: 'Base/Button', component: Button, args: { children: 'Button', variant: 'primary', size: 'md' } };
export default meta;
type S = StoryObj<typeof Button>;
export const Primary: S = {};
export const Secondary: S = { args: { variant: 'secondary' } };
export const Tertiary: S = { args: { variant: 'tertiary' } };
export const AddPattern: S = { args: { variant: 'secondary', showPlus: true, children: 'Add vendor' } };
export const Disabled: S = { args: { disabled: true, children: 'Submit report' } };
export const AllVariants: S = { render: () => (
  <div style={{ display: 'grid', gap: 12 }}>
    {(['md', 'sm'] as const).map((size) => (
      <div key={size} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button size={size}>Apply</Button><Button size={size} variant="secondary">Review</Button><Button size={size} variant="tertiary" showPlus>Add resource</Button><Button size={size} disabled>Disabled</Button>
      </div>))}
  </div>) };
