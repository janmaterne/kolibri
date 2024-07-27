import React from 'react';
import { KolLink } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const LinkIcons: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolLink with icons in different alignments and combinations.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolLink _icons="codicon codicon-home" _label="Ich bin ein Link mit Icon links" _href="#/back-page" />
			<KolLink
				_icons={{
					right: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon rechts"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					top: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon oben"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					bottom: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit Icon unten"
				_href="#/back-page"
			/>
			<KolLink
				_icons={{
					top: 'codicon codicon-home',
					right: 'codicon codicon-home',
					bottom: 'codicon codicon-home',
					left: 'codicon codicon-home',
				}}
				_label="Ich bin ein Link mit allen Icons"
				_href="#/back-page"
			/>
		</div>
	</>
);
