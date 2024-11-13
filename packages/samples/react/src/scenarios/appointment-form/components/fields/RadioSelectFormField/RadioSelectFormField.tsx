import * as React from 'react';
import { FastField, type FastFieldProps, type FormikProps } from 'formik';
import { RadioSelectControl, type RadioSelectControlProps } from '../../formik-fields';
import { OptionQueryController } from '../../data-query';
import type { CoreFormFieldProps } from '../_types';

type RadioSelectFormFieldProps<V extends string | number> = RadioSelectControlProps<V> &
	CoreFormFieldProps & {
		queryKey?: string;
	};

function RadioSelectFormField<T extends Record<string, unknown>, V extends string | number>(
	props: RadioSelectFormFieldProps<V>,
	ref: React.ForwardedRef<HTMLKolInputRadioElement>,
) {
	const { name, queryKey = '', ...other } = props;

	return (
		<FastField name={name}>
			{({ field, form, meta: { error, touched, value } }: FastFieldProps<T>) => {
				return (
					<OptionQueryController queryKey={queryKey}>
						<RadioSelectControl
							ref={ref}
							field={field}
							form={form as FormikProps<Record<string, unknown>>}
							error={error}
							touched={touched}
							value={value as unknown as V}
							{...other}
						/>
					</OptionQueryController>
				);
			}}
		</FastField>
	);
}

export default React.forwardRef(RadioSelectFormField);
