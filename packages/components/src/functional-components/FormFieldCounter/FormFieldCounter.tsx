import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
import { translate } from '../../i18n';

type FormFieldCounterProps = {
	currentLength?: number;
	maxLength?: number;
};

const KolFormFieldCounterFc: FC<FormFieldCounterProps> = ({ currentLength, maxLength }) => {
	return (
		<span class="counter" aria-atomic="true" aria-live="polite" data-testid="input-counter">
			{currentLength}
			{maxLength && (
				<>
					<span aria-label={translate('kol-of')} role="img">
						/
					</span>
					{maxLength}
				</>
			)}
			&nbsp;<span>{translate('kol-characters')}</span>
		</span>
	);
};

export default KolFormFieldCounterFc;
