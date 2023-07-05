import { IBackendErrorInterface } from 'src/app/shared/types/backendErrors.interface';
import { ICurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

export interface IAuthStateInterface {
  isSubmitting: boolean;
  currentUser: ICurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: IBackendErrorInterface | null;
}
