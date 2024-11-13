import * as React from 'react';
import { KolHeading } from '@public-ui/react';
import { useValues } from '../../providers/FormDataProvider';

const ValueFallback = () => <i>Nicht angegeben</i>;
const ValueWithFallback = ({ value }: { value: string }) => (value ? value : <ValueFallback />);

function SummaryForm() {
	const values = useValues();

	return (
		<>
			<KolHeading _level={2} _label="Summary" />
			<dl>
				<dt>District</dt>
				<dd>
					<ValueWithFallback value={values.district} />
				</dd>
				<dt>Appointment</dt>
				<dd>{values.date && values.time ? `${values.date} ${values.time} Uhr` : <ValueFallback />}</dd>

				{values.salutation === 'Company' ? (
					<>
						<dt>Company</dt>
						<dd>
							<ValueWithFallback value={values.company} />
						</dd>
					</>
				) : (
					<>
						<dt>Salutation</dt>
						<dd>
							<ValueWithFallback value={values.salutation} />
						</dd>
					</>
				)}

				<dt>Name</dt>
				<dd>
					<ValueWithFallback value={values.name} />
				</dd>
				<dt>E-Mail</dt>
				<dd>
					<ValueWithFallback value={values.email} />
				</dd>
				<dt>Phone number</dt>
				<dd>
					<ValueWithFallback value={values.phone} />
				</dd>
			</dl>
		</>
	);
}

export default SummaryForm;
