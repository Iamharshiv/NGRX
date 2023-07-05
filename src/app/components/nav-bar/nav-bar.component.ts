import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/features/auth/store/reducers';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar-component.html',
  styleUrls: ['./nav-bar-component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MaterialModule,
    RouterLink,
  ],
})
export class NavBarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store
  ) {}

  logout() {}
}
