import { KolInputEmailTag } from '@component-names';
import type { InputEmailProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolInputEmail } from '../shadow';

executeInputSnapshotTests<InputEmailProps>(
	KolInputEmailTag,
	[KolInputEmail],
	{
		_value: 'email@test.de',
	},
	{ hasSmartButton: true },
);

executeInputSnapshotTests<InputEmailProps>(
	KolInputEmailTag,
	[KolInputEmail],
	{
		_value: 'email@test.de',
		_suggestions: ['email1@test.de', 'email2@test.de', 'email3@test.de'],
	},
	{ hasSmartButton: true },
);
