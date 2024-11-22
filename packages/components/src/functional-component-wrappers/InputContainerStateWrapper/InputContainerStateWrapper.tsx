import { h, type FunctionalComponent as FC } from '@stencil/core';
import type {
	ButtonProps,
	IconOrIconClass,
	InputColorStates,
	InputEmailStates,
	InputFileStates,
	InputNumberStates,
	InputPasswordStates,
	InputRangeStates,
	InputTextStates,
	KoliBriHorizontalIcons,
	TextareaStates,
} from '../../schema';

import KolInputContainerFc, { type InputContainerProps } from '../../functional-components/InputContainer';
import KolIconButtonFc from '../../functional-components/IconButton';
import { isObject, isString } from 'lodash-es';
import clsx from 'clsx';

type InputState =
	| TextareaStates
	| InputTextStates
	| InputEmailStates
	| InputPasswordStates
	| InputNumberStates
	| InputColorStates
	| InputFileStates
	| InputRangeStates;

export type InputContainerStateWrapperProps = Partial<InputContainerProps> & {
	state: InputState;
};

function getInputContainerProps(state: InputState): { icons: KoliBriHorizontalIcons | undefined; smartButton: ButtonProps | undefined } {
	let icons: KoliBriHorizontalIcons | undefined = undefined;
	let smartButton: ButtonProps | undefined;

	if ('_icons' in state) {
		icons = state._icons;
	}

	if ('_smartButton' in state) {
		smartButton = state._smartButton;
	}

	return { icons, smartButton };
}

const InputContainerStateWrappeFc: FC<InputContainerStateWrapperProps> = ({ state, endAdornment: defaultEndAdornment }, children) => {
	const { icons, smartButton } = getInputContainerProps(state);

	let leftIconProps: IconOrIconClass | undefined = icons?.left;
	if (isString(leftIconProps)) {
		leftIconProps = { icon: leftIconProps };
	}

	let rightIconProps: IconOrIconClass | undefined = icons?.right;
	if (isString(rightIconProps)) {
		rightIconProps = { icon: rightIconProps };
	}

	const startAdornment = [];
	const endAdornment = [];

	if (defaultEndAdornment) {
		if (Array.isArray(defaultEndAdornment)) {
			endAdornment.push(...defaultEndAdornment);
		} else {
			endAdornment.push(defaultEndAdornment);
		}
	}

	if (leftIconProps) {
		startAdornment.push(<KolIconButtonFc componentName="icon" {...(isObject(leftIconProps) ? leftIconProps : {})} />);
	}

	if (isObject(smartButton)) {
		endAdornment.push(<KolIconButtonFc componentName="button" {...smartButton} hideLabel={true} />);
	}

	if (rightIconProps) {
		endAdornment.push(<KolIconButtonFc componentName="icon" {...(isObject(rightIconProps) ? rightIconProps : {})} />);
	}

	const classNames = clsx({
		'icon-left': leftIconProps !== undefined,
		'icon-right': rightIconProps !== undefined,
	});

	return (
		<KolInputContainerFc class={classNames} startAdornment={startAdornment} endAdornment={endAdornment}>
			{children}
		</KolInputContainerFc>
	);
};

export default InputContainerStateWrappeFc;
