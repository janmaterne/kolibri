import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../../utils/testing';
import NativeOptionListFc from '../NativeOptionList';

describe('NativeOptionListFc', () => {
	it('should render and match snapshot', async () => {
		const options = [{ label: 'Option 1', value: '1' }];
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionListFc options={options} />);
		expect(page.root).toMatchSnapshot();
	});

	it('should render with no options', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionListFc options={[]} />);
		expect(page.root).toBeNull();
	});

	it('should render with a single option', async () => {
		const options = [{ label: 'Option 1', value: '1' }];
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionListFc options={options} />);
		expect(page.root).toMatchSnapshot();
	});

	it('should render with multiple options', async () => {
		const options = [
			{ label: 'Option 1', value: '1' },
			{ label: 'Option 2', value: '2' },
		];
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionListFc options={options} />);
		expect(page.root).toMatchSnapshot();
	});

	it('should render with nested option groups', async () => {
		const options = [
			{
				label: 'Group 1',
				options: [
					{ label: 'Option 1', value: '1' },
					{ label: 'Option 2', value: '2' },
				],
			},
		];
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionListFc options={options} />);
		expect(page.root).toMatchSnapshot();
	});
});
