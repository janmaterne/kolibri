import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import type { LabelPropType, TreeAPI, TreeStates } from '@public-ui/schema';
import { validateLabel } from '@public-ui/schema';
import { TREE_ITEM_TAG_NAME } from './constants';

@Component({
	tag: 'kol-tree-wc',
	shadow: false,
})
export class KolTreeWc implements TreeAPI {
	@Element() host!: HTMLElement;

	@State() public state: TreeStates = {
		_label: '',
	};
	private observer?: MutationObserver;
	private treeItemElements?: HTMLKolTreeItemElement[];

	/**
	 * Defines the label of the tree.
	 */
	@Prop() _label!: LabelPropType;

	@Watch('_label') validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	public render(): JSX.Element {
		return (
			<Host onSlotchange={this.handleSlotchange.bind(this)}>
				<nav class="tree" aria-label={this.state._label}>
					<ul class="treeview-navigation" role="tree" aria-label={this.state._label}>
						<slot />
					</ul>
				</nav>
			</Host>
		);
	}

	private static isTreeItem(this: void, element?: HTMLElement | null): element is HTMLKolTreeItemElement {
		return element?.tagName === TREE_ITEM_TAG_NAME.toUpperCase();
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);

		this.handleTreeChange();
		this.observeChildListMutations();
	}

	public disconnectedCallback(): void {
		this.observer?.disconnect();
	}

	private observeChildListMutations() {
		this.observer = new MutationObserver(this.handleTreeChange.bind(this));
		this.observeTopLevelItems();
	}

	private handleSlotchange() {
		this.observeTopLevelItems();
		this.handleTreeChange();
	}

	private observeTopLevelItems() {
		this.getTopLevelTreeItems().forEach((treeItem) => {
			this.observer?.observe(treeItem, { childList: true, subtree: true });
		});
	}

	private getTopLevelTreeItems(): HTMLKolTreeItemElement[] {
		return (this.host.querySelector('slot')?.assignedNodes() as HTMLElement[]).filter(KolTreeWc.isTreeItem);
	}

	private handleTreeChange(): void {
		this.treeItemElements = this.getTreeItemElements();
		void this.ensureActiveItemVisibility();
	}

	/**
	 * Returns array of all TreeItem elements in the order they appear
	 */
	private getTreeItemElements(): HTMLKolTreeItemElement[] {
		return this.getTopLevelTreeItems().reduce((accumulator: HTMLKolTreeItemElement[], currentValue: HTMLKolTreeItemElement) => {
			const children = currentValue.querySelectorAll(TREE_ITEM_TAG_NAME);

			return [...accumulator, currentValue, ...children];
		}, []);
	}

	private async getOpenTreeItemElements(): Promise<HTMLKolTreeItemElement[] | undefined> {
		if (!this.treeItemElements) {
			return;
		}

		const areElementAndAllParentsOpen = async (element: HTMLKolTreeItemElement): Promise<boolean> => {
			if (!KolTreeWc.isTreeItem(element.parentElement)) {
				// parent is tree itself, top level is always open
				return true;
			} else {
				return (await element.parentElement.isOpen()) && (await areElementAndAllParentsOpen(element.parentElement));
			}
		};

		const elementsWithInclude = await Promise.all(
			this.treeItemElements.map(async (element) => ({
				value: element,
				include: await areElementAndAllParentsOpen(element),
			}))
		);

		return elementsWithInclude.filter((element) => element.include).map((element) => element.value);
	}

	@Listen('keydown')
	public async handleKeyDown(event: KeyboardEvent) {
		const openItems = await this.getOpenTreeItemElements();
		const currentTreeItem: HTMLKolTreeItemElement | undefined | null = document.activeElement?.closest(TREE_ITEM_TAG_NAME);

		if (!openItems || !currentTreeItem) {
			return;
		}

		const currentIndex = openItems?.findIndex((elem) => elem === currentTreeItem);

		switch (event.key) {
			case 'ArrowDown': {
				await openItems[currentIndex + 1]?.focusLink();
				event.preventDefault();
				break;
			}
			case 'ArrowUp': {
				await openItems[currentIndex - 1]?.focusLink();
				event.preventDefault();
				break;
			}
			case 'ArrowRight': {
				await currentTreeItem.expand();
				event.preventDefault();
				break;
			}
			case 'ArrowLeft': {
				await currentTreeItem.collapse();
				event.preventDefault();
				break;
			}
			case '*': {
				const siblings = currentTreeItem.parentElement?.querySelectorAll(TREE_ITEM_TAG_NAME);
				siblings?.forEach((element) => {
					void element.expand();
				});
				break;
			}
		}
	}

	@Listen('focusout')
	public async handleFocusOut(event: FocusEvent) {
		if (event.relatedTarget && !(event.relatedTarget as Element).closest('kol-tree')) {
			/* Tree lost focus */
			await this.ensureActiveItemVisibility();
		}
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	private async ensureActiveItemVisibility() {
		const findActiveItem = (): HTMLKolTreeItemElement | undefined => {
			const rootNodes = (this.host.querySelector('slot')?.assignedNodes() as HTMLElement[]).filter(KolTreeWc.isTreeItem);
			for (const rootNode of rootNodes) {
				if (rootNode._active) {
					return rootNode;
				}
				const childMatch = rootNode.querySelector('kol-tree-item[_active="true"]');
				if (childMatch && (childMatch as HTMLKolTreeItemElement)._active) {
					return childMatch as HTMLKolTreeItemElement;
				}
			}
		};

		const expandParentElements = (element: HTMLKolTreeItemElement) => {
			if (KolTreeWc.isTreeItem(element.parentElement)) {
				void element.parentElement.expand();
				expandParentElements(element.parentElement);
			}
		};

		const target = findActiveItem();
		if (target) {
			expandParentElements(target);
		}
	}
}
