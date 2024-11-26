import { test } from '@stencil/playwright';
import { testInputCallbacks, testInputDomEvents, testInputValueReflection } from '../../e2e';

const COMPONENT_NAME = 'kol-input-color';
const TEST_VALUE = '#cc006e';

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputColorElement>(COMPONENT_NAME, TEST_VALUE);
	testInputCallbacks<HTMLKolInputColorElement>(COMPONENT_NAME, TEST_VALUE);
	testInputDomEvents(COMPONENT_NAME);
});
