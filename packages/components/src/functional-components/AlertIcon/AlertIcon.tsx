import { h, type FunctionalComponent as FC } from '@stencil/core';
import { KolIconTag } from '../../core/component-names';
import type { AlertType } from '../../schema';
import { translate } from '../../i18n';

const Icon: FC<{ icon: string; label: string }> = ({ icon, label }) => {
	return <KolIconTag class="kol-alert__heading-icon" _label={label} _icons={icon} />;
};

const AlertIcon: FC<{ type?: AlertType }> = ({ type }) => {
	switch (type) {
		case 'error':
			return <Icon icon="codicon codicon-error" label={translate('kol-error')} />;
		case 'info':
			return <Icon icon="codicon codicon-info" label={translate('kol-info')} />;
		case 'warning':
			return <Icon icon="codicon codicon-warning" label={translate('kol-warning')} />;
		case 'success':
			return <Icon icon="codicon codicon-pass" label={translate('kol-success')} />;
		default:
			return <Icon icon="codicon codicon-comment" label={translate('kol-message')} />;
	}
};

export default AlertIcon;
