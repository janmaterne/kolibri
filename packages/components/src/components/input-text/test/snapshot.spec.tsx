import { KolInputTextTag } from '@component-names';
import type { InputTextProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolInputText } from '../shadow';

executeInputSnapshotTests<InputTextProps>(
	KolInputTextTag,
	[KolInputText],
	{
		_value: 'Value',
	},
	{ hasSmartButton: true },
);
