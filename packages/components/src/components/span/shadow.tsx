import { Component, h, JSX, Prop } from '@stencil/core';

import { Stringified } from '../../types/common';
import { KoliBriIconsProp } from '../../types/icons';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { Props } from './types';
import { KolSpanWcTag } from '../../core/component-names';

/**
 * @internal
 */
@Component({
	tag: 'kol-span',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSpan implements Props {
	public render(): JSX.Element {
		return (
			<KolSpanWcTag _icons={this._icons || this._icon} _hideLabel={this._hideLabel} _label={this._label} class="kol-span">
				<slot name="expert" slot="expert"></slot>
			</KolSpanWcTag>
		);
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * @deprecated Use _icons.
	 */
	@Prop() public _icon?: Stringified<KoliBriIconsProp>;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;

	/**
	 * Deprecated: Hides the label and shows the description in a Tooltip instead.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;
}
