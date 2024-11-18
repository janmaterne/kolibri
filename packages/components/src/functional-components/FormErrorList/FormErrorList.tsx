import { h, type FunctionalComponent as FC } from '@stencil/core';
import { translate } from '../../i18n';
import type { ErrorListPropType } from '../../schema';
import { KolLinkWcTag } from '../../core/component-names';
import KolAlertFc, { type KolAlertFcProps } from '../Alert';

type FormErrorListProps = KolAlertFcProps & {
	errorList?: ErrorListPropType[];
};

const handleLinkClick = (event: MouseEvent) => {
	event.preventDefault();

	const href = (event.target as HTMLAnchorElement | undefined)?.href;
	if (!href) {
		return;
	}
	const hrefUrl = new URL(href);

	const targetElement = document.querySelector<HTMLElement>(hrefUrl.hash);
	if (typeof targetElement?.focus === 'function') {
		targetElement.scrollIntoView({ behavior: 'smooth' });
		targetElement.focus();
	}
};

const FormErrorListFc: FC<FormErrorListProps> = ({ errorList, ...other }) => {
	if (!errorList || errorList.length === 0) {
		return null;
	}

	return (
		<KolAlertFc {...other} type="error" variant="card" label={translate('kol-error-list-message')}>
			<nav aria-label={translate('kol-error-list')}>
				<ul>
					{errorList?.map((error, index) => (
						<li key={index}>
							<KolLinkWcTag _href={error.selector} _label={error.message} _on={{ onClick: (event: Event) => handleLinkClick(event as MouseEvent) }} />
						</li>
					))}
				</ul>
			</nav>
		</KolAlertFc>
	);
};

export default FormErrorListFc;
