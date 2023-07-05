import { IProfileInterface } from './profile.interface';

export interface IArticleInterface {
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
  author: IProfileInterface;

  // Todo: Add author interface
}
