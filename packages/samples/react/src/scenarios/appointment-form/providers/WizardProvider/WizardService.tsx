import type * as React from 'react';
import { BehaviorSubject } from 'rxjs';

const nonce = (): string => Math.floor(Math.random() * 16777215).toString(16);

export class WizardService {
	private _selectedTabIndex = 0;
	private _registeredSteps: { id: string; label: string; index: number; panel: React.ReactElement }[] = [];
	private _valuesSubject: BehaviorSubject<{ selectedTabIndex: number; headers: { label: string }[]; panels: React.ReactElement[] }> = new BehaviorSubject({
		selectedTabIndex: this._selectedTabIndex,
		headers: [] as { label: string }[],
		panels: [] as React.ReactElement[],
	});

	private setNextValues() {
		this._valuesSubject.next({ selectedTabIndex: this.selectedTabIndex, panels: this.panels, headers: this.headers });
	}

	public registerWizardStep(label: string, panel: React.ReactElement, index: number = 0) {
		const nextId = nonce();

		this._registeredSteps.push({ id: nextId, index, label, panel });
		this._registeredSteps = this._registeredSteps.sort(({ index: a }, { index: b }) => a - b);

		this.setNextValues();

		return nextId;
	}

	public unregisterWizardStep(id: string) {
		this._registeredSteps = this._registeredSteps.filter((f) => f.id !== id);
		this.setNextValues();
	}

	public goToNextStep() {
		const count = this.headers?.length;

		if (this.selectedTabIndex + 1 < count) {
			this.setSelectedTabIndex(this.selectedTabIndex + 1);
		}
	}

	public setSelectedTabIndex(index: number) {
		this._selectedTabIndex = index;

		this.setNextValues();
	}

	public get headers(): { label: string }[] {
		return this._registeredSteps.map(({ label }) => ({ label }));
	}

	public get panels(): React.ReactElement[] {
		return this._registeredSteps.map(({ panel }) => panel);
	}

	public get selectedTabIndex(): number {
		return this._selectedTabIndex;
	}

	public get values$() {
		return this._valuesSubject;
	}

	public get values() {
		return this._valuesSubject.value;
	}
}
