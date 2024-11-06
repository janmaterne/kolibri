type Defined<T> = T extends undefined ? never : T;

export function isDefined<T>(argument: T): argument is Defined<T> {
	return !!argument;
}
