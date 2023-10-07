import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination/pagination.component';
import { environment } from 'src/environments/environment.development';
import { TagListComponent } from 'src/app/shared/components/tag-list/tag-list.component';
import { Store } from '@ngrx/store';
import {
  selectCurrentUser,
  selectIsLoading,
} from 'src/app/features/auth/store/reducers';
import { of, tap } from 'rxjs';
import { selectIsLoadding } from 'src/app/shared/components/feed/store/reducers';
import { selectTag } from 'src/app/shared/components/tag-list/store/reducers';
@Component({
  selector: 'app-global-feed',
  standalone: true,
  imports: [
    CommonModule,
    FeedComponent,
    RouterOutlet,
    NavBarComponent,
    MatTabsModule,
    MatDividerModule,
    BannerComponent,
    PaginationComponent,
    TagListComponent,
  ],
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
})
export class GlobalFeedComponent implements OnInit {
  @ViewChild('demo3Tab', { static: false }) demo3Tab!: MatTabGroup;
  url = '/articles?limit=' + environment.limit + '&offset=' + 0;
  yourFeedUrl = '/articles/feed?limit=' + environment.limit + '&offset=' + 0;
  params = '?limit=' + environment.limit + '&offset=' + 0;
  isCurrentUser$ = this.store.select(selectCurrentUser).pipe(
    tap((res) => {
      console.log(res, 'response');
      // this.demo3Tab.selectedIndex = 0;
    })
  );
  isContentLoaded$ = this.store.select(selectIsLoading);

  seletedTag$ = this.store.select(selectTag).subscribe((res) => {
    this.createDynamicTab(res);
  });
  tabIndex = 0;
  tabsArray = [
    {
      name: 'Your Feed',
      url: 'articles/feed' + this.params,
      isLoggedIn: this.isCurrentUser$,
    },
    {
      name: 'Global Feed',
      url: 'articles' + this.params,
      isLoggedIn: of({}),
    },
  ];
  constructor(private store: Store) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  createDynamicTab(data: any) {
    console.log(data, 'data loaded');
    if (data == undefined) {
      this.tabsArray.pop();
      return;
    }
    this.tabsArray[2] = {
      name: '#' + data,
      url: 'articles?tag=' + data,
      isLoggedIn: of({}),
    };

    this.demo3Tab.selectedIndex = 2;
  }
  // getSelectedIndex(e: any) {
  //   console.log('index', e);
  //   // this.tabIndex = e.index;
  // }
  /**
   * !The tab is not behaving correctly need to fix this
   * ? This has been fixed now.
   */
}
