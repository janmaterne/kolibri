import * as React from 'react';
import { KolButton } from '@public-ui/react';

function FormSubmitButton({ label }: { label: string }) {
	return <KolButton _label={label} _type="submit" className="mt-2" />;
}

export default FormSubmitButton;
