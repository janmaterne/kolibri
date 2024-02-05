import React from 'react';

import { KolLink } from '@public-ui/react';

import type { FC } from 'react';

export const LinkIcons: FC = () => (
	<div className="grid gap-4">
		<KolLink _icons="codicon codicon-home" _label="Ich bin ein Link mit Icon links" _href="#/sample-page" />
		<KolLink
			_icons={{
				right: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit Icon rechts"
			_href="#/sample-page"
		/>
		<KolLink
			_icons={{
				top: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit Icon oben"
			_href="#/sample-page"
		/>
		<KolLink
			_icons={{
				bottom: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit Icon unten"
			_href="#/sample-page"
		/>
		<KolLink
			_icons={{
				top: 'codicon codicon-home',
				right: 'codicon codicon-home',
				bottom: 'codicon codicon-home',
				left: 'codicon codicon-home',
			}}
			_label="Ich bin ein Link mit allen Icons"
			_href="#/sample-page"
		/>
	</div>
);
