import { KolInputFileTag } from '@component-names';
import type { InputFileProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolInputFile } from '../shadow';

executeInputSnapshotTests<InputFileProps>(
	KolInputFileTag,
	[KolInputFile],
	{
		_value: 'File',
	},
	{ hasSmartButton: true },
);
