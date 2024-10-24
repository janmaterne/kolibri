import * as React from 'react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { KolInputCheckbox } from '@public-ui/react';

export const InputCheckboxAccessAndShortKey: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputCheckbox renders a text input field. The sample shows KolInputCheckbox in a form context with all variations and states.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolInputCheckbox _label="With access key" _accessKey="c" _value={null} _required></KolInputCheckbox>
			<KolInputCheckbox _hideLabel _label="With access key and tooltip" _accessKey="c" _value={null}></KolInputCheckbox>
			<KolInputCheckbox _label="With short key" _shortKey="s" _value={null}></KolInputCheckbox>
			<KolInputCheckbox _hideLabel _label="With short key and tooltip" _shortKey="s" _value={null}></KolInputCheckbox>
		</div>
	</>
);
