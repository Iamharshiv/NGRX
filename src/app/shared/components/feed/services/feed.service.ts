import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetFeedResponseInterface } from '../../../types/getFeedResponse.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<IGetFeedResponseInterface> {
    const fullUrl = environment.apiUrl + url;
    return this.http.get<IGetFeedResponseInterface>(fullUrl);
  }
}
