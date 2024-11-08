import { KolButtonGroupTag } from '../../../core/component-names';
import type { ButtonGroupProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolButtonGroup } from '../shadow';
import { KolButtonGroupWc } from '../component';

executeSnapshotTests<ButtonGroupProps>(KolButtonGroupTag, [KolButtonGroup, KolButtonGroupWc], [{}]);
