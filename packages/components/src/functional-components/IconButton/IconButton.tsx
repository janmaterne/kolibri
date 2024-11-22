import { h, type FunctionalComponent as FC } from '@stencil/core';
import KolButtonFc, { type ButtonProps } from '../Button';
import KolIconFc, { type IconProps } from '../Icon';

type IconType = Partial<Omit<IconProps, 'icons'>> & {
	componentName: 'icon';
	icon?: string;
	class?: never;

	onClick?: (event: MouseEvent) => void;
};

type ButtonType = Partial<Omit<ButtonProps, 'icons'>> & {
	componentName: 'button';
	icon?: string;
	label?: string;
	class?: string;

	onClick?: (event: MouseEvent) => void;
};

export type IconButtonProps = IconType | ButtonType;

const KolIconButtonFc: FC<IconButtonProps> = (props) => {
	const { componentName = 'button', label, icon, onClick, ...other } = props;
	const Component = componentName === 'button' ? KolButtonFc : KolIconFc;

	return <Component label={label || ''} icons={`codicon codicon-${icon}`} onClick={onClick} {...other} />;
};

export default KolIconButtonFc;
