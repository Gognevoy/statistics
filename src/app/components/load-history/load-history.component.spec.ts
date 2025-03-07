import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoadHistoryComponent} from './load-history.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {StoreModule} from '@ngrx/store';
import {selectData, selectHistory} from '../../store/data.selectors';
import {HistoryLoad} from '../../store/data.reducer';
import * as DataActions from '../../store/data.actions';

describe('LoadHistoryComponent', () => {
  let component: LoadHistoryComponent;
  let fixture: ComponentFixture<LoadHistoryComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [LoadHistoryComponent, StoreModule.forRoot({})],
      providers: [
        provideMockStore({
          selectors: [
            {selector: selectData, value: undefined},
            {selector: selectHistory, value: []}
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore) as MockStore;
    fixture = TestBed.createComponent(LoadHistoryComponent);
    component = fixture.componentInstance;

    dispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedFile when selectData changes', () => {
    const mockFile: HistoryLoad = {fileName: 'test.txt', date: new Date(), data: [{category: 'A', value: 25}]};
    store.overrideSelector(selectData, mockFile);
    store.refreshState();
    fixture.detectChanges();

    expect(component.selectedFile()).toEqual(mockFile);
  });

  it('should update history when selectHistory changes', () => {
    const mockHistory: HistoryLoad[] = [
      {fileName: 'file1.txt', date: new Date(), data: [{category: 'B', value: 30}]},
      {fileName: 'file2.txt', date: new Date(), data: [{category: 'C', value: 50}]}
    ];
    store.overrideSelector(selectHistory, mockHistory);
    store.refreshState();
    fixture.detectChanges();

    expect(component.history()).toEqual(mockHistory);
  });

  it('should correctly sort by date', () => {
    component.sortBy('date');
    expect(component.sortField()).toBe('date');
    expect(component.sortOrder()).toBe(1);
  });

  it('should toggle sort order when clicking the same field again', () => {
    component.sortBy('date');
    component.sortBy('date');
    expect(component.sortOrder()).toBe(-1);
  });

  it('should dispatch loadHistory action when a row is selected', () => {
    const mockData: HistoryLoad[] = [
      {fileName: 'file1.txt', date: new Date(), data: [{category: 'B', value: 30}]},
      {fileName: 'file2.txt', date: new Date(), data: [{category: 'C', value: 50}]}
    ];
    component['_data'] = mockData;
    component.history.set(mockData);
    component.onRowSelect({data: mockData[1]});

    expect(dispatchSpy).toHaveBeenCalledWith(
      DataActions.loadHistory({historyPos: 1})
    );
  });
});
