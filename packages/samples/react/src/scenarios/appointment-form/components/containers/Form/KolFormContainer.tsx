import * as React from 'react';
import { KolForm, KolHeading } from '@public-ui/react';
import { useFormikContext, setNestedObjectValues, type FormikTouched } from 'formik';
import { useFieldIdBuilder } from '../../../hooks';
import { useSectionSubmitted } from '../../../providers/SectionSubmittedProvider';

type FormContainerProps = React.PropsWithChildren<{
	label: string;
	index: number;
	onSubmitSucceeded?: (index: number) => void;
}>;

function KolFormContainer(props: FormContainerProps) {
	const { label, index, children, onSubmitSucceeded } = props;
	const formRef = React.useRef<HTMLKolFormElement>(null);
	const { buildFieldIdSelector } = useFieldIdBuilder();
	const form = useFormikContext();
	const { sectionSubmitted, setSectionSubmitted } = useSectionSubmitted();

	const errorList = React.useMemo(() => {
		if (!sectionSubmitted || !form.errors) {
			return [];
		}

		const formikErrors: Record<string, string> = form.errors;

		const values = Object.keys(formikErrors).map((fieldName) => ({
			message: formikErrors[fieldName],
			selector: buildFieldIdSelector(fieldName),
		}));

		return values || [];
	}, [sectionSubmitted, form.errors]);

	return (
		<>
			<KolHeading _level={2} _label={label} />
			<KolForm
				ref={formRef}
				_errorList={errorList}
				_on={{
					onSubmit: async () => {
						setSectionSubmitted(true);

						setTimeout(async () => {
							const errors = await form.validateForm();

							if (Object.keys(errors).length) {
								form.setTouched(setNestedObjectValues<FormikTouched<unknown>>(errors, true));
								setTimeout(() => formRef.current?.focusErrorList().catch(console.warn), 30);
								return;
							}

							await form.submitForm();

							onSubmitSucceeded?.(index);
						}, 10);
					},
				}}
			>
				<div className="flex flex-col gap-2">{children}</div>
			</KolForm>
		</>
	);
}

export default KolFormContainer;
