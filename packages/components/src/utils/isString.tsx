export const isString = <T = unknown,>(str: string | T): str is string => {
	return typeof str === 'string' && str.trim().length > 0;
};
