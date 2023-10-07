import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectFeedData,
  selectIsLoadding,
} from './store/reducers';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { PaginationComponent } from '../pagination/pagination/pagination.component';
import { environment } from 'src/environments/environment.development';
import { articleActions } from 'src/app/features/article/store/actions';
import { FavouriteButtonComponent } from '../favourite-button/favourite-button.component';
import { favorBtnActions } from '../favourite-button/store/actions';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    PaginationComponent,
    FavouriteButtonComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoadding),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  limit = environment.limit;
  constructor(private store: Store, private router: Router) {}
  ngOnInit(): void {
    console.log(this.apiUrl, 'apiurl');
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));
    this.store.dispatch(favorBtnActions['favorButtonForFeed']());
  }

  navigateToArticleDetail(slug: string) {
    this.router.navigateByUrl('/article-detail/' + slug);
  }
}
