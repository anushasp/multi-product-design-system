import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SignOffQuestion, type Answer } from './SignOffQuestion';
const meta: Meta<typeof SignOffQuestion> = { title: 'Patterns/Sign-off question', component: SignOffQuestion };
export default meta;
export const Bilingual: StoryObj<typeof SignOffQuestion> = { render: function R() { const [a, setA] = useState<Answer>('none');
  return <div style={{ width: 320 }}><SignOffQuestion english="I left the job uninjured today." spanish="Hoy salí del trabajo sin lesiones." answer={a} onAnswer={setA} /></div>; } };
