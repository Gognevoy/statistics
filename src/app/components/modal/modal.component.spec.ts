import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalComponent} from './modal.component';
import {ModalService} from '../../services/modal.service';
import {Dialog} from 'primeng/dialog';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalComponent, Dialog],
      declarations: [],
      providers: [ModalService, provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal when modalService.isVisible is true', () => {
    modalService.isVisible = true;
    fixture.detectChanges();

    const dialogElement = fixture.nativeElement.querySelector('p-dialog');
    expect(dialogElement).toBeTruthy();
    expect(dialogElement.getAttribute('ng-reflect-visible')).toBe('true');
  });

  it('should hide modal when modalService.isVisible is false', () => {
    modalService.isVisible = false;
    fixture.detectChanges();

    const dialogElement = fixture.nativeElement.querySelector('p-dialog');
    expect(dialogElement.getAttribute('ng-reflect-visible')).toBe('false');
  });

  it('should apply closable input correctly', () => {
    component.closable = false;
    fixture.detectChanges();

    const dialogElement = fixture.nativeElement.querySelector('p-dialog');
    expect(dialogElement.getAttribute('ng-reflect-closable')).toBe('false');
  });
});
