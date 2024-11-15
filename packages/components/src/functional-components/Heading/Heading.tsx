import { h, type FunctionalComponent as FC } from '@stencil/core';
import clsx from 'clsx';
import type { JSXBase, VNode } from '@stencil/core/internal';
import type { HeadingLevel, HeadingVariantPropType } from '../../schema';

type LevelProps = { level?: HeadingLevel };
type VariantProps = { variant?: HeadingVariantPropType };

type BaseProps = JSXBase.HTMLAttributes<HTMLHeadingElement> & LevelProps;
type HeadlineProps = BaseProps & VariantProps;
type SecondaryHeadlineProps = BaseProps;

export type HeadingProps = BaseProps &
	VariantProps & {
		secondaryHeadline?: string;
	};

function getHeadlineTag(level: HeadingLevel | number): string {
	const validHeadline = level > 0 && level <= 6;
	return validHeadline ? `h${level}` : 'strong';
}

function getSubHeadlineTag(level: HeadingLevel | number): string {
	if (level === 1) {
		return 'span';
	}

	return getHeadlineTag(level);
}

const KolHeadlineFc: FC<HeadlineProps> = (props, children) => {
	const { class: classNames, level = 1, variant: defaultVariant, ...other } = props;

	const HeadlineTag = getHeadlineTag(level);
	const variant = defaultVariant || HeadlineTag;

	return (
		<HeadlineTag class={clsx('headline', `headline-${variant}`, classNames)} {...other}>
			{children}
		</HeadlineTag>
	);
};

const KolSecondaryHeadlineFc: FC<SecondaryHeadlineProps> = (props, children) => {
	const { class: classNames, level = 1, ...other } = props;

	const HeadlineTag = getSubHeadlineTag(level + 1);

	return (
		<HeadlineTag class={clsx('secondary-headline', classNames)} {...other}>
			{children}
		</HeadlineTag>
	);
};

const KolHeadingFc: FC<HeadingProps> = (props, children) => {
	const { ref, secondaryHeadline, level = 1, class: classNames, ...other } = props;

	let result: unknown = (
		<KolHeadlineFc ref={ref} level={level} {...other}>
			{children}
		</KolHeadlineFc>
	);

	if (secondaryHeadline) {
		result = (
			<hgroup>
				{result}
				<KolSecondaryHeadlineFc level={level}>{secondaryHeadline}</KolSecondaryHeadlineFc>
			</hgroup>
		);
	}

	return <section class={clsx('kol-heading-wc', classNames)}>{result as VNode}</section>;
};

export default KolHeadingFc;
