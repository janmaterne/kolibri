import { type E2EPage, test } from '@stencil/playwright';
import { expect, type Locator, type Page } from '@playwright/test';
import { INPUTS_SELECTOR } from './utils/inputsSelector';

const testInputDomEvents = (componentName: string, additionalProperties?: string, selectInput?: (page: Page & E2EPage) => Locator) => {
	test.describe('DOM events', () => {
		['click', 'focus', 'blur', 'input', 'change'].forEach((event) => {
			test(`should emit ${event} when internal input emits ${event}`, async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" ${additionalProperties}></${componentName}>`);
				const input = selectInput ? selectInput(page) : page.locator(INPUTS_SELECTOR);
				const eventPromise = page.locator(componentName).evaluate(async (element, event) => {
					return new Promise((resolve) => {
						element.addEventListener(event, resolve);
					});
				}, event);
				await page.waitForChanges();
				await input.dispatchEvent(event);
				await expect(eventPromise).resolves.toBeTruthy();
			});
		});
	});
};

export { testInputDomEvents };
