import type { Meta, StoryObj } from '@storybook/react';
import { IPadNavBar } from './IPadNavBar';
import { Button } from '../Button/Button';
const meta: Meta<typeof IPadNavBar> = { title: 'Patterns/iPad nav bar', component: IPadNavBar, args: { backLabel: 'Jobs', title: 'Time card · 07-1960 FM 1960', sync: 'device' } };
export default meta;
export const WithAction: StoryObj<typeof IPadNavBar> = { args: { action: <Button>Send</Button> } };
export const Sent: StoryObj<typeof IPadNavBar> = { args: { sync: 'sent' } };
