import * as React from 'react';
import { KolLink } from '@public-ui/react';
import { SampleDescription } from '../../components/SampleDescription';
import { DistrictForm, AvailableAppointmentsForm, PersonalInformationForm, SummaryForm } from './forms';
import DataQueryProvider from './providers/DataQueryProvider';
import SchemaValidationProvider from './providers/SchemaValidationProvider';
import FormDataProvider from './providers/FormDataProvider';
import { Wizard, WizardStep } from './components';

function AppointmentForm() {
	return (
		<>
			<SampleDescription>
				<p>
					The Appointment Form is a full form example featuring a large variety of KoliBri form components,{' '}
					<KolLink _label="Formik" _href="https://formik.org/" _target="blank" /> and{' '}
					<KolLink _label="Yup" _href="https://github.com/jquense/yup" _target="blank" />.
				</p>
			</SampleDescription>

			<div className="flex flex-col gap-8 w-full">
				<DataQueryProvider>
					<SchemaValidationProvider>
						<FormDataProvider>
							<Wizard label="Form navigation">
								<WizardStep label="1. Choose registration office">
									<DistrictForm />
								</WizardStep>
								<WizardStep label="2. Available dates">
									<AvailableAppointmentsForm />
								</WizardStep>
								<WizardStep label="3. Personal data">
									<PersonalInformationForm />
								</WizardStep>
								<WizardStep label="Summary">
									<SummaryForm />
								</WizardStep>
							</Wizard>
						</FormDataProvider>
					</SchemaValidationProvider>
				</DataQueryProvider>
			</div>
		</>
	);
}

export default AppointmentForm;
