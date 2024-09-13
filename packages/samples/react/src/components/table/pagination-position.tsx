import type { FC } from 'react';
import React from 'react';

import { KolHeading, KolTable } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';
import { DATE_FORMATTER } from './formatter';
import type { Data } from './test-data';
import { DATA } from './test-data';

import type { KoliBriTableHeaders, KoliBriTablePaginationProps } from '@public-ui/components';

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Order', key: 'order' },
			{ label: 'Date', key: 'date', render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as unknown as Data).date) },
		],
	],
};
const PAGINATION: KoliBriTablePaginationProps = { _page: 2 };

export const PaginationPosition: FC = () => (
	<div className="w-full grid gap-14">
		<SampleDescription>
			<p>This sample shows KolTable with different pagination positions.</p>
		</SampleDescription>

		<section className="w-full flex flex-col gap-14">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Table with pagination at the bottom."></KolHeading>
				<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION} _paginationPosition="bottom"></KolTable>
			</section>
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Table with pagination at the top."></KolHeading>
				<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION} _paginationPosition="top"></KolTable>
			</section>
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Table with pagination at both top and bottom."></KolHeading>
				<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION} _paginationPosition="both"></KolTable>
			</section>
		</section>
	</div>
);
