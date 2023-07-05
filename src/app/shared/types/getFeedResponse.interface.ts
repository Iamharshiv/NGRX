import { IArticleInterface } from './article.interface';

export interface IGetFeedResponseInterface {
  articles: IArticleInterface[];
  articlesCount: number;
}
