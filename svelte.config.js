import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// SPA - we use the static adapter
		// https://kit.svelte.dev/docs/adapter-static
		adapter: adapter({ fallback: "index.html" }),
	}
};

export default config;
