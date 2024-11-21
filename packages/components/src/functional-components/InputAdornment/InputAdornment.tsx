import { type FunctionalComponent as FC } from '@stencil/core';
//import type { JSXBase } from '@stencil/core/internal';

const InputAdornment: FC = (_, children, utils) => {
	return utils.map(children, (child) => {
		const next = { ...child };
		next.vattrs._tabIndex = -1;
		return next;
	});
};

export default InputAdornment;
