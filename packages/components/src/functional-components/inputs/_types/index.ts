export type AriaProps = {
	'aria-label'?: string;
	'aria-describedby'?: string;
	'aria-selected'?: boolean;
	'aria-controls'?: string;
	'aria-autocomplete'?: 'both';
	'aria-activedescendant'?: string;
};

export type DefaultInputProps<T> = Omit<T, 'title' | 'autoCapitalize' | 'autoCorrect' | 'spellcheck'> & {
	id: string;
	ariaDescribedBy?: string[];
	hideLabel?: boolean;
	label?: string;
};
