import type * as React from 'react';
import { useFormikContext } from 'formik';

export type ConditionalSectionProps = React.PropsWithChildren<{
	name: string;
	conditionalValue?: unknown;
}>;

function ConditionalSection<T extends Record<string, unknown>>(props: ConditionalSectionProps) {
	const { name, conditionalValue, children } = props;
	const form = useFormikContext<T>();

	if (!form.values[name]) {
		return null;
	}

	if (!conditionalValue) {
		return children;
	}

	if (conditionalValue && form.values[name] === conditionalValue) {
		return children;
	}

	return null;
}

export default ConditionalSection;
