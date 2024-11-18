import { h } from '@stencil/core';
import FormMandatoryFieldsHintFc from '../FormMandatoryFieldsHint';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import * as i18n from '../../../i18n';

describe('FormMandatoryFieldsHintFc', () => {
	beforeEach(() => {
		// Mock the translate function directly on the i18n object
		jest.spyOn(i18n, 'translate').mockImplementation(() => 'Pflichtfelder sind markiert');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('sollte ohne Props null rendern', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <FormMandatoryFieldsHintFc />);

		expect(page.root).toMatchSnapshot();
		expect(page.root).toBeNull();
	});

	it('sollte mit requiredText={true} den übersetzten Text rendern', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <FormMandatoryFieldsHintFc requiredText={true} />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.textContent).toBe('Pflichtfelder sind markiert');
		expect(i18n.translate).toHaveBeenCalledWith('kol-form-description');
	});

	it('sollte mit custom requiredText den benutzerdefinierten Text rendern', async () => {
		const customText = 'Benutzerdefinierter Hinweistext';
		const page = await renderFunctionalComponentToSpecPage(() => <FormMandatoryFieldsHintFc requiredText={customText} />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.textContent).toBe(customText);
	});

	it('sollte mit zusätzlichen Klassen korrekt rendern', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <FormMandatoryFieldsHintFc requiredText="Test" class="custom-class" />);

		expect(page.root).toMatchSnapshot();
		const hintElement = page.root?.querySelector('.mandatory-fields-hint');
		expect(hintElement).toHaveClass('custom-class');
		expect(hintElement?.textContent).toBe('Test');
	});

	it('sollte leeren String als requiredText ignorieren', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <FormMandatoryFieldsHintFc requiredText="" />);

		expect(page.root).toMatchSnapshot();
		expect(page.root).toBeNull();
	});
});
