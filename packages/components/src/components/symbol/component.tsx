import type { LabelPropType, SymbolAPI, SymbolStates } from '../../schema';
import { validateLabel, watchString } from '../../schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { KolSymbolFc } from '@fc';

import { translate } from '../../i18n';

import type { JSX } from '@stencil/core';
@Component({
	tag: 'kol-symbol',
	shadow: false,
})
export class KolSymbol implements SymbolAPI {
	public render(): JSX.Element {
		return (
			<Host class="kol-symbol">
				<KolSymbolFc label={this.state._label} symbol={this.state._symbol} />
			</Host>
		);
	}

	/**
	 * Sets the visible or semantic label of the component (e.g. Aria label, Label, Headline, Caption, Summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Dieses Property gibt den String an der angezeigt werden soll.
	 */
	@Prop() public _symbol!: string;

	@State() public state: SymbolStates = {
		_label: translate('kol-warning'),
		_symbol: '', // ⚠ required
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_symbol')
	public validateSymbol(value?: string): void {
		watchString(this, '_symbol', value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateSymbol(this._symbol);
	}
}
