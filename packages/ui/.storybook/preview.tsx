import type { Preview } from '@storybook/react';
import { ThemeProvider, type Mode, type Brand } from '../src';

const preview: Preview = {
  globalTypes: {
    mode: { description: 'Semantic base mode', defaultValue: 'office-light', toolbar: { title: 'Mode', icon: 'mirror', items: [
      { value: 'office-light', title: 'Office light' }, { value: 'office-dark', title: 'Office dark' }, { value: 'field', title: 'Field' }], dynamicTitle: true } },
    brand: { description: 'Semantic brand', defaultValue: 'hcss', toolbar: { title: 'Brand', icon: 'paintbrush', items: [
      { value: 'hcss', title: 'HCSS (concept)' }, { value: 'demo', title: 'Demo brand' }], dynamicTitle: true } },
  },
  decorators: [
    (Story, ctx) => (
      <ThemeProvider mode={ctx.globals.mode as Mode} brand={ctx.globals.brand as Brand} style={{ padding: 24, minHeight: '100vh' }}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: { layout: 'fullscreen', controls: { expanded: true } },
};
export default preview;
