import type { Generic } from 'adopted-style-sheets';
import type { AlertProps } from '../components';
import type { Stringified } from '../types';
import { objectObjectHandler, parseJson, watchValidator } from '../utils';
import { isObject } from '../validators';

/* types */
export type MsgPropType = AlertProps & {
	_description: string;
};

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
				defaultValue: undefined,
			},
		);
	});
};
