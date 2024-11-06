import { KolInputPasswordTag } from '@component-names';
import type { InputPasswordProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolInputPassword } from '../shadow';

executeInputSnapshotTests<InputPasswordProps>(
	KolInputPasswordTag,
	[KolInputPassword],
	{
		_value: 'Value',
	},
	{ hasSmartButton: true },
);
