import type { Generic } from 'adopted-style-sheets';
import type { AlertProps, InternalAlertProps } from '../components';
import type { Stringified } from '../types';
import { objectObjectHandler, parseJson, watchValidator } from '../utils';
import { isObject } from '../validators';

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
			value = parseJson<MsgPropType>(value);
			// eslint-disable-next-line no-empty
		} catch (e) {
			// value keeps original value
		}
		watchValidator<MsgPropType>(
			component,
			`_msg`,
			(value) => isObject(value) && typeof value?._description === 'string',
			new Set(['MsgPropType']),
			value as MsgPropType,
			{
				defaultValue: {
					_description: '',
					_type: 'error',
				},
			},
		);
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
