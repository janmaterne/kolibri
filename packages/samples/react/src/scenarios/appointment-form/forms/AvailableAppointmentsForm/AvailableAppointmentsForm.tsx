import * as React from 'react';
import { useSchemaValidationService } from '../../providers/SchemaValidationProvider';
import { ConditionalSection, Form, FormSubmitButton, InputDateFormField, RadioSelectFormField } from '../../components';
import { useWizardService } from '../../providers/WizardProvider';
import CustomDateValidationSpinner from '../../components/CustomDateValidationSpinner';

type AvailableAppointmentsFormProps = {
	index?: number;
};

function AvailableAppointmentsForm(props: AvailableAppointmentsFormProps) {
	const { index = 0 } = props;
	const schemaService = useSchemaValidationService();
	const wizardService = useWizardService();

	const handleSubmitSucceeded = React.useCallback(() => {
		wizardService.goToNextStep();
	}, []);

	return (
		<Form schema={schemaService.availableAppointmentsSchema} label="Select an appointment" index={index} onSubmitSucceeded={handleSubmitSucceeded}>
			<InputDateFormField name="date" label="Date" required />
			<ConditionalSection name="date">
				<RadioSelectFormField name="time" label="Time" orientation="horizontal" queryKey="available-times-query" required />
				<CustomDateValidationSpinner />
				<p>
					<em>For test purposes, only the dates for every half hour are available.</em>
				</p>
			</ConditionalSection>
			<div>
				<FormSubmitButton label="Next" />
			</div>
		</Form>
	);
}

export default AvailableAppointmentsForm;
