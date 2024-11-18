import { KolSpanWcTag } from '../../../core/component-names';
import type { SpanProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolSpanWc } from '../component';

executeSnapshotTests<SpanProps>(
	KolSpanWcTag,
	[KolSpanWc],
	[{ _label: 'Text' }, { _label: 'Text', _badgeText: 'v' }, { _label: 'Text', _hideLabel: true }, { _label: 'Text', _icons: 'codicon codicon-home' }],
);
