import type {
	FocusableElement,
	HideErrorPropType,
	IdPropType,
	InputRadioAPI,
	InputRadioStates,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	Orientation,
	RadioOptionsPropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	ShortKeyPropType,
} from '../../schema';
import { buildBadgeTextString, showExpertSlot } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { nonce } from '../../utils/dev.utils';
import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { getRenderStates } from '../input/controller';
import { InternalUnderlinedBadgeText } from '../../functional-components';
import { InputRadioController } from './controller';
import { propagateSubmitEventToForm } from '../form/controller';
import { KolInputTag } from '../../core/component-names';
import { KolFormFieldMsgFc } from '../../functional-components';

/**
 * @slot - Die Legende/Überschrift der Radiobuttons.
 */
@Component({
	tag: 'kol-input-radio',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolInputRadio implements InputRadioAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolInputRadioElement;
	private currentValue?: StencilUnknown;

	private inputRef?: HTMLInputElement;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.inputRef = ref;
	};

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown | undefined> {
		return this.currentValue;
	}

	/**
	 * @deprecated Use kolFocus instead.
	 */
	@Method()
	public async focus() {
		await this.kolFocus();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.inputRef?.focus();
	}

	public render(): JSX.Element {
		const { ariaDescribedBy, hasError } = getRenderStates(this.state);
		const hasExpertSlot = showExpertSlot(this.state._label);
		const hasHint = typeof this._hint === 'string' && this._hint.length > 0;
		return (
			<Host class="kol-input-radio">
				<fieldset
					class={{
						fieldset: true,
						disabled: this.state._disabled === true,
						error: hasError === true,
						required: this.state._required === true,
						'hidden-error': this._hideError === true,
						[this.state._orientation]: true,
					}}
				>
					<legend class="block w-full mb-1 leading-normal">
						{/* INFO: span is needed for css styling :after content like a star (*) or optional text ! */}
						<span>
							{/* INFO: label comes with any html tag or as plain text! */}
							<span slot="label">
								{hasExpertSlot ? (
									<slot name="expert"></slot>
								) : typeof this.state._accessKey === 'string' || typeof this.state._shortKey === 'string' ? (
									<InternalUnderlinedBadgeText badgeText={buildBadgeTextString(this.state._accessKey, this.state._shortKey)} label={this._label} />
								) : (
									this._label
								)}
							</span>
						</span>
					</legend>
					{this.state._options.map((option, index) => {
						/**
						 * Damit der Value einer Option ein beliebigen Typ haben kann
						 * muss man auf HTML-Ebene den Value auf einen String-Wert
						 * mappen. Das tun wir mittels der Map.
						 */
						const customId = `${this.state._id}-${index}`;
						const slotName = `radio-${index}`;
						const selected = this.state._value === option.value;

						return (
							<KolInputTag
								class={{
									radio: true,
									disabled: Boolean(this.state._disabled || option.disabled),
								}}
								key={customId}
								_accessKey={this.state._accessKey} // by radio?!
								_disabled={this.state._disabled || option.disabled}
								_hideLabel={this.state._hideLabel}
								_hint={option.hint}
								_id={customId}
								_label={option.label as string}
								_renderNoLabel={true}
								_required={this.state._required}
								_shortKey={this.state._shortKey}
								_slotName={slotName}
								_tooltipAlign={this._tooltipAlign}
								_touched={this.state._touched}
							>
								<div slot={slotName} class="radio-input-wrapper">
									<input
										ref={this.state._value === option.value ? this.catchRef : undefined}
										title=""
										accessKey={this.state._accessKey} // by radio?!
										aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
										aria-label={this.state._hideLabel && typeof option.label === 'string' ? option.label : undefined}
										type="radio"
										id={customId}
										checked={selected}
										name={this.state._name || this.state._id}
										disabled={this.state._disabled || option.disabled}
										required={this.state._required}
										tabIndex={this.state._tabIndex}
										value={`-${index}`}
										{...this.controller.onFacade}
										onChange={this.onChange}
										onClick={undefined} // onClick is not needed since onChange already triggers the correct event
										onInput={this.onInput}
										onKeyDown={this.onKeyDown.bind(this)}
										onFocus={(event) => {
											this.controller.onFacade.onFocus(event);
											this.inputHasFocus = true;
										}}
										onBlur={(event) => {
											this.controller.onFacade.onBlur(event);
											this.inputHasFocus = false;
										}}
									/>
									<label
										class="radio-label"
										htmlFor={`${customId}`}
										style={{
											height: this.state._hideLabel ? '0' : undefined,
											margin: this.state._hideLabel ? '0' : undefined,
											padding: this.state._hideLabel ? '0' : undefined,
											visibility: this.state._hideLabel ? 'hidden' : undefined,
										}}
									>
										<span>
											<span class="radio-label-span-inner">{option.label}</span>
										</span>
									</label>
								</div>
							</KolInputTag>
						);
					})}
					{hasError && <KolFormFieldMsgFc _alert={this.showAsAlert()} _hideError={this.state._hideError} _msg={this.state._msg} _id={this.state._id} />}
					{hasHint && <span class="hint">{this.state._hint}</span>}
				</fieldset>
			</Host>
		);
	}

	private readonly controller: InputRadioController;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 * @deprecated Will be removed in v3. Use automatic behaviour instead.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Defines the error message text.
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	@Prop() public _error?: string;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideErrorPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _hideError?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the hint text.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: IdPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the properties for a message rendered as Alert component.
	 */
	@Prop() public _msg?: Stringified<MsgPropType>;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Options the user can choose from.
	 */
	@Prop() public _options?: RadioOptionsPropType;

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Adds a visual short key hint to the component.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Shows if the input was touched by a user.
	 * @TODO: Change type back to `TouchedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Defines the value of the input.
	 * @see Known bug: https://github.com/ionic-team/stencil/issues/3902
	 */
	@Prop() public _value?: StencilUnknown;

	@State() public state: InputRadioStates = {
		_hideError: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_options: [],
		_orientation: 'vertical',
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new InputRadioController(this, 'radio', this.host);
	}

	private showAsAlert(): boolean {
		if (this.state._alert === undefined) {
			return Boolean(this.state._touched) && !this.inputHasFocus;
		}
		return this.state._alert;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}
	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignPropType): void {
		this.controller.validateTooltipAlign(value);
	}
	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		this.controller.validateAlert(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_error')
	public validateError(value?: string): void {
		this.controller.validateError(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hideError')
	public validateHideError(value?: HideErrorPropType): void {
		this.controller.validateHideError(value);
	}

	@Watch('_hint')
	public validateHint(value?: string): void {
		this.controller.validateHint(value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		this.controller.validateId(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
	}

	@Watch('_msg')
	public validateMsg(value?: Stringified<MsgPropType>): void {
		this.controller.validateMsg(value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
	}

	@Watch('_options')
	public validateOptions(value?: RadioOptionsPropType): void {
		this.controller.validateOptions(value);
	}

	@Watch('_orientation')
	public validateOrientation(value?: Orientation): void {
		this.controller.validateOrientation(value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		this.controller.validateTabIndex(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	@Watch('_value')
	public validateValue(value?: Stringified<StencilUnknown>): void {
		this.controller.validateValue(value);
	}

	public componentWillLoad(): void {
		this._touched = this._touched === true;
		this.currentValue = this._value;
		this.controller.componentWillLoad();
	}

	private onInput = (event: Event): void => {
		if (event.target instanceof HTMLInputElement) {
			const option = this.controller.getOptionByKey(event.target.value);
			if (option !== undefined) {
				// Event handling
				tryToDispatchKoliBriEvent('input', this.host, option.value);

				// Callback
				if (typeof this.state._on?.onInput === 'function') {
					this.state._on.onInput(event, option.value);
				}
			}
		}
	};

	private onChange = (event: Event): void => {
		if (event.target instanceof HTMLInputElement) {
			const option = this.controller.getOptionByKey(event.target.value);
			if (option !== undefined) {
				// Event handling
				stopPropagation(event);
				tryToDispatchKoliBriEvent('change', this.host, option.value);

				// Static form handling
				this.controller.setFormAssociatedValue(option.value);

				// Callback
				if (typeof this.state._on?.onChange === 'function') {
					this.state._on.onChange(event, option.value);
				}

				this.currentValue = option.value;
			}
		}
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.inputRef,
			});
		}
	};
}
