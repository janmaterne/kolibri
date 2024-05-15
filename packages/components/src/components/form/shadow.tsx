import { Component, h, Host, JSX, Method, Prop, State, Watch } from '@stencil/core';
import { translate } from '../../i18n';
import { Stringified } from '../../types/common';
import { ErrorListPropType, validateErrorList } from '../../types/props/error-list';
import { watchBoolean, watchString } from '../../utils/prop.validators';
import { API, KoliBriFormCallbacks, States } from './types';
import { KolAlertTag, KolIndentedTextTag, KolLinkTag } from '../../core/component-names';

/**
 * @slot - Inhalt der Form.
 */
@Component({
	tag: 'kol-form',
	shadow: true,
})
export class KolForm implements API {
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

	private readonly handleLinkClick = (event: Event) => {
		const href = (event.target as HTMLAnchorElement | undefined)?.href;
		if (href) {
			const hrefUrl = new URL(href);

			const targetElement = document.querySelector<HTMLElement>(hrefUrl.hash);
			if (targetElement && typeof targetElement.focus === 'function') {
				targetElement.scrollIntoView({ behavior: 'smooth' });
				targetElement.focus();
			}
		}
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-form">
				{this._errorList && this._errorList.length > 0 && (
					<KolAlertTag _type="error">
						{translate('kol-error-list-message')}
						<nav aria-label={translate('kol-error-list')}>
							<ul>
								{this._errorList.map((error, index) => (
									<li key={index}>
										<KolLinkTag
											_href={error.selector}
											_label={error.message}
											_on={{ onClick: this.handleLinkClick }}
											ref={(el) => {
												if (index === 0) this.errorListElement = el as HTMLElement;
											}}
										/>
									</li>
								))}
							</ul>
						</nav>
					</KolAlertTag>
				)}
				<form method="post" onSubmit={this.onSubmit} onReset={this.onReset} autoComplete="off" noValidate>
					{this.state._requiredText === true ? (
						<p>
							<KolIndentedTextTag>{translate('kol-form-description')}</KolIndentedTextTag>
						</p>
					) : typeof this.state._requiredText === 'string' && this.state._requiredText.length > 0 ? (
						<p>
							<KolIndentedTextTag>{this.state._requiredText}</KolIndentedTextTag>
						</p>
					) : null}
					<slot />
				</form>
			</Host>
		);
	}

	@Method()
	focusErrorList(): Promise<void> {
		setTimeout(() => {
			if (this._errorList && this._errorList.length > 0) {
				this.errorListElement?.focus();
			}
		}, 300);
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

	@State() public state: States = {};

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
