import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BarChartComponent} from './bar-chart.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartComponent],
      providers: [
        provideMockStore({initialState: {filteredData: []}}),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove current SVG before create new', () => {
    const svgElement = document.createElement('svg');
    component.barChartRef.nativeElement.appendChild(svgElement);

    component['createBarChart']();

    expect(component.barChartRef.nativeElement.querySelector('svg')).toBeTruthy();
  });
});
