import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';

type AriaProps = {
	'aria-label'?: string;
	'aria-describedby'?: string;
	'aria-selected'?: boolean;
	'aria-controls'?: string;
	'aria-autocomplete'?: 'both';
	'aria-activedescendant'?: string;
};

type DefaultProps = JSXBase.HTMLAttributes & {
	ariaDescribedBy?: string[];
	hideLabel?: boolean;
	label?: string;
	value: string | number | string[];
};

type TextProps = DefaultProps & {
	type: 'text';
};

type NumberProps = DefaultProps & {
	type: 'number';
	min?: number | string;
	max?: number | string;
};

type ComboBoxProps = DefaultProps & {
	type: 'combobox';
	open: boolean;
	focusedOptionIndex: number;
};

type InputProps = TextProps | NumberProps | ComboBoxProps;

const Input: FC<InputProps> = (props) => {
	const { type: inputType, ariaDescribedBy, hideLabel, label, ...other } = props;

	let inputProps: JSXBase.InputHTMLAttributes<HTMLInputElement> & AriaProps = {
		type: 'text',
		autoCapitalize: 'off',
		autoCorrect: 'off',
		spellcheck: false,

		'aria-describedby': ariaDescribedBy?.length ? ariaDescribedBy.join(' ') : undefined,
		'aria-label': hideLabel && label ? label : undefined,
		...other,
	};

	switch (inputType) {
		case 'combobox':
			inputProps = {
				...inputProps,
				type: 'text',
				role: 'combobox',
				'aria-selected': Boolean(props.open),
				'aria-controls': 'listbox',
				'aria-autocomplete': 'both',
				'aria-activedescendant': props.open && props.focusedOptionIndex >= 0 ? `option-${props.focusedOptionIndex}` : undefined,
			};
			break;
	}

	return <input {...inputProps} />;
};

export default Input;
