import { createFeature, createReducer, on } from '@ngrx/store';
import { IAuthStateInterface } from '../models/authState.interface';
import { authAction } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: IAuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
};
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authAction.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authAction.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
      currentUser: action.currentUser,
    })),
    on(authAction.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authAction.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authAction.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
      currentUser: action.currentUser,
    })),
    on(authAction.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authAction.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authAction.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authAction.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),
    on(routerNavigatedAction, (state) => ({
      ...state,
      validationErrors: null,
    })),

    on(authAction.logout, (state) => ({
      ...initialState,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
