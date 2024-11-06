import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

import { Log, type InternalAlertProps } from '@schema';
import { translate } from '@i18n';
import { KolButtonWcTag } from '@component-names';

import AlertIcon from '../AlertIcon';
import KolHeadingFc from '../Heading';

export type KolAlertFcProps = JSXBase.HTMLAttributes<HTMLDivElement> &
	Partial<Omit<InternalAlertProps, 'on'>> & {
		onCloserClick?: () => void;
		onAlertTimeout?: () => void;
	};

const KolAlertFc: FC<KolAlertFcProps> = (props, children) => {
	const { class: classNames = {}, type = 'default', variant = 'msg', label, hasCloser, alert, onAlertTimeout, onCloserClick, level, ...other } = props;

	if (alert) {
		/**
		 * - https://developer.mozilla.org/de/docs/Web/API/Navigator/vibrate
		 * - https://googlechrome.github.io/samples/vibration/
		 */
		try {
			Log.debug(['Navigator should vibrate ...', navigator.vibrate([100, 75, 100, 75, 100])]);
		} catch (e) {
			Log.debug('Navigator does not support vibration.');
		}

		setTimeout(() => {
			onAlertTimeout?.();
		}, 10000);
	}

	const rootProps: Partial<JSXBase.HTMLAttributes<HTMLDivElement>> = {
		class: clsx('kol-alert-wc', 'alert', type, variant, { hasCloser: !!hasCloser }, classNames),
		role: alert ? 'alert' : undefined,
		...other,
	};

	return (
		<div {...rootProps}>
			<div class="heading">
				<AlertIcon label={label} type={type} />
				<div class="heading-content">
					{label ? <KolHeadingFc level={level}>{label}</KolHeadingFc> : null}
					{variant === 'msg' && <div class="content">{children}</div>}
				</div>
				{hasCloser && (
					<KolButtonWcTag
						class="close"
						_ariaDescription={label?.trim() || ''}
						_hideLabel
						_icons={{
							left: {
								icon: 'codicon codicon-close',
							},
						}}
						_label={translate('kol-close-alert')}
						_on={{ onClick: onCloserClick }}
						_tooltipAlign="left"
					></KolButtonWcTag>
				)}
			</div>
			{variant === 'card' && <div class="content">{children}</div>}
		</div>
	);
};

export default KolAlertFc;
