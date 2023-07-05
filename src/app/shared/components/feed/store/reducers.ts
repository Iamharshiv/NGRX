import { createFeature, createReducer, on } from '@ngrx/store';
import { IFeedStateInterface } from '../../../types/feedState.interface';
import { feedActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';
const initalState: IFeedStateInterface = {
  isLoadding: false,
  error: null,
  data: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initalState,
    on(feedActions.getFeed, (state) => ({
      ...state,
      isLoadding: true,
    })),
    on(feedActions.getFeedSuccess, (state, action) => ({
      ...state,
      isLoadding: false,
      data: action.feed,
    })),
    on(feedActions.getFeedFailure, (state) => ({
      ...state,
      isLoadding: false,
    }))
    // on(routerNavigatedAction, () => initalState)
  ),
});
export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoadding,
  selectError,
  selectData: selectFeedData,
} = feedFeature;
