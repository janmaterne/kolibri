import { h, type FunctionalComponent as FC } from '@stencil/core';

const KolFormFieldHintFc: FC<{ id: string }> = ({ id }, children) => {
	return (
		<span class="hint" id={`${id}-hint`}>
			{children}
		</span>
	);
};

export default KolFormFieldHintFc;
