import { test } from '@stencil/playwright';
import { testInputCallbacks, testInputDomEvents, testInputValueReflection } from '../../e2e';

const COMPONENT_NAME = 'kol-textarea';
const TEST_VALUE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolTextareaElement>(COMPONENT_NAME, TEST_VALUE);
	testInputCallbacks<HTMLKolTextareaElement>(COMPONENT_NAME);
	testInputDomEvents(COMPONENT_NAME);
});
