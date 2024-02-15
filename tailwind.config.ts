import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'
import {pixelTheme} from './pixel-theme';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			borderRadius: {
				'30': '30px'
			},
		},
		maxWidth: {
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			'300': '300px',
		},
		maxHeight: {
			'1/4': '25%',
			'1/2': '50%'
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [
					pixelTheme
				],
			},
		}),
	],
} satisfies Config;
