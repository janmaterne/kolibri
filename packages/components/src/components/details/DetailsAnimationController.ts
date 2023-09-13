/* Heavily inspired by: https://codepen.io/Mamboleoo/pen/QWEpLqm  */

export default class DetailsAnimationController {
	private animation?: Animation;
	private isClosing = false;
	private isExpanding = false;

	constructor(private detailsElement: HTMLDetailsElement, private summaryElement: HTMLElement, private contentElement: HTMLElement) {
		this.summaryElement.addEventListener('click', this.handleSummaryClick.bind(this));
	}

	private handleSummaryClick(event: MouseEvent) {
		event.preventDefault();

		this.detailsElement.style.overflow = 'hidden';
		if (this.isClosing || !this.detailsElement.open) {
			this.open();
		} else if (this.isExpanding || this.detailsElement.open) {
			this.collapse();
		}
	}

	private open() {
		this.detailsElement.style.height = `${this.detailsElement.offsetHeight}px`;
		this.detailsElement.open = true;
		window.requestAnimationFrame(this.expand.bind(this));
	}

	private expand() {
		this.isExpanding = true;
		this.animateDetailsHeight(this.summaryElement.offsetHeight + this.contentElement.offsetHeight);
	}

	private collapse() {
		this.isClosing = true;
		this.animateDetailsHeight(this.summaryElement.offsetHeight);
	}

	private animateDetailsHeight(endHeight: number) {
		if (this.animation) {
			this.animation.cancel();
		}

		const startHeight = this.detailsElement.offsetHeight;

		this.animation = this.detailsElement.animate(
			{
				height: [`${startHeight}px`, `${endHeight}px`],
			},
			{
				duration: 250,
				easing: 'ease-out',
			}
		);
		this.animation.onfinish = () => this.onAnimationFinish();
		this.animation.oncancel = () => (this.isExpanding = false);
	}

	private onAnimationFinish() {
		this.detailsElement.open = this.isExpanding;
		this.animation = undefined;
		this.isClosing = false;
		this.isExpanding = false;
		this.detailsElement.style.removeProperty('height');
		this.detailsElement.style.removeProperty('overview');
	}
}
