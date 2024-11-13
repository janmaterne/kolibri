import * as React from 'react';
import { useWizardService } from '../../../providers/WizardProvider';

export type WizardStepProps = {
	label: string;
	children: React.ReactElement;
};

function WizardStep(props: WizardStepProps & { index?: number }) {
	const service = useWizardService();

	React.useLayoutEffect(() => {
		const id = service.registerWizardStep(props.label, props.children, props.index);

		return () => {
			service.unregisterWizardStep(id);
		};
	}, []);

	return null;
}

export default WizardStep;
