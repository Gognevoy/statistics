import { createAction, props } from '@ngrx/store';
import {Data, HistoryLoad} from './data.reducer';

export const loadDataSuccess = createAction(
  '[File Upload] Load Data Success',
  props<HistoryLoad>()
);
export const loadHistory = createAction(
  'load Data From History',
  props<{ historyPos: number }>()
);

export const filterSortData = createAction(
  'filter Or Sort Data',
  props<{ data: Data[] }>()
);

