import { IArticleInterface } from './article.interface';

export interface IArticleStateInterface {
  isLoading: boolean;
  error: string | null;
  data: IArticleInterface | null;
}
