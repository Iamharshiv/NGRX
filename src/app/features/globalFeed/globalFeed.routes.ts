import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { ArticleDetailComponent } from '../article/components/article-detail/article-detail.component';
import { IArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleService } from '../article/services/article.service';
import { inject } from '@angular/core';
import { Store, provideState, select } from '@ngrx/store';
import { articleActions } from '../article/store/actions';
import { provideEffects } from '@ngrx/effects';
import * as articleEffect from 'src/app/features/article/store/effects';
import {
  articleFeatureKey,
  articleReducer,
  selectArticle,
} from '../article/store/reducers';
import { first, tap, map, filter, Observable, of } from 'rxjs';

export const articleResolver: any = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  // store:Store
) => {
  console.log('in resolver fn');
  console.log(
    typeof inject(ArticleService).getArticle(route.paramMap.get('slug')!)
  );
  // return inject(ArticleService).getArticle(route.paramMap.get('slug')!);
  const slug = route.paramMap.get('slug');
  const store = inject(Store);
  // return store.select(selectArticle).pipe(
  //   tap((res) => {
  //     console.log(res);
  //     if (res == undefined || res == null) {
  //       store.dispatch(articleActions.getArticle({ slug }));

  //         store.select(selectArticle).pipe(
  //           map((res) => {
  //             console.log(res);
  //           })
  //                 );
  //     }
  //   })

  // );

  // return (
  //   store.pipe(select(selectArticle)),
  //   tap(
  //     (article) => {
  //       if (!article) {
  //         store.dispatch(articleActions.getArticle({ slug }));
  //       }
  //     },
  //     filter((article) => !!article)
  //   )
  // );

  // if (route.data) {
  // return store.dispatch(articleActions.getArticle({ slug }));
  // store.dispatch(articleActions.getArticle({ slug }));
  // return store.select(selectArticle);
  // }
  // return of('None');
};

export const globalFeedRoutes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent,
  },
  {
    path: 'article-detail/:slug',
    component: ArticleDetailComponent,
    resolve: { article: articleResolver },
    providers: [
      provideState(articleFeatureKey, articleReducer),
      provideEffects(articleEffect),
    ],
  },
];
