import React, { forwardRef } from 'react';

import { KolSelect } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components, SelectOption } from '@public-ui/components';
import { COUNTRY_OPTIONS } from '../../../shares/country';

const SALUTATION_OPTIONS: SelectOption<string>[] = [
	{
		label: 'Keine Auswahl',
		value: '',
		disabled: true,
	},
	{
		label: 'Frau',
		value: 'Frau',
	},
	{
		label: 'Herr',
		value: 'Herr',
	},
	{
		label: 'Divers',
		value: 'Divers',
	},
];

export const SelectCases = forwardRef<HTMLKolSelectElement, Components.KolSelect>(function SelectCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolSelect
				{...props}
				ref={ref}
				_accessKey="a"
				_options={SALUTATION_OPTIONS}
				_label="Anrede"
				_icons={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="Disabled" _disabled />
			<KolSelect {...props} _options={SALUTATION_OPTIONS} _label="Anrede mit Fehler" _msg={{ _type: 'error', _description: ERROR_MSG }} _touched />
			<KolSelect {...props} _options={COUNTRY_OPTIONS} _label="Mehrfachauswahl" _multiple />
			<KolSelect
				{...props}
				_options={COUNTRY_OPTIONS}
				_label="Mehrfachauswahl mit Fehler"
				_multiple
				_required
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
			/>
		</div>
	);
});
