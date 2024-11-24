import { KolButton, KolInputDate } from '@public-ui/react';
import React, { useState } from 'react';

const msgTypes = ['default', 'error', 'info', 'success', 'warning'] as const;

export const InputDateShowHideMsg = () => {
	const [showMsg, setShowMsg] = useState(false);
	const [isTouched, setIsTouched] = useState(false);

	const onMsg = {
		onClick: () => setShowMsg((b) => !b),
	};
	const onTouched = {
		onClick: () => setIsTouched((b) => !b),
	};

	return (
		<>
			<div className="flex gap-4 items-center">
				<KolButton _label="Toggle Msg" _type="button" _on={onMsg} />
				<KolButton _label="Toggle Touched" _type="button" _on={onTouched} />
				Message visible: {showMsg && isTouched ? 'Yes' : 'No'} (showMsg: {showMsg ? 'Yes' : 'No'}, isTouched: {isTouched ? 'Yes' : 'No'})
			</div>
			<br />
			<hr />
			<br />
			<KolInputDate _error={showMsg ? 'error message' : undefined} _label="Date (_error)" _touched={isTouched} />
			{msgTypes.map((type) => (
				<KolInputDate
					key={type}
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
