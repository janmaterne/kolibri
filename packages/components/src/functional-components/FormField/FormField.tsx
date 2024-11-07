import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolFormFieldMsgFc from '../FormFieldMsg';
import KolFormFieldLabelFc from '../FormFieldLabel';
import KolFormFieldHintFc from '../FormFieldHint/FormFieldHint';
import KolInputContainerFc from '../InputContainer';
import KolFormFieldCounterFc from '../FormFieldCounter';

const KolFormFieldFc: FC = (_, children) => {
	return (
		<div>
			<KolFormFieldLabelFc />
			<KolFormFieldHintFc id="" />
			<KolInputContainerFc>{children}</KolInputContainerFc>
			<KolFormFieldMsgFc _id="" />
			<KolFormFieldCounterFc />
		</div>
	);
};

export default KolFormFieldFc;
