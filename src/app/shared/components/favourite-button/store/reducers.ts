import { createFeature, createReducer, on } from '@ngrx/store';
import { IFavorBtnInterface } from 'src/app/shared/types/favorBtn.interface';
import { favorBtnActions } from './actions';

const initialState: IFavorBtnInterface = {
  isSubmitting: false,
  hasLabel: false,
  labelText: '',
};
export const favorButtonFeature = createFeature({
  name: 'favorButton',
  reducer: createReducer(
    initialState,
    on(favorBtnActions.favorButtonForFeed, (state) => ({
      ...state,
    })),
    on(favorBtnActions.favorButtonForFeed, (state, action) => ({
      ...state,
      hasLabel: true,
      labelText: 'Favorite Article',
    }))
  ),
});

export const {
  name: favorButtonReducerKey,
  reducer: favorButtonReducer,
  selectHasLabel,
  selectLabelText,
} = favorButtonFeature;
