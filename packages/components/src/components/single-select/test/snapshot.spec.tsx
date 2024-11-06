import { KolSingleSelectTag } from '@component-names';
import type { SingleSelectProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolSingleSelect } from '../shadow';

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

executeInputSnapshotTests<SingleSelectProps>(KolSingleSelectTag, [KolSingleSelect], {
	_options: options,
});
