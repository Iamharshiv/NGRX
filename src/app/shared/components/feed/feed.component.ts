import { Component, Input, OnInit } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { PaginationComponent } from '../pagination/pagination/pagination.component';
import { environment } from 'src/environments/environment.development';

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
  selected = false;
  limit = environment.limit;
  constructor(private store: Store) {}
  ngOnInit(): void {
    console.log(this.apiUrl, 'apiurl');
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));
  }

  likePost() {
    this.selected = !this.selected;
  }
}
