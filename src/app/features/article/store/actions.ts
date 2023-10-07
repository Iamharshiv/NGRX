import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IArticleInterface } from 'src/app/shared/types/article.interface';

// export const popularTagsActions = createActionGroup({
//   source: 'article',
//   events: {
//     'Get article ': emptyProps(),
//     'Get article success': props<{
//       data: IArticleInterface;
//     }>(),
//     'Get article failure': emptyProps(),
//   },
// });

export const articleActions = createActionGroup({
  source: 'ariticle',
  events: {
    'Get article ': props<{ slug: any }>(),
    'Get article success': props<{
      article: IArticleInterface;
    }>(),
    'Get article failure': emptyProps(),
  },
});
