import { h, type FunctionalComponent as FC } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
import type { InternalButtonProps } from '../../schema';

export type ButtonProps = Partial<InternalButtonProps> & {
	label: string;
	class?: string;
	onClick?: (event: MouseEvent) => void;
};

const KolButtonFc: FC<ButtonProps> = (props) => {
	const { label, icons, hideLabel, onClick, ...other } = props;

	return <KolButtonWcTag _label={label} _icons={icons} _hideLabel={hideLabel} _on={{ onClick }} {...other} />;
};

export default KolButtonFc;
