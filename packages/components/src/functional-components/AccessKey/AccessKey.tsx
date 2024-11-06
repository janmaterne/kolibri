import { h, type FunctionalComponent as FC } from '@stencil/core';

export type AccessKeyProps = {
	accessKey: string;
};

const KolAccessKeyFc: FC<AccessKeyProps> = ({ accessKey }) => {
	return (
		<span class="access-key-hint" aria-hidden="true">
			{accessKey}
		</span>
	);
};

export default KolAccessKeyFc;
