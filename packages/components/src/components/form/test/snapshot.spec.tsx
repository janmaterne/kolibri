import { KolFormTag } from '@component-names';
// import type { FormAPI } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolForm } from '../shadow';

/**
 * TODO: error TS2344: Type 'FormAPI' does not satisfy the constraint 'Record<string, unknown>'.
  Index signature for type 'string' is missing in type 'FormAPI'.
 */

executeSnapshotTests(KolFormTag, [KolForm], [{ _requiredText: 'Pflichtfeld' }]);
