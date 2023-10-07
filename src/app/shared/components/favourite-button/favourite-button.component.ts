import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { IArticleInterface } from '../../types/article.interface';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
// import { selectArticle } from 'src/app/features/article/store/reducers';
import { selectHasLabel } from './store/reducers';
// import { selectFeedData } from '../feed/store/reducers';
// import { selectArticle } from './store/reducers';

@Component({
  selector: 'app-favourite-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss'],
})
export class FavouriteButtonComponent {
  selected = false;
  // article$ = this.store.select().subscribe((res) => {
  //   console.log(res, 'from favor button');
  // });
  hasLabel = this.store.select(selectHasLabel);
  constructor(private store: Store) {}

  likePost() {
    this.selected = !this.selected;
  }
}
