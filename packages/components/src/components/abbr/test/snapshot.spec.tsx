import { KolAbbrTag } from '../../../core/component-names';
import type { AbbrProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolAbbr } from '../shadow';

executeSnapshotTests<AbbrProps>(
	KolAbbrTag,
	[KolAbbr],
	[
		{ _label: 'Text' },
		{ _label: 'Text', _tooltipAlign: 'top' },
		{ _label: 'Text', _tooltipAlign: 'left' },
		{ _label: 'Text', _tooltipAlign: 'right' },
		{ _label: 'Text', _tooltipAlign: 'bottom' },
	],
);
