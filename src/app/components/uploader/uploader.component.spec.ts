import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UploaderComponent} from './uploader.component';
import {MessageService} from 'primeng/api';
import {ModalService} from '../../services/modal.service';
import {provideHttpClient} from '@angular/common/http';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {selectHistory} from '../../store/data.selectors';

describe('UploaderComponent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;
  let store: MockStore<any>;
  let messageService: jasmine.SpyObj<MessageService>;
  let modalService: jasmine.SpyObj<ModalService>;
  const initialState = {
    history: [],
  };
  beforeEach(() => {
    messageService = jasmine.createSpyObj('MessageService', ['add']);
    modalService = jasmine.createSpyObj('ModalService', ['open', 'close']);

    TestBed.configureTestingModule({
      imports: [UploaderComponent],
      providers: [
        provideMockStore({ initialState }),
        {provide: MessageService, useValue: messageService},
        {provide: ModalService, useValue: modalService},
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });


  it('should call modalService.open if store history is empty', () => {
    store.overrideSelector(selectHistory, []);
    component.ngOnInit();
    fixture.detectChanges();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should set showButton to true if history has data', () => {
    store.overrideSelector(selectHistory, [{
      date: new Date(),
      data: [{ category: 'A', value: 40 }],
      fileName: 'test.json',
      type: '[File Upload] Load Data Success'
    }]);
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.showButton()).toBe(true);
  });
});
