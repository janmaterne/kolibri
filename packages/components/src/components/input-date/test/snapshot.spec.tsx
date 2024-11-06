import { KolInputDateTag } from '@component-names';
import type { InputDateProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolInputDate } from '../shadow';

executeInputSnapshotTests<InputDateProps>(KolInputDateTag, [KolInputDate], {
	_value: new Date(2025, 0, 1),
	// _suggestions: [ ]
});
