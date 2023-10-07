import { createFeature, createReducer, on } from '@ngrx/store';

import { popularTagsActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';
import { IPopularTagResponseInterface } from 'src/app/shared/types/popularTags.interface';
const initalState: IPopularTagResponseInterface = {
  isLoading: false,
  error: null,
  data: null,
  tag: null,
};

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initalState,
    on(popularTagsActions.getPopularTags, (state) => ({
      ...state,
      isLoadding: true,
    })),
    on(popularTagsActions.getPopularTagsSuccess, (state, action) => ({
      ...state,
      isLoadding: false,
      data: action.popularTags.tags,
    })),
    on(popularTagsActions.getPopularTagsFailure, (state) => ({
      ...state,
      isLoadding: false,
    })),
    on(popularTagsActions.getTagChip, (state, action) => ({
      ...state,
      isLoadding: true,
      tag: action.tag,
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
  selectTag,
} = popularTagsFeature;
