import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectIsLoading, selectTagsData } from './store/reducers';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    ErrorMessageComponent,
    LoadingComponent,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  @Output() dynamicTab = new EventEmitter();
  data$ = combineLatest({
    popularTags: this.store.select(selectTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });
  constructor(private store: Store, private route: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.dispatch(popularTagsActions.getPopulartags());
  }

  navigate(data: any) {
    // [routerLink] = "['/tags', data]";
    console.log('navigate is working fine', data.value);
    // this.route.navigateByUrl('tags');
    this.dynamicTab.next(data.value);
  }
}
