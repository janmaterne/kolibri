import React, { forwardRef } from 'react';

import { SingleSelectCases } from './cases';

import type { Components } from '@public-ui/components';
export const SingleSelectVariants = forwardRef<HTMLKolSingleSelectElement, Components.KolSingleSelect>(function SingleSelectVariant(props, ref) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<fieldset>
				<legend>Text</legend>
				<SingleSelectCases {...props} />
			</fieldset>
			<fieldset>
				<legend>Text (hideLabel)</legend>
				<SingleSelectCases ref={ref} {...props} _hideLabel />
			</fieldset>
		</div>
	);
});
