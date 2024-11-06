import { KolSelectTag } from '@component-names';
import type { SelectProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolSelect } from '../shadow';

const options = [
	{
		label: 'Frau',
		value: 'Frau',
		disabled: true,
	},
	{
		label: 'Herr',
		value: 'Herr',
	},
	{
		label: 'Divers',
		value: 'Divers',
	},
];

executeInputSnapshotTests<SelectProps>(KolSelectTag, [KolSelect], {
	_options: options,
});

executeInputSnapshotTests<SelectProps>(KolSelectTag, [KolSelect], {
	_options: options,
	_multiple: true,
});
