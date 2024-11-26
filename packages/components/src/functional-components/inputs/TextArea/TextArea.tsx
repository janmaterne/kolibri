import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { getDefaultProps } from '../_helpers/getDefaultProps';
import type { DefaultInputProps } from '../_types';

export type TextAreaProps = DefaultInputProps<JSXBase.TextareaHTMLAttributes<HTMLTextAreaElement>> & {
	value: string;
};

const TextAreaFc: FC<TextAreaProps> = (props) => {
	const { ariaDescribedBy, hideLabel, label, ...other } = props;

	const inputProps: JSXBase.TextareaHTMLAttributes<HTMLTextAreaElement> = {
		...other,
		...getDefaultProps({ ariaDescribedBy, hideLabel, label }),
	};

	return <textarea {...inputProps} />;
};

export default TextAreaFc;
