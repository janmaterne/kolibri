import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';

export type InternalUnderlinedAccessKeyProps = {
	accessKey: string;
	label: string;
};

const InternalUnderlinedAccessKey: FC<InternalUnderlinedAccessKeyProps> = ({ accessKey, label }) => {
	/* Prefer capitalization as defined in the access key, try uppercase/lowercase when there's no match. */
	let [first, ...rest] = label.split(accessKey);
	if (rest.length === 0) {
		accessKey = accessKey.toUpperCase();
		[first, ...rest] = label.split(accessKey);
	}
	if (rest.length === 0) {
		accessKey = accessKey.toLowerCase();
		[first, ...rest] = label.split(accessKey);
	}

	return (
		<>
			{first}
			{rest.length ? (
				<>
					<u>{accessKey}</u>
					{rest.join(accessKey)}
				</>
			) : null}
		</>
	);
};

export default InternalUnderlinedAccessKey;
