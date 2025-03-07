import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DataState } from './data.reducer';

export const selectDataState = createFeatureSelector<DataState>('dataState');
export const selectData = createSelector(selectDataState, (state) => state.history[state.selectedData]);
export const selectHistory = createSelector(selectDataState, (state) => state.history);
export const selectFilteredData = createSelector(selectDataState, (state) => state.activeData);
