import type { AccessKeyPropType, ShortKeyPropType } from '../props';

export const validateAccessAndShortKey = (accessKey?: AccessKeyPropType, shortKey?: ShortKeyPropType) => {
	if (accessKey && shortKey) {
		//eslint-disable-next-line no-console
		console.error('AccessKey and ShortKey are set. AccessKey is prioritized!');
	}
};
