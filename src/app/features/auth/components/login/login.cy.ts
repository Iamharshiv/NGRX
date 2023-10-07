import { Store, provideState, provideStore } from '@ngrx/store';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import {
  ActivatedRoute,
  RouterLink,
  RouterModule,
  provideRouter,
} from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import { authFeatureKey, authReducer } from '../../store/reducers';
import { provideMockStore, MockState } from '@ngrx/store/testing';
import { routes } from 'src/app/routes';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from '../../store/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from 'src/app/shared/services/authIntercepter';
import { loadingInterceptor } from 'src/app/shared/services/loading.interceptor';

describe('LoginComponent', () => {
  it('can mount', () => {
    cy.mount(LoginComponent, {
      imports: [BrowserAnimationsModule, MaterialModule],
      providers: [
        provideRouter(routes),
        provideStore({
          router: routerReducer,
        }),
        provideState(authFeatureKey, authReducer),
        provideEffects(authEffects),
        provideRouterStore(),
        provideStoreDevtools({
          maxAge: 25,
          logOnly: !isDevMode(),
          autoPause: true,
          trace: false,
          traceLimit: 75,
        }),
        importProvidersFrom(BrowserAnimationsModule),
        provideHttpClient(
          withInterceptors([authInterceptor, loadingInterceptor])
        ),
      ],
    });
    cy.get('#email').should('have.attr', 'type', 'email');
  });
  it('should have password input of type password', () => {
    // cy.mount(LoginComponent);
    // cy.get('#password').should('have.attr', 'type', 'password');
    // cy.get('#email').should('have.attr', 'type', 'text');
    // cy.get('#submit-btn').click();
  });
});
