import type { JSX } from '@stencil/core';
import { validateErrorList, watchBoolean, watchString } from '../../schema';
import { Component, h, Host, Prop, State, Watch, Method } from '@stencil/core';

import { translate } from '../../i18n';

import type { ErrorListPropType, FormAPI, FormStates, KoliBriFormCallbacks, Stringified } from '../../schema';
import { KolFormErrorListFc } from '../../functional-components';
import { focusFirstChild } from '../../utils/focus-first-child';

/**
 * @slot - Inhalt der Form.
 */
@Component({
	tag: 'kol-form',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolForm implements FormAPI {
	errorListElement?: HTMLElement;

	/* Hint: This method may not be used at all while events are handled in form/controller#propagateSubmitEventToForm */
	private readonly onSubmit = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		if (typeof this.state._on?.onSubmit === 'function') {
			this.state._on?.onSubmit(event as SubmitEvent);
		}
	};

	private readonly onReset = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		if (typeof this.state._on?.onReset === 'function') {
			this.state._on?.onReset(event);
		}
	};

	private renderFormElement(): JSX.Element {
		return (
			<form method="post" onSubmit={this.onSubmit} onReset={this.onReset} autoComplete="off" noValidate>
				{this.state._requiredText === true ? (
					<p>
						<div class="mandatory-fields-hint">{translate('kol-form-description')}</div>
					</p>
				) : typeof this.state._requiredText === 'string' && this.state._requiredText.length > 0 ? (
					<p>
						<div class="mandatory-fields-hint">{this.state._requiredText}</div>
					</p>
				) : null}
				<slot />
			</form>
		);
	}

	public render(): JSX.Element {
		const hasErrorList = Array.isArray(this._errorList) && this._errorList.length > 0;

		return (
			<Host class="kol-form">
				{hasErrorList && <KolFormErrorListFc ref={(el) => (this.errorListElement = el)} errorList={this._errorList} />}
				{this.renderFormElement()}
			</Host>
		);
	}

	@Method()
	async focusErrorList(): Promise<void> {
		if (this._errorList && this._errorList.length > 0 && this.errorListElement) {
			focusFirstChild(this.errorListElement, { link: true });
		}

		return Promise.resolve();
	}

	/**
	 * Gibt die EventCallback-Funktionen für die Form-Events an.
	 */
	@Prop() public _on?: KoliBriFormCallbacks;

	/**
	 * Defines whether the mandatory-fields-hint should be shown. A string overrides the default text.
	 */
	@Prop() public _requiredText?: Stringified<boolean> = true;
	/**
	 * A list of error objects that each describe an issue encountered in the form.
	 * Each error object contains a message and a selector for identifying the form element related to the error.
	 */
	@Prop() public _errorList?: ErrorListPropType[];

	@State() public state: FormStates = {};

	@Watch('_on')
	public validateOn(value?: KoliBriFormCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			this.state = {
				...this.state,
				_on: value,
			};
		}
	}

	@Watch('_requiredText')
	public validateRequiredText(value?: Stringified<boolean>): void {
		if (typeof value === 'boolean') {
			watchBoolean(this, '_requiredText', value);
		} else {
			watchString(this, '_requiredText', value);
		}
	}

	@Watch('_errorList')
	public validateErrorList(value?: ErrorListPropType[]): void {
		validateErrorList(this, value);
	}

	public componentWillLoad(): void {
		this.validateOn(this._on);
		this.validateRequiredText(this._requiredText);
		this.validateErrorList(this._errorList);
	}
}
