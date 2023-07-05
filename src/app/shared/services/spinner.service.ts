import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { selectIsLoadding } from '../components/feed/store/reducers';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(): void {
    console.log('calling spinner');
    this.spinner.show();
  }

  hideSpinner(): void {
    this.spinner.hide();
  }
}
