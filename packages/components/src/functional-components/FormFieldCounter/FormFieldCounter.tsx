import { h, type FunctionalComponent as FC } from '@stencil/core';

const KolFormFieldCounterFc: FC = () => {
	return <span class="counter" aria-atomic="true" aria-live="polite" data-testid="input-counter"></span>;
};

export default KolFormFieldCounterFc;

{
	/* <span class="counter" aria-atomic="true" aria-live="polite" data-testid="input-counter">
    {this._currentLength}
    {this._maxLength && (
        <>
            <span aria-label={translate('kol-of')} role="img">
                /
            </span>
            {this._maxLength}
        </>
    )}{' '}
    <span>{translate('kol-characters')}</span>
</span> */
}
