import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { articleActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { IArticleInterface } from 'src/app/shared/types/article.interface';
// import { IGetFeedResponseInterface } from '../../../types/getFeedResponse.interface';

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((articles: any) => {
            console.log(articles);
            let article = articles.article;
            console.log(article);
            return articleActions.getArticleSuccess({ article });
          }),
          catchError(() => {
            return of(articleActions.getArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
