import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { authAction } from '../../store/actions';
import { IRegisterRequestInterface } from '../../models/register.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';

import { AuthService } from '../../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    ReactiveFormsModule,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // isSubmitting$ = this.store.select(selectIsSubmitting);
  // backendErrors$ = this.store.select(selectValidationErrors);
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  constructor(private _fb: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.createForm();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  registerForm!: FormGroup;

  createForm() {
    this.registerForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    console.log('form', this.registerForm.getRawValue());
    const request: IRegisterRequestInterface = {
      user: this.registerForm.getRawValue(),
    };
    this.store.dispatch(authAction.register({ request }));
    // this.authService.register(request).subscribe((res) => {
    //   console.log(res, 'res');
    // });
  }
}
