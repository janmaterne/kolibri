import { type E2EPage, test } from '@stencil/playwright';
import { expect, type Locator, type Page } from '@playwright/test';
import { INPUTS_SELECTOR } from './utils/inputsSelector';

const testInputDomEvents = (componentName: string, additionalProperties: string = '', selectInput?: (page: Page & E2EPage) => Locator) => {
	test.describe('DOM events', () => {
		['click', 'focus', 'blur', 'input', 'change'].forEach((event) => {
			test(`should emit ${event} when internal input emits ${event}`, async ({ page, browserName }) => {
				test.skip(
					componentName === 'kol-input-color' && event === 'click' && browserName === 'firefox',
					'Clicking on an input[type=color] in Firefox currently makes the page close itself.',
				);

				await page.setContent(`<${componentName} _label="Input" ${additionalProperties}></${componentName}>`);
				const component = page.locator(componentName);
				const input = selectInput ? selectInput(page) : page.locator(INPUTS_SELECTOR);

				await expect(component).toBeVisible();
				await expect(input).toBeVisible();

				const eventPromise = component.evaluate(async (element, event) => {
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
