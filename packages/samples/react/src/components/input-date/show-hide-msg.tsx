import { KolButton, KolInputDate } from '@public-ui/react';
import React, { useState } from 'react';
import { SampleDescription } from '../SampleDescription';

const msgTypes = ['default', 'error', 'info', 'success', 'warning'] as const;

function onGenerator(setter: (cb: (b: boolean) => boolean) => void) {
	return {
		onClick: () => setter((b) => !b),
	};
}

export const InputDateShowHideMsg = () => {
	const [showMsg, setShowMsg] = useState(false);
	const [isTouched, setIsTouched] = useState(false);
	const [hideMsg, setHideMsg] = useState(false);

	const onMsg = onGenerator(setShowMsg);
	const onTouched = onGenerator(setIsTouched);
	const onHideMsg = onGenerator(setHideMsg);

	return (
		<>
			<SampleDescription>
				<p>This example shows how messages work in input fields.</p>
			</SampleDescription>

			<div className="flex gap-4 items-center">
				<KolButton _label="Toggle Msg" _type="button" _on={onMsg} />
				<KolButton _label="Toggle Touched" _type="button" _on={onTouched} />
				<KolButton _label="Toggle Hide Msg" _type="button" _on={onHideMsg} />
			</div>
			<br />
			<hr />
			<br />
			<pre>
				Message exists: {showMsg && isTouched ? 'Yes' : 'No'} (showMsg: {showMsg ? 'Yes' : 'No'}, isTouched: {isTouched ? 'Yes' : 'No'})<br />
				Message visible: {showMsg && isTouched && !hideMsg ? 'Yes' : 'No'} (showMsg: {showMsg ? 'Yes' : 'No'}, isTouched: {isTouched ? 'Yes' : 'No'}, hideMsg:{' '}
				{hideMsg ? 'Yes' : 'No'})
			</pre>
			<br />
			<hr />
			<br />
			<KolInputDate _error={showMsg ? 'error message' : undefined} _hideError={hideMsg} _label="Date (_error)" _touched={isTouched} />
			{msgTypes.map((type) => (
				<KolInputDate
					key={type}
					_hideError={hideMsg}
					_label="Date (_msg)"
					_msg={
						showMsg
							? {
									_description: `${type} message`,
									_type: type,
								}
							: undefined
					}
					_touched={isTouched}
				/>
			))}
		</>
	);
};
