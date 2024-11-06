import type { BadgeAPI, BadgeStates, ButtonProps, KoliBriIconsProp, LabelPropType, PropColor, Stringified } from '../../schema';
import { featureHint, handleColorChange, objectObjectHandler, parseJson, setState, validateColor, validateIcons } from '../../schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { KolSpanFc } from '@fc';

import { nonce } from '../../utils/dev.utils';

import type { JSX } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
featureHint(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);

@Component({
	tag: 'kol-badge',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolBadge implements BadgeAPI {
	private bgColorStr = '#000';
	private colorStr = '#fff';
	private readonly id = nonce();

	private renderSmartButton(props: ButtonProps): JSX.Element {
		return (
			<KolButtonWcTag
				_ariaControls={this.id}
				_customClass={props._customClass}
				_disabled={props._disabled}
				_hideLabel={true}
				_icons={props._icons}
				_id={props._id}
				_label={props._label}
				_on={props._on}
				_tooltipAlign={props._tooltipAlign}
				_variant={props._variant}
			></KolButtonWcTag>
		);
	}

	public render(): JSX.Element {
		const hasSmartButton = typeof this.state._smartButton === 'object' && this.state._smartButton !== null;

		return (
			<Host class="kol-badge">
				<span
					class={{
						'smart-button': typeof this.state._smartButton === 'object' && this.state._smartButton !== null,
					}}
					style={{
						backgroundColor: this.bgColorStr,
						color: this.colorStr,
					}}
				>
					<KolSpanFc id={hasSmartButton ? this.id : undefined} allowMarkdown icons={this.state._icons} label={this._label} />
					{hasSmartButton && this.renderSmartButton(this.state._smartButton as ButtonProps)}
				</span>
			</Host>
		);
	}

	/**
	 * Defines the backgroundColor and foregroundColor.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#000';

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

	@State() public state: BadgeStates = {
		_color: {
			backgroundColor: '#000',
			foregroundColor: '#fff',
		},
		_icons: {},
	};

	private handleColorChange = (value: unknown) => {
		const colorPair = handleColorChange(value);
		this.bgColorStr = colorPair.backgroundColor;
		this.colorStr = colorPair.foregroundColor as string;
	};

	@Watch('_icons')
	public validateIcons(value?: KoliBriIconsProp): void {
		validateIcons(this, value);
	}

	@Watch('_color')
	public validateColor(value?: Stringified<PropColor>): void {
		validateColor(this, value, {
			defaultValue: '#000',
			hooks: {
				beforePatch: this.handleColorChange,
			},
		});
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: ButtonProps | string): void {
		objectObjectHandler(value, () => {
			try {
				value = parseJson<ButtonProps>(value as string);
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value behält den ursprünglichen Wert
			}
			setState(this, '_smartButton', value);
		});
	}

	public componentWillLoad(): void {
		this.validateIcons(this._icons);
		this.validateColor(this._color);
		this.validateSmartButton(this._smartButton);
	}
}
