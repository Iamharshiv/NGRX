import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { feedActions } from 'src/app/shared/components/feed/store/actions';
import { environment } from 'src/environments/environment.development';
import queryString from 'query-string';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() total: number = 0;
  @Input() limit: number = 20;
  @Input() currentPage: number = 1;
  @Input() url: string = '';
  @Output() handlePageOutputEvent = new EventEmitter();
  pagesCount = 1;
  constructor(private store: Store) {}
  ngOnInit(): void {
    console.log(this.total, this.limit, this.url);
    this.pagesCount = Math.ceil(this.total / this.limit);
    console.log(this.pagesCount);
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.handlePageOutputEvent.next(e);
    let limit = environment.limit;
    limit = e.pageSize;
    let offset = e.pageIndex * limit;
    let parsed = queryString.parse(this.url.split('?')[1]);
    console.log(parsed, 'url');
    parsed['offset'] = offset.toString();
    parsed['limit'] = limit.toString();
    let stringify = queryString.stringify(parsed);
    console.log(stringify);
    let url = this.url.split('?')[0] + '?' + stringify;
    console.log(url);
    this.store.dispatch(feedActions.getFeed({ url: url }));
  }
}
