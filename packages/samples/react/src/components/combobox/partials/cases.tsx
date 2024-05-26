import React, { forwardRef } from 'react';

import { KolCombobox } from '@public-ui/react';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
import { COUNTRY_SUGGESTIONS } from '../../../shares/country';

export const ComboboxCases = forwardRef<HTMLKolSelectElement, Components.KolSelect>(function ComboboxCases(props) {
	return (
		<div className="grid gap-4">
			<KolCombobox
				{...props}
				_hint={HINT_MSG}
				_label="Label"
				_suggestions={COUNTRY_SUGGESTIONS}
				_value={'Deutschland'}
				_on={{
					onBlur: console.log,
					onChange: console.log,
					onClick: console.log,
					onFocus: console.log,
				}}
			/>
			<KolCombobox {...props} _label="Disabled" _suggestions={COUNTRY_SUGGESTIONS} _value={'Deutschland'} _disabled />
			<KolCombobox
				{...props}
				_suggestions={COUNTRY_SUGGESTIONS}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_label="Label"
				_placeholder="Placeholder"
				_required
			/>
		</div>
	);
});
