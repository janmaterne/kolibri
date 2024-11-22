import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { getDefaultProps } from '../_helpers/getDefaultProps';
import type { DefaultInputProps, AriaProps } from '../_types';

export type ComboboxProps = DefaultInputProps<JSXBase.InputHTMLAttributes<HTMLInputElement>> & {
	value: string | number | string[];
	focusedOptionIndex?: number;
	open?: boolean;
};

const ComboboxFc: FC<ComboboxProps> = (props) => {
	const { open, ariaDescribedBy, hideLabel, label, focusedOptionIndex = -1, ...other } = props;

	const inputProps: JSXBase.InputHTMLAttributes<HTMLInputElement> & AriaProps = {
		...other,
		...getDefaultProps({ ariaDescribedBy, hideLabel, label }),
		type: 'text',
		role: 'combobox',
		'aria-selected': Boolean(open),
		'aria-controls': 'listbox',
		'aria-autocomplete': 'both',
		'aria-activedescendant': open && focusedOptionIndex >= 0 ? `option-${focusedOptionIndex}` : undefined,
	};

	return <input {...inputProps} />;
};

export default ComboboxFc;
