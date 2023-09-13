import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalWindowService } from 'src/app/core/services/modal-window.service';

@Component({
  selector: 'app-upload-receipt',
  templateUrl: './upload-receipt.component.html',
  styleUrls: ['./upload-receipt.component.scss']
})
export class UploadReceiptComponent {

  constructor(
    private modalService: ModalWindowService
  ){}

  @Output() changeFile = new EventEmitter<any>();

  public receipt: string
  public files: any[] = [];
  public uploadImage: string = "../../../../../assets/images/upoload.png"

  onFileDropped($event) {
    this.prepareFilesList($event);
  }


  fileBrowseHandler(files) {
    this.prepareFilesList(files.target.files);
  }


  deleteFile(index: number) {
    this.files = [];
    this.receipt = undefined
  }


  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
            this.receipt = this.files[0].name
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }


  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      console.log( this.files)
      this.changeFile.emit(this.files);
    }
    this.uploadFilesSimulator(0);
  }


  formatBytes(bytes, decimals?) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  showReceipt():void{
    this.modalService.showReceipt(this.receipt)
  }


}
