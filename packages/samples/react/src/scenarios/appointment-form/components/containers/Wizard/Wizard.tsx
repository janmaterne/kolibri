import * as React from 'react';
import { KolTabs } from '@public-ui/react';
import WizardProvider, { useWizardService } from '../../../providers/WizardProvider';
import type { KoliBriTabsCallbacks, TabButtonProps } from '@public-ui/components';

function WizardContainer(props: { label: string; selectedTabIndex?: number; tabs: { label: string }[]; panels: React.ReactElement[] }) {
	const { label, tabs, selectedTabIndex = 0, panels } = props;
	const service = useWizardService();

	const nextTabs = tabs.map(({ label }, index) => ({ _label: label, _disabled: selectedTabIndex < index }));

	const _on = React.useMemo(
		() => ({
			onSelect: (_: Event, value: number): void => {
				service.setSelectedTabIndex(value);
			},
		}),
		[],
	);

	return (
		<WizardContainerInner label={label} selectedTabIndex={selectedTabIndex} tabs={nextTabs} _on={_on}>
			{panels}
		</WizardContainerInner>
	);
}

function WizardContainerInner(props: {
	label: string;
	selectedTabIndex: number;
	tabs: TabButtonProps[];
	_on: KoliBriTabsCallbacks;
	children: React.ReactElement[];
}) {
	const { label, selectedTabIndex, tabs, _on, children } = props;
	const [index, setIndex] = React.useState(0);

	React.useEffect(() => {
		setIndex(selectedTabIndex);
	}, [selectedTabIndex]);

	return (
		<KolTabs _label={label} _selected={index} _tabs={tabs} _on={_on}>
			{children.map((panel, index) => (
				<div className="p-2" slot={`tab-${index}`} key={index}>
					{panel}
				</div>
			))}
		</KolTabs>
	);
}

function WizardWrapper({ label }: { label: string }) {
	const service = useWizardService();
	const [values, setValues] = React.useState(service.values);

	React.useLayoutEffect(() => {
		const observer = service.values$.subscribe((values) => {
			setValues(values);
		});

		return () => {
			observer.unsubscribe();
		};
	});

	return <WizardContainer label={label} tabs={values.headers} panels={values.panels} selectedTabIndex={values.selectedTabIndex} />;
}

function Wizard(props: { label: string; children: React.ReactElement[] }) {
	const { label, children } = props;

	const renderChildren = React.Children.map(children, (child, index) => React.cloneElement(child, { index }));

	return (
		<WizardProvider>
			{renderChildren}
			<WizardWrapper label={label} />
		</WizardProvider>
	);
}

export default Wizard;
