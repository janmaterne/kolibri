export const isStringOrEmpty = <T = unknown>(str: string | T): str is string => {
	return typeof str === 'string';
};
