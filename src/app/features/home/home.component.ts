import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

import { selectIsLoadding } from 'src/app/shared/components/feed/store/reducers';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NavBarComponent, RouterOutlet, LoadingComponent, CommonModule],
})
export class HomeComponent {
  load = this.store.select(selectIsLoadding);
  constructor(private store: Store) {
    console.log('Home component created');
  }
}
