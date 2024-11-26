import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
import type { SelectOption, W3CInputValue } from '../../../schema';
import NativeOptionFc from '../NativeOption/NativeOption';
import type { JSXBase } from '@stencil/core/internal';

export type NativeOptionListProps = {
	value?: W3CInputValue | W3CInputValue[];
	options?: SelectOption<W3CInputValue>[];

	OptionProps?: Omit<JSXBase.OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'label'>;
	OptionGroupProps?: Omit<JSXBase.OptgroupHTMLAttributes<HTMLOptGroupElement>, 'label'>;
};

const NativeOptionListFc: FC<NativeOptionListProps> = ({ options, value, OptionProps = {}, OptionGroupProps = {} }) => {
	if (!options?.length) {
		return null;
	}

	return (
		<>
			{options.map(({ label, ...other }, index) => {
				const key = `-${index}`;

				if ('options' in other && options.length) {
					return (
						<optgroup key={key} {...OptionGroupProps} label={label?.toString()}>
							<NativeOptionListFc OptionGroupProps={OptionGroupProps} OptionProps={OptionProps} options={other.options} value={value} />
						</optgroup>
					);
				}

				return <NativeOptionFc key={key} {...OptionProps} label={label} selectedValue={value} value={key} {...other} />;
			})}
		</>
	);
};

export default NativeOptionListFc;
