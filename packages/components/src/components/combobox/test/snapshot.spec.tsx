import { KolComboboxTag } from '@component-names';
import type { ComboboxProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolCombobox } from '../shadow';

executeInputSnapshotTests<ComboboxProps>(KolComboboxTag, [KolCombobox], {
	_value: 'Herr',
	_suggestions: ['Frau', 'Herr', 'Divers'],
});
