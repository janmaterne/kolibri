import { KolInputTag } from '@component-names';
import type { InputProps } from '@schema';
import { executeInputSnapshotTests } from '@testing';

import { KolInputWc } from '../component';

executeInputSnapshotTests<InputProps>(KolInputTag, [KolInputWc], {}, { hasSmartButton: true });
