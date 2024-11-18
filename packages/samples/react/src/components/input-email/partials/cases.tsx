import React, { forwardRef } from 'react';

import { KolInputEmail } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputEmailCases = forwardRef<HTMLKolInputEmailElement, Components.KolInputEmail>(function InputEmailCases(props, ref) {
	return (
		<div className="grid gap-4">
			<div className="black-background">
				<KolInputEmail {...props} _required _value="test@mail.de" _msg={{ _type: 'error', _description: ERROR_MSG }} _label="E-Mail (Black background test)" />
			</div>
			<KolInputEmail
				{...props}
				ref={ref}
				_accessKey="M"
				_placeholder="elke@mustermann.de"
				_suggestions="['test1@mail.de', 'test2@mail.de', 'test3@mail.de']"
				_label="E-Mail (list)"
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_touched
				_icons={{
					left: {
						icon: 'codicon codicon-arrow-left',
					},
					right: {
						icon: 'codicon codicon-arrow-right',
					},
				}}
			/>
			<KolInputEmail {...props} _disabled _value="test@mail.de" _label="E-Mail (Disabled)" />
			<KolInputEmail {...props} _readOnly _value="test@mail.de" _label="E-Mail (Readonly)" />
			<KolInputEmail {...props} _value="test@mail.de" _label="With access key" _accessKey="c" />
			<KolInputEmail {...props} _value="test@mail.de" _label="With short key" _shortKey="s" />
		</div>
	);
});
