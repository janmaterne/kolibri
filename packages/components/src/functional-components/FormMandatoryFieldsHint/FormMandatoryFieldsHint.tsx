import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { translate } from '../../i18n';

type FormMandatoryFieldsHintProps = JSXBase.HTMLAttributes<HTMLElement> & {
	requiredText?: boolean | string;
};

const FormMandatoryFieldsHintFc: FC<FormMandatoryFieldsHintProps> = ({ requiredText, class: classNames, ...other }) => {
	let content = '';
	if (requiredText === true) {
		content = translate('kol-form-description');
	} else if (typeof requiredText === 'string' && requiredText.length > 0) {
		content = requiredText;
	}

	if (!content) {
		return null;
	}

	return (
		<p>
			<div class={clsx('mandatory-fields-hint', classNames)} {...other}>
				{content}
			</div>
		</p>
	);
};

export default FormMandatoryFieldsHintFc;
