import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase, VNode } from '@stencil/core/internal';
import { getDefaultProps } from '../_helpers/getDefaultProps';
import type { DefaultInputProps, AriaProps } from '../_types';

export type InputProps = DefaultInputProps<JSXBase.InputHTMLAttributes<HTMLInputElement>> & {
	value: string | number | string[];
	suggestions?: VNode;
} & {
	[key: `data-${string}`]: unknown;
	[key: `aria-${string}`]: unknown;
};

const InputFc: FC<InputProps> = (props) => {
	const { ariaDescribedBy, hideLabel, label, suggestions, ...other } = props;

	const inputProps: JSXBase.InputHTMLAttributes<HTMLInputElement> & AriaProps = {
		type: 'text',
		...other,
		list: suggestions ? `${other.id}-list` : undefined,
		...getDefaultProps({ ariaDescribedBy, hideLabel, label }),
	};

	return (
		<>
			<input {...inputProps} />
			{suggestions}
		</>
	);
};

export default InputFc;
