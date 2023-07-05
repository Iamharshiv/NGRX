import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './features/home/home.component';
import { Store } from '@ngrx/store';
import { authAction } from './features/auth/store/actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',

  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, NgxSpinnerModule],
})
export class AppComponent implements OnInit {
  title = 'ngrx-demo';
  constructor(private store: Store) {}
  ngOnInit(): void {
    console.log('this is working');
    this.store.dispatch(authAction.getCurrentUser());
  }
}
