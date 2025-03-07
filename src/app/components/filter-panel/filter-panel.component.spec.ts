import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterPanelComponent} from './filter-panel.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {selectData} from '../../store/data.selectors';
import * as DataActions from '../../store/data.actions';

describe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;
  let store: MockStore<any>;

  const mockData = {
    date: new Date(),
    data: [
      {category: 'Category A', value: 10},
      {category: 'Category B', value: 20},
      {category: 'Category C', value: 30},
    ],
    fileName: 'file.json'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPanelComponent],
      declarations: [],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectData,
              value: {data: mockData},
            }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should reset sortOrder and minValue when data is loaded', () => {
    const mockHistory = mockData;

    store.overrideSelector(selectData, mockHistory);
    fixture.detectChanges();

    expect(component.sortOrder()).toBe('asc');
    expect(component.minValue()).toBeUndefined();
  });

  it('should filter data based on minValue', () => {
    component.minValue.set(15);

    const filteredData = component['filterCategories'](mockData.data);
    expect(filteredData.length).toBe(2);
    expect(filteredData[0].value).toBeGreaterThanOrEqual(15);
  });

  it('should sort data in ascending order (A-Z)', () => {
    component.sortOrder.set('asc');

    const sortedData = component['sortCategories'](mockData.data);
    expect(sortedData[0].category).toBe('Category A');
    expect(sortedData[1].category).toBe('Category B');
    expect(sortedData[2].category).toBe('Category C');
  });

  it('should sort data in descending order (Z-A)', () => {
    component.sortOrder.set('desc');

    const sortedData = component['sortCategories'](mockData.data);
    expect(sortedData[0].category).toBe('Category C');
    expect(sortedData[1].category).toBe('Category B');
    expect(sortedData[2].category).toBe('Category A');
  });

  it('should dispatch filterSortData action on onSortCategories()', () => {
    const fixture = TestBed.createComponent(FilterPanelComponent);
    const component = fixture.componentInstance;

    store.overrideSelector(selectData, mockData);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
    component.onSortCategories();
    expect(store.dispatch).toHaveBeenCalledWith(DataActions.filterSortData({
      data: mockData.data,
    }));
  });

  it('should dispatch filterSortData action on onFilterCategories()', () => {
    const fixture = TestBed.createComponent(FilterPanelComponent);
    const component = fixture.componentInstance;
    store.overrideSelector(selectData, mockData);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
    component.onFilterCategories();
    expect(store.dispatch).toHaveBeenCalledWith(
      DataActions.filterSortData({data: mockData.data})
    );
  });
});
