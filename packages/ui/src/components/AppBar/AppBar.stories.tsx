import type { Meta, StoryObj } from '@storybook/react';
import { AppBar } from './AppBar';
import { PageHeader } from '../PageHeader/PageHeader';
import { Button } from '../Button/Button';
const meta: Meta<typeof AppBar> = { title: 'Patterns/App bar & Page header', component: AppBar, args: { product: 'HeavyBid', tabs: ['Projects', 'Estimates', 'Quotes', 'Contacts'], active: 'Estimates', searchPlaceholder: 'Search estimate' } };
export default meta;
export const Bar: StoryObj<typeof AppBar> = {};
export const WithPageHeader: StoryObj<typeof AppBar> = { render: (a) => (<div><AppBar {...a} /><PageHeader breadcrumb="Estimates / STB001" title="Downtown Eastside Drainage" status="in-progress" metric={{ label: 'Bid total', value: '$173,762.50' }} secondaryAction={<Button variant="secondary">Review</Button>} primaryAction={<Button>Generate proposal</Button>} /></div>) };
