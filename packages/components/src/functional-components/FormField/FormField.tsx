import type { JSX } from '@stencil/core';
import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
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

export type FormFieldProps = Omit<JSXBase.HTMLAttributes<HTMLElement>, 'id'> & {
	component?: 'div' | 'fieldset';
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
	renderNoLabel?: boolean;
	renderNoHint?: boolean;
	anotherChildren?: JSX.Element | JSX.Element[];

	reverseLabelInput?: boolean;

	FormFieldLabelProps?: JSXBase.HTMLAttributes<Omit<HTMLLabelElement | HTMLLegendElement, 'id' | 'hidden' | 'htmlFor'>> & { component?: 'label' | 'legend' };
	FormFieldHintProps?: JSXBase.HTMLAttributes<HTMLElement>;
	FormFieldTooltipProps?: Pick<JSXBase.HTMLAttributes<HTMLElement>, 'class'>;
	FormFieldMsgProps?: JSXBase.HTMLAttributes<HTMLDivElement>;
	FormFieldCounterProps?: JSXBase.HTMLAttributes<HTMLSpanElement>;
} & {
	[key: `data-${string}`]: unknown;
};

const KolFormFieldFc: FC<FormFieldProps> = (props, children) => {
	const {
		component: Component = 'div',
		renderNoLabel,
		renderNoHint,
		anotherChildren,
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
		reverseLabelInput,
		FormFieldLabelProps,
		FormFieldHintProps,
		FormFieldTooltipProps,
		FormFieldMsgProps,
		FormFieldCounterProps,
		...other
	} = props;
	const showLabel = !renderNoLabel;
	const showHint = !renderNoHint;
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

	let componentList = [
		<>
			{showLabel && (
				<KolFormFieldLabelFc
					{...(FormFieldLabelProps || {})}
					id={id}
					hasExpertSlot={hasExpertSlot}
					hideLabel={hideLabel}
					label={label}
					accessKey={accessKey}
					shortKey={shortKey}
				/>
			)}
			{showHint && <KolFormFieldHintFc {...(FormFieldHintProps || {})} id={id} hint={hint} />}
		</>,
		<>
			{children}
			<KolFormFieldTooltipFc
				{...(FormFieldTooltipProps || {})}
				id={id}
				label={label}
				hideLabel={hideLabel}
				hasExpertSlot={hasExpertSlot}
				align={tooltipAlign}
				badgeText={badgeText}
			/>
		</>,
	];

	if (reverseLabelInput) {
		componentList = componentList.reverse();
	}

	return (
		<Component
			class={clsx('kol-input', getModifierClassNameByMsgType(msg), stateCssClasses, classNames)}
			role={`presentation` /* Avoid element being read as 'clickable' in NVDA */}
			{...other}
		>
			{componentList}
			{showFormFieldMsg && <KolFormFieldMsgFc {...(FormFieldMsgProps || {})} id={id} alert={alert} msg={msg} hideError={hideError} />}
			{counter ? <KolFormFieldCounterFc {...(FormFieldCounterProps || {})} {...counter} /> : null}
			{anotherChildren}
		</Component>
	);
};

export default KolFormFieldFc;
