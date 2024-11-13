import * as Yup from 'yup';
import { checkAppointmentAvailability } from '../DataQueryProvider/data';

const districtSchema = {
	district: Yup.string().required('Please select district.'),
};

const personalInformationSchema = {
	salutation: Yup.string().required('Please select salutation.'),
	name: Yup.string().required('Please enter your first and last name.'),
	company: Yup.string().when('salutation', {
		is: (salutation: string) => salutation === 'Company',
		then: (schema) => schema.required('Please specify company.'),
	}),
	email: Yup.string().required('Please enter your e-mail address.'),
};

const availableAppointmentsSchema = {
	date: Yup.string().required('Please enter date.'),
	time: Yup.string().when('date', {
		is: (date: string) => Boolean(date), // only validate time when date is already set
		then: (schema) =>
			schema.required('Please select time.').test('checkTimeAvailability', 'Date unfortunately no longer available.', checkAppointmentAvailability),
	}),
};

export class SchemaValidationService {
	public get districtSchema() {
		return districtSchema;
	}

	public get personalInformationSchema() {
		return personalInformationSchema;
	}

	public get availableAppointmentsSchema() {
		return availableAppointmentsSchema;
	}

	public get validationSchema() {
		return Yup.object().shape({
			...districtSchema,
			...availableAppointmentsSchema,
			...personalInformationSchema,
		});
	}

	public getSchemaByName(name: 'districtSchema' | 'personalInformationSchema' | 'availableAppointmentsSchema') {
		switch (name) {
			case 'districtSchema':
				return this.districtSchema;
			case 'availableAppointmentsSchema':
				return this.availableAppointmentsSchema;
			case 'personalInformationSchema':
				return this.personalInformationSchema;
		}
	}
}
