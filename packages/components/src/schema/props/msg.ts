import type { Generic } from 'adopted-style-sheets';
import type { AlertProps, InternalAlertProps } from '../components';
import { objectObjectHandler, parseJson, watchValidator } from '../utils';
import type { Stringified } from '../types';

/* types */
export type MsgPropType = AlertProps & {
	_description: string;
};

export type InternMsgPropType = Partial<
	InternalAlertProps & {
		description: string;
	}
>;

/**
 * Defines the properties for a message rendered as Alert component.
 */
export type PropMsg = {
	msg: MsgPropType;
};

/* validator */
export const validateMsg = (component: Generic.Element.Component, value?: Stringified<MsgPropType>): void => {
	objectObjectHandler(value, () => {
		try {
			value = parseJson<MsgPropType>(value as string);
			// eslint-disable-next-line no-empty
		} catch (e) {
			// value keeps original value
		}

		watchValidator(component, `_msg`, (value) => typeof value === 'object', new Set(['Object']), value);
	});
};

export function convertMsgToInternMsg(msg?: MsgPropType): InternMsgPropType | undefined {
	if (!msg) {
		return undefined;
	}

	const internMsg: InternMsgPropType = {};

	if ('_alert' in msg) internMsg.alert = msg._alert;
	if ('_description' in msg) internMsg.description = msg._description;
	if ('_hasCloser' in msg) internMsg.hasCloser = msg._hasCloser;
	if ('_label' in msg) internMsg.label = msg._label;
	if ('_level' in msg) internMsg.level = msg._level;
	if ('_on' in msg) internMsg.on = msg._on;
	if ('_type' in msg) internMsg.type = msg._type;
	if ('_variant' in msg) internMsg.variant = msg._variant;

	return internMsg;
}
