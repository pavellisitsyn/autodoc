import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { NewsPostCreateForm } from 'src/app/shared/interfaces/news.interface';

@Component({
  selector: 'app-news-post-create-dialog',
  templateUrl: './news-post-create-dialog.component.html',
  styleUrls: ['./news-post-create-dialog.component.scss']
})
export class NewsPostCreateDialogComponent implements OnInit {
  baseUrl = 'https://www.autodoc.ru';
  imageStorageBaseUrl = 'https://file.autodoc.ru/news/avto-novosti';
  createNewsPostForm: FormGroup;
  userNews: NewsPostCreateForm[] = []
  selectedPhoto: File = null
  base64Output: string;

  constructor(
    private dialogRef: MatDialogRef<NewsPostCreateDialogComponent>,
    private _formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // Check if we erlier saved to localStorage some news; if yes, add them to existing array
    if (localStorage.getItem('userNews')) {
      this.userNews = JSON.parse(localStorage.userNews)
    }
    // New news post form
    this.createNewsPostForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      fullUrl: ['', Validators.required],
      titleImageUrl: ['', Validators.required],
      categoryType: ['', Validators.required],
      imageFile: '',
    });
  }

  onFileSelected(event) {
    // Get file and convert it to base64
    if (<File>event.target.files[0]) {
      this.selectedPhoto = <File>event.target.files[0];
      this.convertFile(this.selectedPhoto).subscribe(base64 => {
        this.base64Output = base64;
      });
    }
  }

  convertFile(file: File): Observable<string> {
    // Convert to base64 function
    if (file) {
      const result = new ReplaySubject<string>(1);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (event) => result.next(btoa(event.target.result.toString()));
      return result;
    }
  }

  submit() {
    // Save form
    const newsPost: NewsPostCreateForm = {
      title: this.createNewsPostForm.value.title,
      description: this.createNewsPostForm.value.description,
      publishedDate: new Date,
      url: this.createNewsPostForm.value.url,
      fullUrl: `${this.baseUrl}/${this.createNewsPostForm.value.url}`,
      titleImageUrl: `${this.imageStorageBaseUrl}/${this.selectedPhoto.name}` || null,
      categoryType: this.createNewsPostForm.value.categoryType,
      imageFile: this.base64Output,
    }
    // Push new created post to array and save updated array to localStorage (as string)
    this.userNews.push(newsPost)
    localStorage.setItem('userNews', JSON.stringify(this.userNews))
    // Reset form and close the dialog
    this.createNewsPostForm.reset()
    this.dialogRef.close({ data: newsPost })
  }

}
