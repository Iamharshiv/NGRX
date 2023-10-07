import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IpopularTag } from 'src/app/shared/types/tag-list.interface';

export const popularTagsActions = createActionGroup({
  source: 'popularTags',
  events: {
    'Get PopularTags': emptyProps(),
    'Get PopularTags success': props<{
      popularTags: IpopularTag;
    }>(),
    'Get PopularTags failure': emptyProps(),
    'Get Tag Chip': props<{
      tag: string;
    }>(),
  },
});
