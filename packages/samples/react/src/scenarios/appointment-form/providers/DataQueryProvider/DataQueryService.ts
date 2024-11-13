import * as Data from './data';

type QueryDefinition = { queryFn: (data: unknown) => Promise<unknown> };
type QueryRegistration = Record<string, QueryDefinition>;

const queryDefinitions: QueryRegistration = {
	'district-query': {
		queryFn: async () => {
			return Promise.resolve(Data.LOCATION_OPTIONS);
		},
	},
	'salutation-query': {
		queryFn: async () => {
			return Promise.resolve(Data.SALUTATION_OPTIONS);
		},
	},
	'available-times-query': {
		queryFn: Data.fetchAvailableTimes as (data: unknown) => Promise<unknown>,
	},
};

export class DataQueryService {
	private _queryRegistrations = queryDefinitions;

	public getQueryDefinition(key: string) {
		return this._queryRegistrations?.[key];
	}
}
