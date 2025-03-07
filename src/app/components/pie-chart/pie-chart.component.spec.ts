import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PieChartComponent} from './pie-chart.component';
import {provideMockStore} from '@ngrx/store/testing';
import {ElementRef} from '@angular/core';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartComponent],
      declarations: [],
      providers: [
        provideMockStore({initialState: {filteredData: []}}),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    component.pieChartRef = new ElementRef(document.createElement('div'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should remove current SVG before create new', () => {
    const svgElement = document.createElement('svg');

    component.pieChartRef.nativeElement.appendChild(svgElement);
    component['createPieChart']();
    expect(component.pieChartRef.nativeElement.querySelector('svg')).toBeTruthy();
  });
});
