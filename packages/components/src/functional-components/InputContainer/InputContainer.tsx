import { h, type FunctionalComponent as FC } from '@stencil/core';
import clsx from 'clsx';
import type { JSXBase, VNode } from '@stencil/core/internal';
import InputAdornment from '../InputAdornment';

type InputAdornmentType = VNode | VNode[] | null;
type ReturnRenderAdornmentType = VNode | VNode[] | null;

export type InputContainerProps = JSXBase.HTMLAttributes & {
	startAdornment?: InputAdornmentType;
	endAdornment?: InputAdornmentType;
};

function renderInputAdornment(inputAdornment?: InputAdornmentType): ReturnRenderAdornmentType {
	if (!inputAdornment) {
		return null;
	}

	if (Array.isArray(inputAdornment)) {
		if (!inputAdornment.length) {
			return null;
		}

		return inputAdornment.map((item) => <InputAdornment>{item}</InputAdornment>);
	}

	return <InputAdornment>{inputAdornment}</InputAdornment>;
}

const KolInputContainerFc: FC<InputContainerProps> = (props, children) => {
	const { class: classNames, startAdornment, endAdornment, ...other } = props;

	return (
		<div class={clsx('input', classNames)} style={{ position: 'relative' }} {...other}>
			{renderInputAdornment(startAdornment)}
			{children}
			{renderInputAdornment(endAdornment)}
		</div>
	);
};

export default KolInputContainerFc;
