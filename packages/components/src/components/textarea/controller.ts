import type { CSSResize, HasCounterPropType, RowsPropType, SpellCheckPropType, TextareaProps, TextareaWatches } from '../../schema';
import { validateHasCounter } from '../../schema';
import { cssResizeOptions, validateRows, watchBoolean, watchNumber, watchString, watchValidator } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class TextareaController extends InputIconController implements TextareaWatches {
	protected readonly component: Generic.Element.Component & TextareaProps;

	public constructor(component: Generic.Element.Component & TextareaProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	private afterSyncCharCounter = () => {
		if (typeof this.component._value === 'string' && this.component._value.length > 0) {
			this.component.state._currentLength = this.component._value.length;
		}
	};

	public validateHasCounter(value?: HasCounterPropType): void {
		validateHasCounter(this.component, value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
		});
	}

	public validateMaxLength(value?: number): void {
		watchNumber(this.component, '_maxLength', value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
			min: 0,
		});
	}

	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
	}

	public validateReadOnly(value?: boolean): void {
		watchBoolean(this.component, '_readOnly', value);
	}

	public validateResize(value?: CSSResize): void {
		watchValidator(
			this.component,
			'_resize',
			(value) => typeof value === 'string' && cssResizeOptions.includes(value),
			new Set(`String {${cssResizeOptions.join(', ')}`),
			value,
			{
				defaultValue: 'vertical'
			},
		);
	}

	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateRows(value?: RowsPropType): void {
		validateRows(this.component, value);
	}

	public validateSpellCheck(value?: SpellCheckPropType): void {
		watchBoolean(this.component, '_spellCheck', value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
		});
		this.setFormAssociatedValue(this.component._value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateHasCounter(this.component._hasCounter);
		this.validateMaxLength(this.component._maxLength);
		this.validatePlaceholder(this.component._placeholder);
		this.validateReadOnly(this.component._readOnly);
		this.validateResize(this.component._resize);
		this.validateRequired(this.component._required);
		this.validateRows(this.component._rows);
		this.validateSpellCheck(this.component._spellCheck);
		this.validateValue(this.component._value);
	}
}
