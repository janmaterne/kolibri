import * as React from 'react';
import { KolAccordion, KolTree, KolTreeItem } from '@public-ui/react';
import { useMobile } from '../hooks/useMobile';
import type { Routes, Route } from '../shares/types';
import { useHref, useMatch, useResolvedPath } from 'react-router-dom';

type NavigationProps = {
	routes: Routes;
};

function ComponentNavContainer({ children }: { children?: React.ReactNode }): React.ReactNode {
	const isMobile = useMobile();

	return isMobile ? (
		<KolAccordion _label="All components" class="mt">
			{children}
		</KolAccordion>
	) : (
		<div className="mt scrollable-container">{children}</div>
	);
}

function TreeItem({ label, to, children }: any) {
	const href = useHref(to);
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<KolTreeItem _label={label} _href={href} _active={!!match}>
			{children}
		</KolTreeItem>
	);
}

const ignorePathList: Record<string, Record<string, boolean> | true> = {
	scenarios: {
		'appointment-form': true,
	},
};

function ignorePath(parent: string, path: string): boolean {
	return Boolean(ignorePathList[parent] && typeof ignorePathList[parent] === 'object' && ignorePathList[parent][path]);
}

function ignoreParentPath(parent: [string, unknown]): boolean {
	const [first] = parent;
	return Boolean(ignorePathList[first] === true);
}

function Navigation({ routes }: NavigationProps): React.ReactNode {
	const buildSubTree = (parentName: string, children: Route) => {
		return Object.keys(children)
			.filter((path) => !ignorePath(parentName, path))
			.map((childName) => {
				const isTreeExample = parentName === 'tree' && childName === 'basic/:subPage';
				const subPathName = isTreeExample ? 'basic/home' : childName;
				const label = isTreeExample ? 'basic' : childName;

				return <TreeItem key={[parentName, childName].join('/')} label={label} to={[parentName, subPathName].join('/')}></TreeItem>;
			});
	};

	const parentTreeElements = Object.entries(routes)
		.filter((f) => !ignoreParentPath(f))
		.map(([parentName, children]) => (
			<TreeItem key={parentName} label={parentName} to={parentName}>
				{buildSubTree(parentName, children)}
			</TreeItem>
		));

	return (
		<ComponentNavContainer>
			<nav>
				<KolTree _label="Navigation" class="block">
					{parentTreeElements}
				</KolTree>
			</nav>
		</ComponentNavContainer>
	);
}

export default Navigation;
