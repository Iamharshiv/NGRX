import { createFeature, createReducer, on } from '@ngrx/store';

import { routerNavigatedAction } from '@ngrx/router-store';
import { IArticleStateInterface } from 'src/app/shared/types/articleState.interface';
import { articleActions } from './actions';
const initalState: IArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initalState,
    on(articleActions.getArticle, (state) => ({
      ...state,
      isLoadding: true,
    })),
    on(articleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoadding: false,
      data: action.article,
    })),
    on(articleActions.getArticleFailure, (state) => ({
      ...state,
      isLoadding: false,
    })),
    on(routerNavigatedAction, () => {
      log();
      return initalState;
    })
  ),
});

export const log = () => {
  console.log('this is from reducers');
};
export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectIsLoading,
  selectError,
  selectData: selectArticle,
} = articleFeature;
