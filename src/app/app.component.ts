import {Component, signal, WritableSignal} from '@angular/core';
import {UploaderComponent} from './components/uploader/uploader.component';
import {BarChartComponent} from './components/bar-chart/bar-chart.component';
import {PieChartComponent} from './components/pie-chart/pie-chart.component';
import {FilterPanelComponent} from './components/filter-panel/filter-panel.component';
import {LoadHistoryComponent} from './components/load-history/load-history.component';
import {Menubar} from 'primeng/menubar';
import {Panel} from 'primeng/panel';
import {Store} from '@ngrx/store';
import {selectHistory} from './store/data.selectors';

@Component({
  selector: 'app-root',
  imports: [
    UploaderComponent,
    BarChartComponent,
    PieChartComponent,
    FilterPanelComponent,
    LoadHistoryComponent,
    Menubar,
    Panel,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  hasData: WritableSignal<boolean> = signal(false);
  title = 'statistics-test-app';

  constructor(private store: Store) {
    this.store.select(selectHistory).subscribe(state => {
      if (state.length) {
        this.hasData.set(true);
      }
    })
  }
}
