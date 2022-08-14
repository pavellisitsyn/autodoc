import { Component, Input, OnInit } from '@angular/core';
import { NewsPost } from 'src/app/shared/interfaces/news.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.scss']
})
export class NewsPostComponent implements OnInit {
  @Input() post: NewsPost
  @Input() idx: number
  image: SafeResourceUrl;
  url: string;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    if (this.post.imageFile) {
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${this.post.imageFile}`)
    }
  }

}
