import React from 'react';

import { KolIcon } from '@public-ui/react';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const IconBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolIcon renders an icon. This sample shows one regular icon and one with a custom style-property, changing the icon color.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolIcon _label="" _icons="codicon codicon-home" />
			<KolIcon
				style={{
					color: 'red',
				}}
				_label=""
				_icons="codicon codicon-home"
			/>
		</div>
	</>
);
