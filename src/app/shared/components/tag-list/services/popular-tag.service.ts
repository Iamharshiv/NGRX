import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetFeedResponseInterface } from '../../../types/getFeedResponse.interface';
import { environment } from 'src/environments/environment.development';
import { IPopularTagResponseInterface } from 'src/app/shared/types/popularTags.interface';
import { IpopularTag } from 'src/app/shared/types/tag-list.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<IpopularTag> {
    const fullUrl = environment.apiUrl + '/tags';
    return this.http.get<IpopularTag>(fullUrl);
  }
}
