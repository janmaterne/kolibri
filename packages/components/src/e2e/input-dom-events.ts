import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { INPUTS_SELECTOR } from './utils/inputsSelector';

const testInputDomEvents = (componentName: string) => {
	test.describe('DOM events', () => {
		['click', 'focus', 'blur', 'input', 'change'].forEach((event) => {
			test(`should emit ${event} when internal input emits ${event}`, async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input"></${componentName}>`);
				const eventPromise = page.locator(componentName).evaluate(async (element, event) => {
					return new Promise((resolve) => {
						element.addEventListener(event, resolve);
					});
				}, event);
				await page.waitForChanges();
				await page.locator(INPUTS_SELECTOR).dispatchEvent(event);
				await expect(eventPromise).resolves.toBeTruthy();
			});
		});
	});
};

export { testInputDomEvents };
