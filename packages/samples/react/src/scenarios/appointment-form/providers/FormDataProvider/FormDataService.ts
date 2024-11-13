import { Iso8601 } from '@public-ui/components';
import { BehaviorSubject } from 'rxjs';

export interface FormValues {
	district: string;
	date: Iso8601;
	time: Iso8601;
	salutation: string;
	name: string;
	company: string;
	email: string;
	phone: string;
}

const initialValues: FormValues = {
	district: '',
	date: '' as Iso8601,
	time: '' as Iso8601,
	salutation: '',
	name: '',
	company: '',
	email: '',
	phone: '',
};

export class FormDataService {
	private _initialValues: FormValues;

	private _valuesSubject: BehaviorSubject<FormValues>;

	public constructor(initialValue?: FormValues) {
		this._initialValues = initialValue || initialValues;
		this._valuesSubject = new BehaviorSubject(this._initialValues);
	}

	public setValues(next: FormValues) {
		this._valuesSubject.next(next);
	}

	public get values$() {
		return this._valuesSubject;
	}

	public get values() {
		return this._valuesSubject.value;
	}

	public get initialValues() {
		return this._initialValues;
	}
}
