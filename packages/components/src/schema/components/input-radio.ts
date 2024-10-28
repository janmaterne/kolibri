import type { Generic } from 'adopted-style-sheets';
import type {
	PropAccessKey,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRadioOptions,
	PropRequired,
	PropShortKey,
	PropSyncValueBySelector,
	PropTooltipAlign,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, RadioOption, Orientation, StencilUnknown } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	alert: boolean;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	on: InputTypeOnDefault;
	orientation: Orientation;
	tabIndex: number;
	value: StencilUnknown;
} & PropAccessKey &
	PropDisabled &
	PropHideError &
	PropHideLabel &
	PropMsg &
	PropName &
	PropRadioOptions & // PropRadioOptions becomes required with 2.0
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropTooltipAlign;

type RequiredStates = {
	options: RadioOption<StencilUnknown>[];
	orientation: Orientation;
} & PropId &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	alert: boolean;
	hint: string;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: StencilUnknown;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropMsg &
	PropName &
	PropRequired &
	PropShortKey &
	PropTouched;

export type InputRadioProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputRadioStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputRadioWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputRadioAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
