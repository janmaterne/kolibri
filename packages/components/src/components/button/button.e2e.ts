import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-button', () => {
	test('it renders label', async ({ page }) => {
		await page.setContent('<kol-button _label="Test Button Element" _variant="primary"></kol-button>');
		const kolButton = page.locator('kol-button');
		await expect(kolButton).toContainText('Test Button Element');
	});

	test.describe('DOM events', () => {
		['click', 'mousedown'].forEach((event) => {
			test(`should emit ${event} when internal button emits ${event}`, async ({ page }) => {
				await page.setContent('<kol-button _label="Button"></kol-button>');
				const eventPromise = page.locator('kol-button').evaluate(async (element, event) => {
					return new Promise((resolve) => {
						element.addEventListener(event, resolve);
					});
				}, event);
				await page.waitForChanges();
				await page.locator('button').dispatchEvent(event);
				await expect(eventPromise).resolves.toBeTruthy();
			});
		});
	});
});
