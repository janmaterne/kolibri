import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import clsx from 'clsx';

import * as Utils from '@utils';
import type { AccessKeyPropType, HideLabelPropType, IconOrIconClass, KoliBriCustomIcon, KoliBriIconsProp, LabelWithExpertSlotPropType } from '@schema';

import KolIconFc from '../Icon';
import AccessKey from '../AccessKey';
import InternalUnderlinedAccessKey from '../InternalUnderlinedAccessKey';
import type { JSXBase } from '@stencil/core/internal';

type IconType = IconOrIconClass | undefined | null;

export type SpanProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	label: LabelWithExpertSlotPropType;

	accessKey?: AccessKeyPropType;
	allowMarkdown?: boolean;
	icons?: KoliBriIconsProp;
	hideLabel?: HideLabelPropType;
	hideExpertSlot?: boolean;
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
	if (hideLabel || !Utils.isString(label)) {
		return null;
	}

	const defaultClasses = 'span-label';

	if (allowMarkdown) {
		return <span class={clsx(defaultClasses, 'md')} innerHTML={Utils.md(label)} />;
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
	{ hideLabel, label, accessKey, hideExpertSlot, allowMarkdown },
	children,
) => {
	return (
		<>
			{!hideExpertSlot && <LabelHelper label={label} hideLabel={hideLabel} accessKey={accessKey} allowMarkdown={allowMarkdown} />}
			<span aria-hidden={hideExpertSlot ? 'true' : undefined} class="span-label" hidden={hideExpertSlot}>
				{children}
			</span>
			{Utils.isString(accessKey) && <AccessKey accessKey={accessKey} />}
		</>
	);
};

const KolSpanFc: FC<SpanProps> = (props, children) => {
	const { class: classNames, label, hideLabel = false, accessKey, hideExpertSlot, allowMarkdown, icons, ...other } = props;
	let TopIconProps: IconType = null;
	let LeftIconProps: IconType = null;
	let RightIconProps: IconType = null;
	let BottomIconProps: IconType = null;

	if (Utils.isObject(icons)) {
		TopIconProps = icons.top;
		LeftIconProps = icons.left;
		RightIconProps = icons.right;
		BottomIconProps = icons.bottom;
	} else if (Utils.isString(icons)) {
		LeftIconProps = {
			icon: icons,
		};
	}

	return (
		<span class={clsx('kol-span-wc', { 'hide-label': hideLabel }, classNames)} {...other}>
			{Utils.isObject(TopIconProps) && <IconHelper class="top" {...TopIconProps} />}
			<span>
				{Utils.isObject(LeftIconProps) && <IconHelper class="left" {...LeftIconProps} />}
				<SpanCoreHelper label={label} hideLabel={hideLabel} allowMarkdown={allowMarkdown} accessKey={accessKey} hideExpertSlot={hideExpertSlot}>
					{children}
				</SpanCoreHelper>
				{Utils.isObject(RightIconProps) && <IconHelper class="right" {...RightIconProps} />}
			</span>
			{Utils.isObject(BottomIconProps) && <IconHelper class="bottom" {...BottomIconProps} />}
		</span>
	);
};

export default KolSpanFc;
