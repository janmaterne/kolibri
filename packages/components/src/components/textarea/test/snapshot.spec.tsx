import { KolTextareaTag } from '@component-names';
import type { TextareaProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolTextarea } from '../shadow';

executeSnapshotTests<TextareaProps>(
	KolTextareaTag,
	[KolTextarea],
	[
		{
			_label: 'Texteingabe',
			_rows: 5,
			_value: 'Kleiner Text im Eingabefeld',
			_placeholder: 'Hier steht ein Platzhaltertext',
			_hint: 'Hinweis',
			_msg: { _type: 'error', _description: 'Es ist ein Fehler aufgetreten' },
		},
		{
			_label: 'Texteingabe',
			_rows: 5,
			_value: 'Kleiner Text im Eingabefeld',
			_placeholder: 'Hier steht ein Platzhaltertext',
			_disabled: true,
		},
		{
			_label: 'Texteingabe',
			_rows: 5,
			_value: 'Kleiner Text im Eingabefeld',
			_placeholder: 'Hier steht ein Platzhaltertext',
			_touched: true,
		},
	],
);
