import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropTableCallbacks, PropTableData, PropTableDataFoot, TableHeaderCells } from '../props';
import type { KoliBriTableDataType } from '../types';
import type { PropTableHeaderCells } from '../props/table-header-cells';

type RequiredProps = PropLabel & PropTableData & PropTableHeaderCells;

type OptionalProps = {
	minWidth: string;
} & PropTableDataFoot &
	PropTableCallbacks;

type RequiredStates = {
	headerCells: TableHeaderCells;
	data: KoliBriTableDataType[];
} & PropLabel;

type OptionalStates = {
	minWidth: string;
	dataFoot: KoliBriTableDataType[];
} & PropTableCallbacks;

export type TableStatelessProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TableStatelessStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TableStatelessAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;