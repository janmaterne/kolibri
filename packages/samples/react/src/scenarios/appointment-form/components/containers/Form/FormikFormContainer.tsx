import * as React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import KolFormContainer from './KolFormContainer';
import { type FormDataService, useFormDataService, type FormValues } from '../../../providers/FormDataProvider';

export type FormikFormContainerProps = React.PropsWithChildren<{
	label: string;
	index: number;
	schema: Yup.AnyObject;

	onSubmitSucceeded?: (index: number) => void;
}>;

function FormikFormContainer(props: FormikFormContainerProps & { values: FormValues }) {
	const service: FormDataService = useFormDataService();

	const { values = {} as FormValues, schema, label, index, children, onSubmitSucceeded } = props;
	let schemaDefinition = undefined;

	if (schema) {
		schemaDefinition = Yup.object().shape(schema);
	}

	return (
		<Formik<FormValues>
			initialValues={values}
			validationSchema={schemaDefinition}
			enableReinitialize
			onSubmit={(v) => {
				service.setValues(v);
			}}
		>
			<KolFormContainer label={label} index={index} onSubmitSucceeded={onSubmitSucceeded}>
				{children}
			</KolFormContainer>
		</Formik>
	);
}

export default FormikFormContainer;
