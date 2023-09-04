import { filterFilesByExt } from '../../../shares/reuse';
import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS } from '../../../types';
import { AbstractTask } from '../../abstract-task';

import fs from 'fs';
import { AccordionPropertyRenamingHeadingToLabel } from './accordion-property-renaming-heading-to-label';

export class AbbrPropertyRenamingTitleToLabel extends AbstractTask {
	private constructor() {
		super(
			'abbr-property-renaming-title-to-label',
			'Renaming property `_title` to `_label`',
			COMPONENT_FILE_EXTENSIONS.concat(CUSTOM_ELEMENT_FILE_EXTENSIONS),
			'^1',
			[AccordionPropertyRenamingHeadingToLabel.getInstance()],
		);
	}

	public static getInstance(): AbbrPropertyRenamingTitleToLabel {
		if (!(this.instance instanceof AbbrPropertyRenamingTitleToLabel)) {
			this.instance = new AbbrPropertyRenamingTitleToLabel();
		}
		return this.instance as AbbrPropertyRenamingTitleToLabel;
	}

	public run(baseDir: string): void {
		this.transpileComponentFile(baseDir);
		this.transpileCustomElementFile(baseDir);
		this.setStatus('done');
	}

	private transpileComponentFile(baseDir: string): void {
		const files = filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS);
		this.runDummy(files);
	}

	private transpileCustomElementFile(baseDir: string): void {
		const files = filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS);
		this.runDummy(files);
	}
}
