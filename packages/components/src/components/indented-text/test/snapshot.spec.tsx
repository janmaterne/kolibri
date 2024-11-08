import { KolIndentedTextTag } from '../../../core/component-names';
import type { IndentedTextProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolIndentedText } from '../shadow';
import { KolIndentedTextWc } from '../component';

executeSnapshotTests<IndentedTextProps>(KolIndentedTextTag, [KolIndentedText, KolIndentedTextWc], [{}]);
