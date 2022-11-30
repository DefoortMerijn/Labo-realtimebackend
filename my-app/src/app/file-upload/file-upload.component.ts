import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file!: File;
  images: string[] = [];
  imageSrc: string = '';
  imgSrc = '';
  public imagePath?: File;
  imgURL: any;
  public message: string = '';
  // Variable to store file

  // Inject service
  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event?: any) {
    this.file = event.target.files[0];
    this.images.push(this.file.name);
    console.log(this.images);
  }
  imgFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imgSrc = URL.createObjectURL(event.target.files[0]);
      this.images.push(this.imgSrc);
    }
  }

  preview(files: any) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.images.push(this.imgURL);
      console.log(this.imgURL);
    };
  }

  // on file Select add to list of images
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        // Short link via api response
        this.shortLink = event.link;
        this.images.push(this.shortLink);
        this.loading = false; // Flag variable
        console.log(this.images);
      }
    });
  }
}
