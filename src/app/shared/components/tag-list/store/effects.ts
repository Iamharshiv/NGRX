import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { popularTagsActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PopularTagService } from '../services/popular-tag.service';
import { IpopularTag } from 'src/app/shared/types/tag-list.interface';

export const getFeedEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagService = inject(PopularTagService)
    // persistentService = inject(PersistentService)
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagService.getPopularTags().pipe(
          map((popularTags: IpopularTag) => {
            return popularTagsActions.getPopularTagsSuccess({ popularTags });
          }),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
// export const getValueFromSelectedTag = createEffect(
//   (action$ = inject(Actions)) => {
//     return action$.pipe(
//       ofType(popularTagsActions.getTagChip),
//       tap((data) => {
//         console.log(data, 'this is in effects of poplar tags');
//         return data;
//       })
//     );
//   },
//   { functional: true, dispatch: true }
// );
