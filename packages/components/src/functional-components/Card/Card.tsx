import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import type { HeadingLevel } from '../../schema';
import KolHeadingFc from '../Heading';
import KolIconButtonFc from '../IconButton';
import { translate } from '../../i18n';

export type CardProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	HeadingProps: JSXBase.HTMLAttributes<HTMLHeadingElement> & {
		level?: HeadingLevel;
		label: string;
	};
	hasCloser?: boolean;
};

const KolCloseButtonFc: FC<{ onClick?: (event: MouseEvent) => void }> = (props) => {
	const { onClick } = props;

	return <KolIconButtonFc class="close" hideLabel icon="close" label={translate('kol-close')} onClick={onClick} tooltipAlign="left" />;
};

const KolCardFc: FC<CardProps> = (props, children) => {
	const { HeadingProps, hasCloser, onClick } = props;
	const { label: headingLabel, ...otherHeadingProps } = HeadingProps;

	return (
		<div class={clsx('card')}>
			<div class="header">
				<KolHeadingFc {...otherHeadingProps}>{headingLabel}</KolHeadingFc>
			</div>
			<div class="content">{children}</div>
			{hasCloser && <KolCloseButtonFc onClick={onClick} />}
		</div>
	);
};

export default KolCardFc;
