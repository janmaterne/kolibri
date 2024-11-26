import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { W3CInputValue } from '../../../schema';

export type NativeOptionProps = Omit<JSXBase.OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'label'> & {
	selectedValue?: W3CInputValue | W3CInputValue[];
	value: W3CInputValue;
	label: W3CInputValue;
};

const NativeOptionFc: FC<NativeOptionProps> = ({ selectedValue, selected, value, label, ...other }) => {
	if (!selectedValue) {
		selectedValue = [];
	} else if (!Array.isArray(selectedValue)) {
		selectedValue = [selectedValue];
	}

	return (
		<option selected={selected || selectedValue.includes(label)} value={value} {...other}>
			{label}
		</option>
	);
};

export default NativeOptionFc;
