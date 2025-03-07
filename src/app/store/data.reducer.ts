import { createReducer, on } from '@ngrx/store';
import * as DataActions from './data.actions';

const HISTORY_LENGTH = 5;

export interface HistoryLoad {
  date: Date;
  data: Data[];
  fileName: string;
}

export interface Data {
  category: string;
  value: number;
}

export interface DataState {
  history: HistoryLoad[];
  selectedData: number;
  activeData?: Data[]
}

export const initialState: DataState = {
  history: [],
  selectedData: 0,
  activeData: undefined,
};

const updateHistory = (state: DataState, newData: HistoryLoad ) => {
  const history =  [...state.history];
  if (history.length >= HISTORY_LENGTH) {
    history.shift();
  }
  history.push(newData);
  return {
    ...state,
    history: [...history],
    selectedData: history.length - 1,
    activeData: history[history.length - 1].data,
  };
}

export const dataReducer = createReducer(
  initialState,
  on(DataActions.loadDataSuccess, (state, { date, data, fileName }) => ({
    ...updateHistory(state, { date, data, fileName }),
  })),
  on(DataActions.loadHistory, (state, { historyPos }) => ({
    ...state,
    selectedData: historyPos,
    activeData: state.history[historyPos].data,
  })),
  on(DataActions.filterSortData, (state, { data }) => ({
    ...state,
    activeData: data
  }))
);


