import { type FunctionalComponent as FC } from '@stencil/core';

const InputAdornment: FC = (_, children, utils) => {
	return utils.map(children, (child) => {
		const next = { ...child };
		next.vattrs._tabIndex = -1;
		return next;
	});
};

export default InputAdornment;
