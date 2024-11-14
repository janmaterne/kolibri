import * as React from 'react';
import { useValues } from '../../../providers/FormDataProvider';
import SectionSubmittedProvider from '../../../providers/SectionSubmittedProvider';
import FormikFormContainer, { type FormikFormContainerProps } from './FormikFormContainer';

function Form(props: FormikFormContainerProps) {
	const values = useValues();

	return (
		<SectionSubmittedProvider sectionSubmitted={false}>
			<FormikFormContainer values={values} {...props} />
		</SectionSubmittedProvider>
	);
}

export default Form;
