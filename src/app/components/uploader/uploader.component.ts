import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {FileUpload, FileSelectEvent} from 'primeng/fileupload';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {Store} from '@ngrx/store';
import * as DataActions from '../../store/data.actions';
import {ModalComponent} from '../modal/modal.component';
import {selectHistory} from '../../store/data.selectors';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-uploader',
  standalone: true,
  imports: [FileUpload, ToastModule, ModalComponent],
  providers: [MessageService],
  templateUrl: './uploader.component.html',
})
export class UploaderComponent implements OnInit {
  maxSize: number = 5242880;
  showButton: WritableSignal<boolean> = signal(false);
  constructor(private store: Store, private messageService: MessageService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.store.select(selectHistory).subscribe(state => {
      if (!state.length) {
        this.modalService.open();
      } else {
        this.showButton.set(true);
      }
    })
  }

  onFileSelect(event: FileSelectEvent) {
    const file: File = event.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          this.store.dispatch(DataActions.loadDataSuccess({date: new Date(), data: jsonData, fileName: file.name}));
          this.modalService.close();
        } catch (error) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: `${error}`});
        }
      };
      reader.readAsText(file);
    }
  }
}
