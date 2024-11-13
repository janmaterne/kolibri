import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

import { isString, isObject } from 'lodash-es';

import {
	showExpertSlot,
	type AccessKeyPropType,
	type HideLabelPropType,
	type IconOrIconClass,
	type KoliBriCustomIcon,
	type KoliBriIconsProp,
	type LabelWithExpertSlotPropType,
} from '../../schema';

import KolIconFc from '../Icon';
import AccessKey from '../AccessKey';
import InternalUnderlinedAccessKey from '../InternalUnderlinedAccessKey';
import { md } from '../../utils/markdown';

type IconType = IconOrIconClass | undefined | null;

export type SpanProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	label: LabelWithExpertSlotPropType;

	accessKey?: AccessKeyPropType;
	allowMarkdown?: boolean;
	icons?: KoliBriIconsProp;
	hideLabel?: HideLabelPropType;
};

const IconHelper: FC<KoliBriCustomIcon & { class?: string }> = (props) => {
	return <KolIconFc class={clsx('icon', props.class)} style={props.style} label={props.label || ''} icons={props.icon} />;
};

const LabelHelper: FC<{ label: string; hideLabel?: boolean; accessKey?: string; hideExpertSlot?: boolean; allowMarkdown?: boolean }> = ({
	label,
	hideLabel,
	allowMarkdown,
	accessKey,
}) => {
	if (hideLabel || !isString(label)) {
		return null;
	}

	const defaultClasses = 'span-label';

	if (allowMarkdown) {
		return <span class={clsx(defaultClasses, 'md')} innerHTML={md(label)} />;
	}

	if (accessKey) {
		return (
			<span class={clsx(defaultClasses)}>
				<InternalUnderlinedAccessKey label={label} accessKey={accessKey} />
			</span>
		);
	}

	return <span class={clsx(defaultClasses)}>{label}</span>;
};

const SpanCoreHelper: FC<{ label: string; hideLabel?: boolean; accessKey?: string; hideExpertSlot?: boolean; allowMarkdown?: boolean }> = (
	{ hideLabel, label, accessKey, allowMarkdown },
	children,
) => {
	const hideExpertSlot = !showExpertSlot(label);

	return (
		<>
			{hideExpertSlot && <LabelHelper label={label} hideLabel={hideLabel} accessKey={accessKey} allowMarkdown={allowMarkdown} />}
			<span aria-hidden={hideExpertSlot ? 'true' : undefined} class="span-label" hidden={hideExpertSlot}>
				{children}
			</span>
			{isString(accessKey) && <AccessKey accessKey={accessKey} />}
		</>
	);
};

const KolSpanFc: FC<SpanProps> = (props, children) => {
	const { class: classNames, label, hideLabel = false, accessKey, allowMarkdown, icons, ...other } = props;
	let topIconProps: IconType = null;
	let leftIconProps: IconType = null;
	let rightIconProps: IconType = null;
	let bottomIconProps: IconType = null;

	if (isObject(icons)) {
		topIconProps = icons.top;
		leftIconProps = icons.left;
		rightIconProps = icons.right;
		bottomIconProps = icons.bottom;
	} else if (isString(icons)) {
		leftIconProps = {
			icon: icons,
		};
	}

	return (
		<span class={clsx('kol-span-wc', { 'hide-label': hideLabel }, classNames)} {...other}>
			{isObject(topIconProps) && <IconHelper class="top" {...topIconProps} />}
			<span>
				{isObject(leftIconProps) && <IconHelper class="left" {...leftIconProps} />}
				<SpanCoreHelper label={label} hideLabel={hideLabel} allowMarkdown={allowMarkdown} accessKey={accessKey}>
					{children}
				</SpanCoreHelper>
				{isObject(rightIconProps) && <IconHelper class="right" {...rightIconProps} />}
			</span>
			{isObject(bottomIconProps) && <IconHelper class="bottom" {...bottomIconProps} />}
		</span>
	);
};

export default KolSpanFc;
