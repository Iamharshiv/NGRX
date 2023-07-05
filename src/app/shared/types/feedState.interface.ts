import { IGetFeedResponseInterface } from './getFeedResponse.interface';

export interface IFeedStateInterface {
  isLoadding: boolean;
  error: string | null;
  data: IGetFeedResponseInterface | null;
}
