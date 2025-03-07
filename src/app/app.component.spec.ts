import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {selectDataState, selectHistory} from './store/data.selectors';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideAnimationsAsync(),
        provideMockStore({
          selectors: [
            {
              selector: selectHistory,
              value: []
            },
            {
              selector: selectDataState,
              value: {history: []}
            }
          ]
        }),
        provideHttpClient(),
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set title', () => {
    expect(component.title).toBe('statistics-test-app');
  });

  it('should init hasData as false', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    expect(component.hasData()).toBeFalse();
  });

  it('should set hasData to true if selectHistory has data', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    store.overrideSelector(selectHistory, [
      {date: new Date(), data: [{category: 'A', value: 30}], fileName: 'file.json'}
    ]);
    store.refreshState();
    fixture.detectChanges();
    tick();
    expect(component.hasData()).toBeTrue();
  }));

  it('should not change hasData if selectHistory is empty', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    store.overrideSelector(selectHistory, []);
    fixture.detectChanges();
    expect(component.hasData()).toBeFalse();
  }));
});
