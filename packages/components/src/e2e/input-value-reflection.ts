import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';

const testInputValueReflection = (componentName: string, inputValue: string) => {
	test(`should reflect the _value property on the web component`, async ({ page }) => {
		await page.setContent(`<${componentName} _label="Input"></${componentName}>`);
		await page.locator('input').fill(inputValue);

		const valueDomProperty = await page.locator(componentName).evaluate((element: HTMLKolInputTextElement) => element._value);

		expect(valueDomProperty).toBe(inputValue);
	});
};

export { testInputValueReflection };
