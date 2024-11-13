import * as React from 'react';
import { WizardService } from './WizardService';

const WizardContext = React.createContext(new WizardService());

export function useWizardService(): WizardService {
	const context = React.useContext(WizardContext);
	return context;
}

type WizardProviderProps = React.PropsWithChildren;

function WizardProvider({ children }: WizardProviderProps) {
	const [state /*, setState */] = React.useState(new WizardService());

	return <WizardContext.Provider value={state}>{children}</WizardContext.Provider>;
}

export default WizardProvider;
