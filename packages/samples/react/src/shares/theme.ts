import { SelectOption } from '@public-ui/components';

export type Theme =
	| 'bamf'
	| 'bmf'
	| 'by'
	| 'bzst'
	| 'default'
	| 'desy-v1'
	| 'desy-v2'
	| 'ecl-ec'
	| 'ecl-eu'
	| 'itzbund'
	| 'mapz'
	| 'th'
	| 'unstyled'
	| 'zoll-v2'
	| 'zoll-v3';

export const isTheme = (value: unknown) => {
	return (
		typeof value === 'string' &&
		(value === 'unstyled' ||
			value === 'bamf' ||
			value === 'bmf' ||
			value === 'by' ||
			value === 'bzst' ||
			value === 'default' ||
			value === 'desy-v1' ||
			value === 'desy-v2' ||
			value === 'ecl-ec' ||
			value === 'ecl-eu' ||
			value === 'itzbund' ||
			value === 'mapz' ||
			value === 'th' ||
			value === 'zoll-v2' ||
			value === 'zoll-v3')
	);
};

export type Store = {
	darkMode: boolean;
	theme: Theme;
};

export const THEME_OPTIONS: SelectOption<Theme>[] = [
	{
		label: 'Unstyled',
		value: 'unstyled',
	},
	// {
	// 	disabled: true,
	// 	label: 'Bundesamt für Migration und Flüchtlinge',
	// 	value: 'bamf',
	// },
	{
		label: 'Bundesministerium der Finanzen',
		value: 'bmf',
	},
	// {
	// 	label: 'Freistaat Bayern (StMWi)',
	// 	value: 'by',
	// },
	{
		label: 'Bundeszentralamt für Steuern',
		value: 'bzst',
	},
	{
		label: 'Default',
		value: 'default',
	},
	// {
	// 	disabled: true,
	// 	label: 'DESY-Styleguide (v1)',
	// 	value: 'desy-v1',
	// },
	{
		label: 'DESY-Styleguide (v2)',
		value: 'desy-v2',
	},
	{
		label: 'European Commission (ECL)',
		value: 'ecl-ec',
	},
	{
		label: 'European Union (ECL)',
		value: 'ecl-eu',
	},
	{
		label: 'Informationstechnikzentrum Bund',
		value: 'itzbund',
	},
	{
		label: 'Freistaat Thüringen',
		value: 'th',
	},
	{
		label: '.',
		value: 'mapz',
	},
	{
		label: '..',
		value: 'zoll-v2',
	},
	{
		label: '...',
		value: 'zoll-v3',
	},
];
