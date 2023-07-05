import { createFeature, createReducer, on } from '@ngrx/store';

import { popularTagsActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';
import { IPopularTagResponseInterface } from 'src/app/shared/types/popularTags.interface';
const initalState: IPopularTagResponseInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initalState,
    on(popularTagsActions.getPopulartags, (state) => ({
      ...state,
      isLoadding: true,
    })),
    on(popularTagsActions.getPopulartagsSuccess, (state, action) => ({
      ...state,
      isLoadding: false,
      data: action.popularTags.tags,
    })),
    on(popularTagsActions.getPopulartagsFailure, (state) => ({
      ...state,
      isLoadding: false,
    }))
    // on(routerNavigatedAction, () => initalState)
  ),
});
export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectIsLoading,
  selectError,
  selectData: selectTagsData,
} = popularTagsFeature;
