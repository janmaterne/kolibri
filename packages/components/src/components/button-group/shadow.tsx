import type { ButtonGroupProps } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h } from '@stencil/core';
import { KolButtonGroupWcTag } from '../../core/component-names';

@Component({
	tag: 'kol-button-group',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolButtonGroup implements ButtonGroupProps {
	public render(): JSX.Element {
		return (
			<KolButtonGroupWcTag>
				<slot />
			</KolButtonGroupWcTag>
		);
	}
}
