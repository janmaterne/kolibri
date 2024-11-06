import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

import type { HeadingLevel } from '@schema';
import { translate } from '@i18n';
import { KolButtonWcTag } from '@component-names';

import KolHeadingFc from '../Heading';

export type CardProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	HeadingProps: JSXBase.HTMLAttributes<HTMLHeadingElement> & {
		level?: HeadingLevel;
		label: string;
	};
	hasCloser?: boolean;
	onCloseClick?: (event: MouseEvent) => void;
};

const KolCardFc: FC<CardProps> = (props, children) => {
	const { class: classNames, HeadingProps, hasCloser, onCloseClick, ...other } = props;
	const { label: headingLabel, ...otherHeadingProps } = HeadingProps;

	return (
		<div class={clsx('card', classNames)} {...other}>
			<div class="header">
				<KolHeadingFc {...otherHeadingProps}>{headingLabel}</KolHeadingFc>
			</div>
			<div class="content">{children}</div>
			{hasCloser && (
				<KolButtonWcTag
					class="close"
					_hideLabel
					_icons={{
						left: {
							icon: 'codicon codicon-close',
						},
					}}
					_label={translate('kol-close')}
					_on={{ onClick: onCloseClick }}
					_tooltipAlign="left"
				></KolButtonWcTag>
			)}
		</div>
	);
};

export default KolCardFc;
