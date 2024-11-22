import clsx from 'clsx';
import type { AlertPropType, HideErrorPropType, IdPropType, MsgPropType } from '../../schema';
import type { FunctionalComponent } from '@stencil/core';
import { h } from '@stencil/core';
import KolAlertFc from '../Alert';
import type { JSXBase } from '@stencil/core/internal';

type FormFieldMsgProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	alert?: AlertPropType;
	msg?: MsgPropType;
	hideError?: HideErrorPropType;
	id: IdPropType;
};

const FormFieldMsgFc: FunctionalComponent<FormFieldMsgProps> = ({ alert, msg, hideError, id, ...other }) => (
	<KolAlertFc
		/**
		 * This message is read out by screen readers if the input field
		 * refers to the message using the <code>aria-describedby</code>
		 * attribute. It also does this if <code>aria-hidden=true</code>
		 * is set.
		 */
		aria-hidden="true"
		id={`${id}-error`}
		alert={alert}
		type="error"
		class={clsx({
			error: true,
			'visually-hidden': hideError === true,
		})}
		{...msg}
		{...other}
	>
		{msg?._description || undefined}
	</KolAlertFc>
);

export default FormFieldMsgFc;
