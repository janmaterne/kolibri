import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import type { FillAction } from './utils/FillAction';

const testInputValueReflection = <ElementType extends { _value?: unknown } & (HTMLElement | SVGElement)>(
	componentName: string,
	testValue?: unknown,
	fillAction?: FillAction,
) => {
	test(`should reflect the _value property on the web component`, async ({ page }) => {
		await page.setContent(`<${componentName} _label="Input"></${componentName}>`);
		if (fillAction) {
			await fillAction(page);
		} else if (typeof testValue === 'string') {
			await page.locator('input').fill(testValue);
		}

		const valueDomProperty = await page.locator(componentName).evaluate((element: ElementType) => element._value);

		expect(valueDomProperty).toBe(testValue);
	});
};

export { testInputValueReflection };
