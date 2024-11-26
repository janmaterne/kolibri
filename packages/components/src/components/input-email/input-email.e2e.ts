import { test } from '@stencil/playwright';
import { testInputCallbacks, testInputDomEvents, testInputValueReflection } from '../../e2e';

test.describe('kol-input-email', () => {
	testInputValueReflection<HTMLKolInputEmailElement>('kol-input-email', 'example@example.com');
	testInputCallbacks<HTMLKolInputEmailElement>('kol-input-email');
	testInputDomEvents('kol-input-email');
});
