import { test } from '@stencil/playwright';
import { testInputCallbacks, testInputDomEvents, testInputValueReflection } from '../../e2e';

const COMPONENT_NAME = 'kol-input-email';
const TEST_VALUE = 'example@example.com';

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputEmailElement>(COMPONENT_NAME, TEST_VALUE);
	testInputCallbacks<HTMLKolInputEmailElement>(COMPONENT_NAME);
	testInputDomEvents(COMPONENT_NAME);
});
