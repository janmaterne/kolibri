import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';

const testInputCallbacks = (componentName: string) => {
	test.describe('Callbacks', () => {
		[
			['click', 'onClick'],
			['focus', 'onFocus'],
			['blur', 'onBlur'],
			['input', 'onInput', 'Test Input'],
			['change', 'onChange', 'Test Input'],
		].forEach(([eventName, callbackName, testValue]) => {
			test(`should call ${callbackName} when internal input emits`, async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input"></${componentName}>`);
				const component = page.locator(componentName);
				const input = page.locator('input');

				const eventPromise = component.evaluate((element: HTMLKolInputTextElement, callbackName) => {
					return new Promise<void | string>((resolve) => {
						element._on = {
							[callbackName]: (_event: InputEvent, value?: string) => {
								resolve(value);
							},
						};
					});
				}, callbackName);
				await page.waitForChanges();

				if (testValue) {
					await input.fill(testValue);
				}
				await input.dispatchEvent(eventName);

				await expect(eventPromise).resolves.toBe(testValue);
			});
		});
	});
};

export { testInputCallbacks };
