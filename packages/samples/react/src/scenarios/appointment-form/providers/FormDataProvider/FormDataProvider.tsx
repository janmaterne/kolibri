import * as React from 'react';
import { FormDataService, type FormValues } from './FormDataService';

const FormDataContext = React.createContext(new FormDataService());

type FormDataProviderProps = React.PropsWithChildren<{
	initialValue?: FormValues;
}>;

export function useFormDataService(): FormDataService {
	const context = React.useContext(FormDataContext);
	return context;
}

export function useValues(): FormValues {
	const ctx = useFormDataService();

	const [values, setValues] = React.useState<FormValues>(ctx.values);

	React.useLayoutEffect(() => {
		const observer = ctx.values$.subscribe((values) => {
			setValues(values);
		});

		return () => {
			observer.unsubscribe();
		};
	});

	return values;
}

function FormDataProvider({ children, initialValue }: FormDataProviderProps) {
	const [service, setService] = React.useState(() => new FormDataService(initialValue));

	React.useLayoutEffect(() => {
		setService(new FormDataService(initialValue));
	}, [initialValue]);

	return <FormDataContext.Provider value={service}>{children}</FormDataContext.Provider>;
}

export default FormDataProvider;
