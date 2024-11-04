import { mixMembers } from 'stencil-awesome-test';

import type { AbbrProps } from '../../../schema';

export const getAbbrHtml = (props: AbbrProps): string => {
	props = mixMembers(
		{
			_label: '', // ⚠ required
		},
		props,
	);
	return `
<kol-abbr  class="kol-abbr">
  <mock:shadow-root>
    <abbr>
      <slot></slot>
    </abbr>
    ${props._label ? ` (${props._label})` : ''}
  </mock:shadow-root>
</kol-abbr>`;
};
