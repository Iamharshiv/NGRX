import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectArticle } from '../../store/reducers';
import { articleActions } from '../../store/actions';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  article$ = this.store.select(selectArticle);
  constructor(private store: Store, private activateRoute: ActivatedRoute) {
    // this.activateRoute.data
    //   .pipe(
    //     map((res) => {
    //       return res['article']['article'];
    //     })
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const slug = this.activateRoute.snapshot.paramMap.get('slug');
    this.store.dispatch(articleActions.getArticle({ slug }));
  }
}
