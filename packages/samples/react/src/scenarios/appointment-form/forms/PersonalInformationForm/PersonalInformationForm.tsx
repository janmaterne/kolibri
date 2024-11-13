import * as React from 'react';
import { useSchemaValidationService } from '../../providers/SchemaValidationProvider';
import {
	ConditionalSection,
	Form,
	FormSubmitButton,
	InputEmailFormField,
	InputPhoneFormField,
	InputTextFormField,
	NativeSelectFormField,
} from '../../components';
import { useWizardService } from '../../providers/WizardProvider';

type PersonalInformationFormProps = {
	index?: number;
};

function PersonalInformationForm(props: PersonalInformationFormProps) {
	const { index = 0 } = props;
	const schemaService = useSchemaValidationService();
	const wizardService = useWizardService();

	const handleSubmitSucceeded = React.useCallback(() => {
		wizardService.goToNextStep();
	}, []);

	return (
		<Form schema={schemaService.personalInformationSchema} label="Enter your contact details" index={index} onSubmitSucceeded={handleSubmitSucceeded}>
			<NativeSelectFormField name="salutation" label="Salutation" queryKey="salutation-query" required />

			<ConditionalSection name="salutation" conditionalValue="Company">
				<InputTextFormField name="company" label="Company" required />
			</ConditionalSection>

			<InputTextFormField name="name" label="First name and surname" required />
			<InputEmailFormField name="email" label="E-Mail" required />
			<InputPhoneFormField name="phone" label="Telephone number" />
			<div>
				<FormSubmitButton label="Next" />
			</div>
		</Form>
	);
}

export default PersonalInformationForm;
