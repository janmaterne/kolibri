import { h, type FunctionalComponent as FC } from '@stencil/core';

const KolFormFieldLabelFc: FC = (_, children) => {
	return <label>{children}</label>;
};

export default KolFormFieldLabelFc;

// <label class="input-label" id={!useTooltopInsteadOfLabel ? `${this._id}-label` : undefined} hidden={useTooltopInsteadOfLabel} htmlFor={this._id}>
//					{/* INFO: span is needed for css styling :after content like a star (*) or optional text ! */}
//					<span class="input-label-span">
//						{/* INFO: label comes with any html tag or as plain text! */}
//						<slot name="label"></slot>
//					</span>
//				</label>
