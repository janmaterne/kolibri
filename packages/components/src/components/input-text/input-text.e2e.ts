import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-input-text', () => {
	test.describe('smart-button', () => {
		test('should have smart-button', async ({ page }) => {
			const smartButton = JSON.stringify({
				_icons: 'codicon-info',
				_label: 'Smart-Button',
			});

			await page.setContent(`<kol-input-text _label="With Smart Button" _type="text" _smart-button='${smartButton}'></kol-input-text>`);
			const kolButton = page.locator('kol-button-wc');
			await expect(kolButton).toHaveCount(1);

			await kolButton.click();
		});
	});

	test(`should reflect the _value property on the web component`, async ({ page }) => {
		const value = 'Lorem Ipsum';
		await page.setContent('<kol-input-text _label="Input"></kol-input-text>');
		await page.locator('kol-input-text').evaluate((element: HTMLKolInputTextElement, text) => {
			element._value = text; // set the initial value
		}, value);
		const NEW_INPUT = 'Dolor Sit Amet';
		await page.locator('input').fill(NEW_INPUT);

		const valueDomProperty = await page.locator('kol-input-text').evaluate((element: HTMLKolInputTextElement) => element._value);

		expect(valueDomProperty).toBe(NEW_INPUT);
	});

	test.describe('DOM events', () => {
		['click', 'focus', 'blur', 'input', 'change'].forEach((event) => {
			test(`should emit ${event} when internal input emits ${event}`, async ({ page }) => {
				await page.setContent('<kol-input-text _label="Input"></kol-input-text>');
				const eventPromise = page.locator('kol-input-text').evaluate(async (element, event) => {
					return new Promise((resolve) => {
						element.addEventListener(event, resolve);
					});
				}, event);
				await page.waitForChanges();
				await page.locator('input').dispatchEvent(event);
				await expect(eventPromise).resolves.toBeTruthy();
			});
		});
	});
});
