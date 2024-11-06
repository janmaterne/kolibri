import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { translate } from '@i18n';

export type SymbolProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	symbol: string;
	label: string;
};

const KolSymbolFc: FC<SymbolProps> = ({ label = translate('kol-warning'), symbol }) => {
	return (
		<span aria-label={label} role="term">
			{symbol}
		</span>
	);
};

export default KolSymbolFc;
