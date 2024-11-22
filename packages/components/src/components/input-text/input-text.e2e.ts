import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCallbacks, testInputDomEvents, testInputValueReflection } from '../../e2e';

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

	testInputValueReflection('kol-input-text', 'Hello World');
	testInputCallbacks('kol-input-text');
	testInputDomEvents('kol-input-text');
});
