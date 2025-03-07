import {Component, Input} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [Dialog],
  template: `<p-dialog [(visible)]="modalService.isVisible" [closeOnEscape]="true" [modal]="true" [closable]="closable" [draggable]="false">
    <ng-content></ng-content>
  </p-dialog>`,
})
export class ModalComponent {
  @Input() closable: boolean = true;
  constructor(public modalService: ModalService) {}
}
