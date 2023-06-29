import { Generic } from '@a11y-ui/core';
import { ButtonProps, KoliBriIconProp, PropColor, Stringified } from '../../components';
import { PropHideLabel, PropLabel } from '../../types/props';
import { ColorPair } from '../../types/props/color';

type RequiredProps = PropLabel;
type OptionalProps = {
	color: Stringified<PropColor>;
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated
	 */
	iconOnly: boolean;
	smartButton: Stringified<ButtonProps>;
} & PropHideLabel;
export type KoliBriBadgeProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	color: ColorPair;
} & PropLabel;
type OptionalStates = {
	smartButton: ButtonProps;
};
export type KoliBriBadgeStates = Generic.Element.Members<RequiredStates, OptionalStates>;
