import { KolAvatarTag } from '@component-names';
import type { AvatarProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolAvatar } from '../shadow';
import { KolAvatarWc } from '../component';

executeSnapshotTests<AvatarProps>(
	KolAvatarTag,
	[KolAvatar, KolAvatarWc],
	[
		{ _label: 'Erika Maria Mustermann', _src: undefined },
		{ _label: 'Erika', _src: undefined },
		{ _label: 'Erika', _src: '/image.webp' },
	],
);
