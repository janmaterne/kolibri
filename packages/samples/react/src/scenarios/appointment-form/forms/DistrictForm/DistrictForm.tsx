import * as React from 'react';
import { Form, FormSubmitButton, NativeSelectFormField } from '../../components';
import { useSchemaValidationService } from '../../providers/SchemaValidationProvider';
import { useWizardService } from '../../providers/WizardProvider';

type DistrictFormProps = {
	index?: number;
};

function DistrictForm(props: DistrictFormProps) {
	const { index = 0 } = props;
	const schemaService = useSchemaValidationService();
	const wizardService = useWizardService();

	const handleSubmitSucceeded = React.useCallback(() => {
		wizardService.goToNextStep();
	}, []);

	return (
		<Form schema={schemaService.districtSchema} label="Select a district" index={index} onSubmitSucceeded={handleSubmitSucceeded}>
			<NativeSelectFormField name="district" label="District" queryKey="district-query" required />
			<div>
				<FormSubmitButton label="Next" />
			</div>
		</Form>
	);
}

export default DistrictForm;
