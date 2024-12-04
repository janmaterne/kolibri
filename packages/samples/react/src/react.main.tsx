import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { setTagNameTransformer } from '@public-ui/react';

import { bootstrap, isInitialized, KoliBriDevHelper } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT, ECL_EC, ECL_EU, ITZBund } from '@public-ui/themes';

import { App } from './App';

import type { Generic } from 'adopted-style-sheets';

type Theme = Generic.Theming.RegisterPatch<string, string, string>;

const ENABLE_TAG_NAME_TRANSFORMER =
	process.env.ENABLE_TAG_NAME_TRANSFORMER === 'true' || new URL('https://x' + location.hash.substring(1)).searchParams.has('enableTagNameTransformer');

const tagNameTransformer = (tagName: string) => `${tagName}-sample`;
if (ENABLE_TAG_NAME_TRANSFORMER) {
	setTagNameTransformer(tagNameTransformer);
}

const getThemes = async () => {
	if (process.env.THEME_MODULE) {
		/* Visual regression testing mode: Themes are overridden with a certain theme module, that should be used instead. */
		const { [(process.env.THEME_EXPORT as string) || 'default']: theme } = (await import(process.env.THEME_MODULE)) as Record<string, Theme>;
		return [theme];
	}

	/* List of regular sample app themes */
	return [DEFAULT, ECL_EC, ECL_EU, ITZBund] as Theme[];
};

void (async () => {
	try {
		console.info('bootstap is initialized: ', isInitialized());
		console.info('start kolibri bootstrap');

		await bootstrap(
			await getThemes(),
			() => {
				// @see https://github.com/ionic-team/stencil/issues/2847
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				defineCustomElements(window, {
					transformTagName: ENABLE_TAG_NAME_TRANSFORMER ? tagNameTransformer : undefined,
				} as any);
			},
			{
				theme: process.env.THEME_MODULE
					? undefined
					: {
							detect: 'auto',
						},
				translation: {
					name: 'en',
				},
				/**
				 * You can add your own translations here.
				 */
				translations: new Set([
					(t) =>
						t('en', {
							// https://github.com/public-ui/kolibri/blob/develop/packages/components/src/locales/en.ts
							'kol-error': 'Tiny error!',
						}),
					(t) =>
						t('de', {
							// https://github.com/public-ui/kolibri/blob/develop/packages/components/src/locales/de.ts
							'kol-error': 'Kleiner Fehler!',
						}),
				]),
				transformTagName: ENABLE_TAG_NAME_TRANSFORMER ? tagNameTransformer : undefined,
				environment: process.env.NODE_ENV === 'development' ? 'development' : 'production',
			},
		);

		/**
		 * You should patch the theme after the components and your default theme are registered.
		 */
		KoliBriDevHelper.patchTheme(
			'default',
			{
				'KOL-SPIN': `
					.bg-spin-2 {
						background-color: red;
					}
					.bg-spin-3 {
						background-color: gold;
					}
				`,
			},
			{
				append: true,
			},
		);

		console.info('bootstap is initialized: ', isInitialized());
	} catch (error) {
		console.warn('Theme registration failed:', error);
	}

	/**
	 * You should patch the theme after the components and your default theme are registered.
	 **
	 * ↓ That is a tiny sample!
	 */
	// KoliBriDevHelper.patchTheme(
	// 	'default',
	// 	{
	// 		'KOL-BUTTON': 'button{border:2px solid red;}',
	// 	},
	// 	{
	// 		append: true,
	// 	},
	// );

	const htmlDivElement = document.querySelector('div#app');
	if (htmlDivElement instanceof HTMLDivElement) {
		const root = createRoot(htmlDivElement);
		root.render(
			<StrictMode>
				<Router>
					<App />
				</Router>
			</StrictMode>,
		);
	}
})();
