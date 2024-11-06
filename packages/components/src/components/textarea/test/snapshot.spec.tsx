import { KolTextareaTag } from '@component-names';
import type { TextareaProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolTextarea } from '../shadow';

executeInputSnapshotTests<TextareaProps>(KolTextareaTag, [KolTextarea], {
	_rows: 5,
	_value: 'Value',
});
