import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IArticleInterface } from 'src/app/shared/types/article.interface';
// import { props } from "cypress/types/bluebird";

export const favorBtnActions = createActionGroup({
  source: 'favorBtn',
  events: {
    'favor button for feed': emptyProps(),
    'favor button for feed-detail': emptyProps(),
  },
});
