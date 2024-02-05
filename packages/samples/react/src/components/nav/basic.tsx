import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC } from 'react';

export const NavBasic: FC = () => (
	<KolNav
		_ariaLabel="Main navigation"
		_links={[
			{
				_label: 'Homepage',
				_icons: 'codicon codicon-home',
				_href: '#/sample-page',
			},
			{
				_label: '2 Navigation point',
				_href: '#/sample-page',
			},
			{
				_active: true,
				_label: '3 Navigation point',
				_href: '#/sample-page',
				_children: [
					{
						_label: '3.1 Navigation point',
						_href: '#/sample-page',
					},
					{
						_label: '3.2 Navigation point',
						_href: '#/sample-page',
						_target: 'asdasd',
					},
					{
						_active: true,
						_label: '3.3 Navigation point',
						_href: '#/sample-page',
						_icons: 'fa-solid fa-cat',
						_children: [
							{
								_active: true,
								_label: '3.3.1 Navigation point (active)',
								_href: '#/sample-page',
							},
							{ _label: '3.3.2 Navigation point', _href: '#/sample-page' },
						],
					},
					{
						_label: '3.4 Navigation point',
						_href: '#/sample-page',
						_children: [
							{ _label: '3.4.1 Navigation point', _href: '#/sample-page' },
							{ _label: '3.4.2 Navigation point', _href: '#/sample-page' },
						],
					},
					{ _label: '3.5 Navigation point', _href: '#/sample-page' },
				],
			},
			{ _label: '4 Navigation point', _href: '#/sample-page' },
		]}
		_hasCompactButton
	/>
);
