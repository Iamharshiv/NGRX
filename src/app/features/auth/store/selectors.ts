import { createSelector } from '@ngrx/store';
import { IAuthStateInterface } from '../models/authState.interface';

export const selectFeature = (state: { auth: IAuthStateInterface }) =>
  state.auth;

export const selectIsSubmitting = createSelector(
  selectFeature,
  (state) => state.isSubmitting
);
