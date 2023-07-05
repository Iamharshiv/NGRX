import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { popularTagsActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { IGetFeedResponseInterface } from '../../../types/getFeedResponse.interface';
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
