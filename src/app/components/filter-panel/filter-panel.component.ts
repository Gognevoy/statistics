import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumber} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {selectData} from '../../store/data.selectors';
import {Data, HistoryLoad} from '../../store/data.reducer';
import {Store} from '@ngrx/store';
import * as DataActions from '../../store/data.actions';

@Component({
  selector: 'app-filter-panel',
  imports: [
    DropdownModule,
    InputNumber,
    FormsModule
  ],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.less'
})
export class FilterPanelComponent implements OnInit {
  data: Data[] = [];

  sortOrder = signal('asc');
  minValue: WritableSignal<number | undefined>  = signal(undefined);

  sortOptions = [
    {label: 'A-Z', value: 'asc'},
    {label: 'Z-A', value: 'desc'}
  ];

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectData).subscribe((history: HistoryLoad) => {
      if (history?.data?.length) {
        this.data = history.data;
        this.minValue.set(undefined);
        this.sortOrder.set('asc');
      }
    })
  }

  onSortCategories() {
    this.store.dispatch(DataActions.filterSortData({data: this.sortCategories(this.filterCategories(this.data))}));
  }

  onFilterCategories() {
    this.store.dispatch(DataActions.filterSortData({data: this.filterCategories(this.sortCategories(this.data))}));
  }

  private filterCategories(data: Data[]): Data[] {
    const value = this.minValue();
    if(!!value) {
      return data.filter(item => item.value >= value);
    }
    return data;
  }

  private sortCategories(data: Data[]): Data[] {
    const order = this.sortOrder();
    return data.slice().sort((a, b) => order === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category));
  }
}
