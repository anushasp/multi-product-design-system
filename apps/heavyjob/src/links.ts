/**
 * Design system sites linked from the header and footer.
 * Hosted builds default to the live sites; `npm run dev` points at the local docs and Storybook.
 * VITE_DOCS_URL / VITE_STORYBOOK_URL override both.
 */
const dev = import.meta.env.DEV;
export const DOCS_URL: string = import.meta.env.VITE_DOCS_URL ?? (dev ? 'http://localhost:5175' : 'https://groundwork.anushasaripella.com');
export const STORYBOOK_URL: string = import.meta.env.VITE_STORYBOOK_URL ?? (dev ? 'http://localhost:6006' : 'https://heavystorybook.anushasaripella.com');
