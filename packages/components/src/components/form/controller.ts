import { devHint } from '../../utils/a11y.tipps';
import { getExperimentalMode, Log } from '../../utils/dev.utils';
import { KoliBriDevHelper, setEventTarget } from '../../utils/prop.validators';
import { Props } from './types';

const searchFormElement = (el?: HTMLElement | ParentNode | null): HTMLElement | ParentNode | null | undefined => {
	if (getExperimentalMode()) {
		devHint(`↓ Search form element start.`);
		Log.debug(el);
	}
	while (el instanceof HTMLElement && el.tagName !== 'FORM' && el.tagName !== 'KOL-FORM') {
		if (el.parentElement instanceof HTMLElement) {
			el = el.parentElement;
		} else if (el.parentNode instanceof ShadowRoot) {
			el = el.parentNode.host;
		} else {
			el = null;
		}
		if (getExperimentalMode()) {
			Log.debug(el);
		}
	}
	if (getExperimentalMode()) {
		devHint(`↑ Search form element finished.`);
	}
	return el;
};

export const propagateResetEventToForm = (
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
	} = {},
): void => {
	const form = searchFormElement(options.form);
	if (form instanceof HTMLElement) {
		const event = new Event('reset', {
			bubbles: true,
			cancelable: true,
		});
		if (form.tagName === 'FORM') {
			setEventTarget(event, form);
			form.dispatchEvent(event);
		} else if (form.tagName === 'KOL-FORM') {
			setEventTarget(event, KoliBriDevHelper.querySelector('form', form) as HTMLFormElement);
			const kolForm = form as Props;
			if (typeof kolForm._on?.onReset === 'function') {
				typeof kolForm._on?.onReset(event);
			}
		}
	}
};

export const propagateSubmitEventToForm = (
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
	} = {},
): void => {
	const form = searchFormElement(options.form);
	if (form instanceof HTMLElement) {
		const event = new SubmitEvent('submit', {
			bubbles: true,
			cancelable: true,
			submitter: form,
		});
		/**
		 * TODO: Wenn Formular-Action (nicht Ajax oder JS) verwendet wird,
		 *       dann müssen wir das Event an das HTMLFormElement innerhalb
		 *       der HTMLKolFormElements propagieren, wenn kein onSubmit
		 *       gesetzt wurde.
		 *
		 * TODO: Form-associated custom elements:
		 *       - https://web.dev/more-capable-form-controls/
		 *       - https://github.com/public-ui/kolibri/issues/946
		 */
		if (form.tagName === 'FORM') {
			if (getExperimentalMode() && (form as HTMLFormElement).noValidate === false) {
				devHint(`If you have not focusable or hidden form fields in your form, you should enable noValidate for your form.`, {
					force: true,
				});
				// (form as HTMLFormElement).noValidate = true; do not make this implicit
			}
			// Use setTimeout to ensure onChange has been called first
			setTimeout(() => {
				// See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
				if (typeof (form as HTMLFormElement).requestSubmit === 'function') {
					(form as HTMLFormElement).requestSubmit();
				} else {
					setEventTarget(event, form);
					form.dispatchEvent(event);
				}
			});
		} else if (form.tagName === 'KOL-FORM') {
			setEventTarget(event, KoliBriDevHelper.querySelector('form', form) as HTMLFormElement);
			const kolForm = form as Props;
			// Use setTimeout to ensure onChange has been called first
			setTimeout(() => {
				if (typeof kolForm._on?.onSubmit === 'function') {
					kolForm._on?.onSubmit(event);
				}
			});
		}
	}
};
