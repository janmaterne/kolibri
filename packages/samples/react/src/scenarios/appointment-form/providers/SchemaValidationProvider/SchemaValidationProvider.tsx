import * as React from 'react';
import { SchemaValidationService } from './SchemaValidationService';

const SchemaValidationContext = React.createContext(new SchemaValidationService());

type SchemaValidationProviderProps = React.PropsWithChildren;

export function useSchemaValidationService(): SchemaValidationService {
	const context = React.useContext(SchemaValidationContext);
	return context;
}

function SchemaValidationProvider({ children }: SchemaValidationProviderProps) {
	const [service] = React.useState(() => new SchemaValidationService());

	return <SchemaValidationContext.Provider value={service}>{children}</SchemaValidationContext.Provider>;
}

export default SchemaValidationProvider;
