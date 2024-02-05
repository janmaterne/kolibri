import React, { forwardRef } from 'react';

import { KolInputRadio } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputRadioCases = forwardRef<HTMLKolInputRadioElement, Components.KolInputRadio>(function InputRadioCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputRadio
				{...props}
				_options="[{'disabled':true,'label':'Frau (disabled)','value':'Frau'},{'label':'Herr'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede"
			/>
			<KolInputRadio
				{...props}
				_required
				_error={ERROR_MSG}
				_touched
				_value="Firma1"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)','value':'Herr'},{'label':'Firma','value':'Firma1'}]"
				_label="Anrede (mit Fehler)"
			/>
			<KolInputRadio
				{...props}
				_id='test'
				_required
				_touched
				_value="124"
				_options="[{'label':'Frau1','value':'123'},{'label':'Herr2','value':'124'},{'label':'Firma3','value':'125'}]"
				_label="Anrede (mit Fehler)"
			/>
			<KolInputRadio
				{...props}
				ref={ref}
				_accessKey="A"
				_orientation="horizontal"
				_required
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (horizontal)"
			/>
			<KolInputRadio
				{...props}
				_disabled
				_orientation="horizontal"
				_required
				_error={ERROR_MSG}
				_touched
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede (horizontal mit Fehler)"
			/>
			<KolInputRadio
				{...props}
				_disabled
				_value="Firma"
				_options="[{'label':'Frau','value':'Frau'},{'disabled':true,'label':'Herr (disabled)'},{'label':'Firma','value':'Firma'}]"
				_label="Anrede"
				_touched
			/>
		</div>
	);
});
