import React from 'react';
import { KolDetails } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const DetailsBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolDetails hides its content until opened. The open state can be toggled either by clicking the label or by setting the <code>_open</code>-prop
				programmatically. The sample includes an initially open state and a disabled but open Details component.
			</p>
		</SampleDescription>
		<p className="grid gap-4">
			<KolDetails _summary="Nach Laden der Seite geschlossen">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
			</KolDetails>
			<KolDetails _summary="Nach Laden der Seite geöffnet" _open>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
			</KolDetails>
		</p>
	</>
);
