import * as React from 'react';
import { useFormDataService } from '../../../providers/FormDataProvider';
import SectionSubmittedProvider from '../../../providers/SectionSubmittedProvider';
import FormikFormContainer, { type FormikFormContainerProps } from './FormikFormContainer';

function Form(props: FormikFormContainerProps) {
	const service = useFormDataService();
	const [values, setValues] = React.useState(service.values);

	React.useLayoutEffect(() => {
		const observer = service.values$.subscribe((values) => {
			setValues(values);
		});

		return () => {
			observer.unsubscribe();
		};
	});

	return (
		<SectionSubmittedProvider sectionSubmitted={false}>
			<FormikFormContainer values={values} {...props} />
		</SectionSubmittedProvider>
	);
}

export default Form;
