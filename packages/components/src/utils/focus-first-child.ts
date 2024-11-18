// Types for the configuration options
interface FocusOptions {
	button?: boolean;
	link?: boolean;
	textarea?: boolean;
	inputText?: boolean;
	inputRadio?: boolean;
	inputCheckbox?: boolean;
	inputNumber?: boolean;
	inputEmail?: boolean;
	inputTel?: boolean;
	inputPassword?: boolean;
	inputDate?: boolean;
	inputTime?: boolean;
	inputFile?: boolean;
	select?: boolean;
	tabindex?: boolean;
}

/**
 * Focus the first focusable child element within a parent element
 * @param element - The parent element to search within
 * @param options - Configuration object to specify which elements should be focusable
 * @returns boolean - True if an element was focused, false otherwise
 */
export function focusFirstChild(element: HTMLElement, options: FocusOptions = {}): boolean {
	// Default options configuration
	const defaultOptions: Required<FocusOptions> = {
		button: true,
		link: true,
		textarea: true,
		inputText: true,
		inputRadio: true,
		inputCheckbox: true,
		inputNumber: true,
		inputEmail: true,
		inputTel: true,
		inputPassword: true,
		inputDate: true,
		inputTime: true,
		inputFile: true,
		select: true,
		tabindex: true,
	};

	// Merge default options with provided options
	const settings: Required<FocusOptions> = { ...defaultOptions, ...options };

	// Build selectors array based on enabled options
	const selectors: string[] = [];

	if (settings.button) selectors.push('button:not([disabled])');
	if (settings.link) selectors.push('a[href]:not([disabled])');
	if (settings.textarea) selectors.push('textarea:not([disabled])');
	if (settings.select) selectors.push('select:not([disabled])');
	if (settings.tabindex) selectors.push('[tabindex]:not([tabindex="-1"]):not([disabled])');

	// Configure input types based on settings
	const inputTypes: string[] = [];
	if (settings.inputText) inputTypes.push('text');
	if (settings.inputRadio) inputTypes.push('radio');
	if (settings.inputCheckbox) inputTypes.push('checkbox');
	if (settings.inputNumber) inputTypes.push('number');
	if (settings.inputEmail) inputTypes.push('email');
	if (settings.inputTel) inputTypes.push('tel');
	if (settings.inputPassword) inputTypes.push('password');
	if (settings.inputDate) inputTypes.push('date');
	if (settings.inputTime) inputTypes.push('time');
	if (settings.inputFile) inputTypes.push('file');

	// Add input selectors if any input types are enabled
	if (inputTypes.length > 0) {
		selectors.push(inputTypes.map((type) => `input[type="${type}"]:not([disabled])`).join(', '));
	}

	// Combine all selectors
	const selectorString = selectors.join(', ');

	// Return false if no selectors are available (all options disabled)
	if (!selectorString) {
		return false;
	}

	// Query for all focusable elements
	const focusableElements = element.querySelectorAll<HTMLElement>(selectorString);

	// Find first visible and focusable element
	const firstFocusable = Array.from(focusableElements).find((el) => {
		return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	});

	if (firstFocusable) {
		firstFocusable.focus();
		return true;
	}
	return false;
}
