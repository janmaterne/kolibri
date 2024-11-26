import { test } from '@stencil/playwright';
import { testInputCallbacks, testInputDomEvents } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';
import { expect } from '@playwright/test';

const COMPONENT_NAME = 'kol-input-checkbox';
const TEST_VALUE = true;
const fillAction: FillAction = async (page) => {
	await page.locator('input').check();
};

test.describe(COMPONENT_NAME, () => {
	testInputCallbacks<HTMLKolInputCheckboxElement>(COMPONENT_NAME, TEST_VALUE, fillAction, ['click']);
	testInputDomEvents(COMPONENT_NAME);

	test(`should reflect the _checked property on the web component`, async ({ page }) => {
		const getCheckedProperty = () => page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputCheckboxElement) => element._checked);
		await page.setContent(`<kol-input-checkbox _label="Input"></kol-input-checkbox>`);

		expect(await getCheckedProperty()).toBe(false);
		await fillAction(page);
		expect(await getCheckedProperty()).toBe(true);
	});
});
