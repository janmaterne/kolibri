import * as React from 'react';
import { Field, type FastFieldProps, type FormikProps } from 'formik';
import { InputTextControl, type InputTextControlProps } from '../../formik-fields';
import type { CoreFormFieldProps } from '../_types';

type InputTextFormFieldProps = InputTextControlProps & CoreFormFieldProps;

function InputTextFormField<T extends Record<string, unknown>, V extends string>(
	props: InputTextFormFieldProps,
	ref: React.ForwardedRef<HTMLKolInputTextElement>,
) {
	const { name, ...other } = props;

	return (
		<Field name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<InputTextControl
						ref={ref}
						field={field}
						form={form as FormikProps<Record<string, unknown>>}
						error={error}
						touched={touched}
						value={value as unknown as V}
						{...other}
					/>
				);
			}}
		</Field>
	);
}

export default React.forwardRef(InputTextFormField);
