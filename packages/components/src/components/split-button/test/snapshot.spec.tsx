import { KolSplitButtonTag } from '@component-names';
// import type { SplitButtonAPI } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolSplitButton } from '../shadow';

/**
 * TODO: error TS2344: Type 'SplitButtonAPI' does not satisfy the constraint 'Record<string, unknown>'.
 * Index signature for type 'string' is missing in type 'SplitButtonAPI'.
 */

executeSnapshotTests(
	KolSplitButtonTag,
	[KolSplitButton],
	[
		{ _label: 'Label' },
		{ _label: 'Label', _hideLabel: true },
		{ _label: 'Label', _disabled: true },
		{ _label: 'Label', _name: 'Name' },
		{ _label: 'Label', _icons: 'codicon codicon-git-pull-request' },

		...['primary', 'secondary', 'normal', 'danger', 'ghost'].map((_variant) => ({
			_label: 'Label',
			_variant,
		})),
	],
);
