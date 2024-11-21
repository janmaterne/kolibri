import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase, VNode } from '@stencil/core/internal';

type AriaProps = {
	'aria-label'?: string;
	'aria-describedby'?: string;
	'aria-selected'?: boolean;
	'aria-controls'?: string;
	'aria-autocomplete'?: 'both';
	'aria-activedescendant'?: string;
};

export type InputProps = JSXBase.InputHTMLAttributes<HTMLInputElement> & {
	id: string;
	ariaDescribedBy?: string[];
	hideLabel?: boolean;
	label?: string;
	value: string | number | string[];
	suggestions?: VNode;
};

const Input: FC<InputProps> = (props) => {
	const { ariaDescribedBy, hideLabel, label, suggestions, ...other } = props;

	const inputProps: JSXBase.InputHTMLAttributes<HTMLInputElement> & AriaProps = {
		type: 'text',
		title: '',
		autoCapitalize: 'off',
		autoCorrect: 'off',
		spellcheck: false,

		list: suggestions ? `${other.id}-list` : undefined,

		'aria-describedby': ariaDescribedBy?.length ? ariaDescribedBy.join(' ') : undefined,
		'aria-label': hideLabel && label ? label : undefined,
		...other,
	};

	// if (inputType === 'combobox') {
	// 	const { open, focusedOptionIndex } = props as ComboBoxProps;

	// 	inputProps = {
	// 		...inputProps,
	// 		role: 'combobox',
	// 		'aria-selected': Boolean(open),
	// 		'aria-controls': 'listbox',
	// 		'aria-autocomplete': 'both',
	// 		'aria-activedescendant': open && focusedOptionIndex >= 0 ? `option-${focusedOptionIndex}` : undefined,
	// 	};
	// } else if (inputType === 'number') {
	// 	const { min, max } = props as NumberProps;

	return (
		<>
			<input {...inputProps} />
			{suggestions}
		</>
	);
};

export default Input;

/**
 * accessKey={this.state._accessKey}
							aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
							aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
							autoCapitalize="off"
							autoComplete={this.state._autoComplete}
							autoCorrect="off"
							disabled={this.state._disabled}
							id={this.state._id}
							list={hasSuggestions ? `${this.state._id}-list` : undefined}
							maxlength={this.state._maxLength}
							name={this.state._name}
							pattern={this.state._pattern}
							placeholder={this.state._placeholder}
							readOnly={this.state._readOnly}
							required={this.state._required}
							spellcheck="false"
							type={this.state._type}
							value={this.state._value as string}
 */
