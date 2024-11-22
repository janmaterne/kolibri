import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolFormFieldFc, { type FormFieldProps } from '../../functional-components/FormField';
import type {
	InputColorStates,
	InputEmailStates,
	InputFileStates,
	InputNumberStates,
	InputPasswordStates,
	InputRangeStates,
	InputTextStates,
} from '../../schema';

type InputState = InputTextStates | InputEmailStates | InputPasswordStates | InputNumberStates | InputColorStates | InputFileStates | InputRangeStates;

export type FormFieldStateWrapperProps = Partial<FormFieldProps> & {
	state: InputState;
};

function showAsAlert(state: InputState, inputHasFocus?: boolean): boolean {
	if (state._alert === undefined) {
		return Boolean(state._touched) && !inputHasFocus;
	}
	return state._alert;
}

function getFormFieldProps(state: InputState, inputHasFocus?: boolean): FormFieldProps {
	const props: FormFieldProps = {
		id: state._id,
		disabled: state._disabled,
		msg: state._msg,
		hint: state._hint,
		label: state._label,
		hideLabel: state._hideLabel,
		hideError: state._hideError,
		touched: state._touched,
		accessKey: state._accessKey,
		shortKey: state._shortKey,
		alert: showAsAlert(state, inputHasFocus),
	};

	if ('_readOnly' in state) {
		props.readOnly = state._readOnly;
	}

	if ('_hasCounter' in state && '_currentLength' in state) {
		props.counter = state._hasCounter ? { currentLength: state._currentLength } : undefined;
		if (props.counter && '_maxLength' in state) {
			props.counter.maxLength = state._maxLength;
		}
	}

	return props;
}

const FormFieldStateWrapper: FC<FormFieldStateWrapperProps> = ({ state, ...other }, children) => {
	return (
		<KolFormFieldFc {...getFormFieldProps(state)} {...other}>
			{children}
		</KolFormFieldFc>
	);
};

export default FormFieldStateWrapper;