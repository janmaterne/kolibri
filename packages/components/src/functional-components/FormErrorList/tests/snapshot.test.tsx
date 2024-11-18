import { h } from '@stencil/core';
import FormErrorListFc from '../FormErrorList';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import * as i18n from '../../../i18n';

describe('FormErrorListFc', () => {
	beforeEach(() => {
		// Mock the translate function directly on the i18n object
		jest.spyOn(i18n, 'translate').mockImplementation((key: string) => {
			switch (key) {
				case 'kol-error-list-message':
					return 'Fehlerübersicht';
				case 'kol-error-list':
					return 'Liste der Fehler';
				default:
					return key;
			}
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should render null when errorList is empty', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <FormErrorListFc errorList={[]} />);
		expect(page.root).toBeNull();
	});

	it('should render with error list and translated label', async () => {
		const errorList = [
			{
				message: 'Fehler 1',
				selector: '#field1',
			},
		];

		const page = await renderFunctionalComponentToSpecPage(() => <FormErrorListFc errorList={errorList} />);

		expect(page.root).toMatchSnapshot();
		const headingElement = page.root?.querySelector('kol-heading-wc');
		expect(headingElement?.getAttribute('_label')).toBe('Fehlerübersicht');

		const navElement = page.root?.querySelector('nav');
		expect(navElement?.getAttribute('aria-label')).toBe('Liste der Fehler');

		const linkElement = page.root?.querySelector('kol-link-wc');
		expect(linkElement).toBeTruthy();
		expect(linkElement?.getAttribute('_label')).toBe('Fehler 1');
	});
});
