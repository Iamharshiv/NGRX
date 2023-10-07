import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticleInterface } from 'src/app/shared/types/article.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}
  articleUrl = 'articles/';

  getArticle(slug: string): Observable<IArticleInterface> {
    return this.http.get<IArticleInterface>(
      environment.apiUrl + this.articleUrl + slug
    );
  }
}
