import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolFormFieldMsgFc from '../FormFieldMsg2';
import KolFormFieldLabelFc from '../FormFieldLabel';
import KolFormFieldHintFc from '../FormFieldHint/FormFieldHint';
import KolFormFieldCounterFc from '../FormFieldCounter';
import KolFormFieldTooltipFc from '../FormFieldTooltip';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import type { AlignPropType, MsgPropType } from '../../schema';
import { buildBadgeTextString, showExpertSlot } from '../../schema';

function getModifierClassNameByMsgType(msg?: { _type?: string }) {
	if (msg?._type) {
		return {
			default: 'msg-type-default',
			info: 'msg-type-info',
			success: 'msg-type-success',
			warning: 'msg-type-warning',
			error: 'msg-type-error',
		}[msg?._type];
	}
}

function checkHasError(msg?: MsgPropType, touched?: boolean, readOnly?: boolean): boolean {
	const isMessageValidError = Boolean(msg?._type === 'error' && msg._description && msg._description?.length > 0);
	const hasError = !readOnly && isMessageValidError && touched === true;

	return hasError;
}

export type FormFieldProps = Omit<JSXBase.HTMLAttributes<HTMLDivElement>, 'id'> & {
	id: string;
	alert?: boolean;
	inputHasFocus?: boolean;
	disabled?: boolean;
	msg?: MsgPropType;
	tooltipAlign?: AlignPropType;
	hint?: string;
	label: string;
	hideLabel?: boolean;
	hideError?: boolean;
	accessKey?: string;
	shortKey?: string;
	counter?: { currentLength?: number; maxLength?: number };
	readOnly?: boolean;
	touched?: boolean;
	required?: boolean;
};

const KolFormFieldFc: FC<FormFieldProps> = (props, children) => {
	const {
		id,
		required,
		alert,
		disabled,
		class: classNames,
		msg,
		hideError,
		hideLabel,
		label,
		hint,
		accessKey,
		shortKey,
		tooltipAlign,
		counter,
		readOnly,
		touched,
	} = props;
	const hasExpertSlot = showExpertSlot(label);
	const hasError = checkHasError(msg, touched, readOnly);
	const showFormFieldMsg = Boolean(hasError || (msg?._type !== 'error' && msg?._description));
	const badgeText = buildBadgeTextString(accessKey, shortKey);

	const stateCssClasses = {
		disabled: Boolean(disabled),
		required: Boolean(required),
		touched: Boolean(touched),
		error: hasError,
		'hide-label': Boolean(hideLabel),
		'read-only': Boolean(readOnly),
		'hidden-error': Boolean(hideError),
	};

	return (
		<div
			class={clsx('kol-input', getModifierClassNameByMsgType(msg), stateCssClasses, classNames)}
			role={`presentation` /* Avoid element being read as 'clickable' in NVDA */}
		>
			<KolFormFieldLabelFc id={id} hasExpertSlot={hasExpertSlot} hideLabel={hideLabel} label={label} accessKey={accessKey} shortKey={shortKey} />
			<KolFormFieldHintFc id={id} hint={hint} />
			{children}
			<KolFormFieldTooltipFc id={id} label={label} hideLabel={hideLabel} hasExpertSlot={hasExpertSlot} align={tooltipAlign} badgeText={badgeText} />
			{showFormFieldMsg && <KolFormFieldMsgFc id={id} alert={alert} msg={msg} hideError={hideError} />}
			{counter ? <KolFormFieldCounterFc {...counter} /> : null}
		</div>
	);
};

export default KolFormFieldFc;
