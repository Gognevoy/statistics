import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {HistoryLoad} from '../../store/data.reducer';
import {Store} from '@ngrx/store';
import {selectData, selectHistory} from '../../store/data.selectors';
import * as DataActions from '../../store/data.actions';

@Component({
  selector: 'app-load-history',
  imports: [
    DatePipe,
    TableModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './load-history.component.html',
  styleUrl: './load-history.component.less'
})
export class LoadHistoryComponent implements OnInit {
  history: WritableSignal<HistoryLoad[]> = signal([]);
  sortField = signal<string>('date');
  sortOrder = signal<number>(-1);
  selectedFile: WritableSignal<HistoryLoad | undefined> = signal(undefined);
  private _data: HistoryLoad[] = [];

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectData).subscribe((data) => {
      if (data) {
        this.selectedFile.set(data);
      }
    })
    this.store.select(selectHistory).subscribe((data) => {
      if (data?.length) {
        this._data = [...data];
        this.history.set([...data]);
      }
    })
  }

  sortBy(name: 'fileName' | 'date'): void {
    if (this.sortField() === name) {
      this.sortOrder.set(this.sortOrder() === 1 ? -1 : 1);
    } else {
      this.sortField.set(name);
      this.sortOrder.set(1);
    }
  }

  onRowSelect(event: any) {
    const file = event.data;
    const historyPos = this._data.findIndex((elem) => file.date === elem.date)
    this.store.dispatch(DataActions.loadHistory({historyPos}));
  }
}
