import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faLevelUpAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { NewsPost, NewsPostCreateForm } from 'src/app/shared/interfaces/news.interface';
import { NewsApiService } from 'src/app/shared/services/news-api.service';
import { ScrollingHandlerService } from 'src/app/shared/services/scrolling-handler.service';
import { NewsPostCreateDialogComponent } from '../news-post-create-dialog/news-post-create-dialog.component';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent implements OnInit, OnDestroy {
  title: string = 'Новости'
  faLevelUpAlt = faLevelUpAlt
  faPlus = faPlus
  posts$: Observable<NewsPost[]>
  news: NewsPost[] | (NewsPost[] & NewsPostCreateForm[]) = [];
  color = 'accent';
  mode = 'indeterminate';
  userNews: string;
  newsListSub: Subscription
  pageNumber: number = 1;
  newsPerPage: number = 10;


  constructor(
    private newsApi: NewsApiService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private scrollService: ScrollingHandlerService,
  ) {
    this.userNews = localStorage.getItem('userNews')
    this.posts$ = this.newsApi.getAllNews(this.pageNumber, this.newsPerPage);
    this.getNews(this.pageNumber, this.newsPerPage)
  }

  ngOnInit(): void {
    // Check if we have saved to localStorage news; if yes, add them to existing array
    if (this.userNews) {
      const userNews = JSON.parse(localStorage.getItem('userNews'))
      userNews.forEach(element => {
        this.news = [element, ...this.news]
      });
    }
    // Scroll and trigger uploading new scope of news
    this.scrollService.getObservable().subscribe(status => {
      if (status) {
        this.pageNumber = this.pageNumber + 1;
        this.getNews(this.pageNumber, this.newsPerPage);
      }
    })
  }

  getNews(pageNumber: number, newsPerPage: number) {
    this.newsListSub = this.newsApi.getAllNews(pageNumber, newsPerPage).subscribe(response => {
      // Add new scope of news to existing array (no duplicates)
      this.news = this.news.concat(response);
      let clear = setInterval(() => {
        let target = document.querySelector(`#target${pageNumber * this.newsPerPage}`);
        if (target) {
          clearInterval(clear);
          this.scrollService.setObserver().observe(target);
        }
      }, 1000)
    },
      err => {
        console.log(err);
      })
  }

  addNews() {
    // Add news post function
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(NewsPostCreateDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      res => {
        res.data.forEach(element => {
          this.news = [element, ...this.news];
          // Detect changes in news list
          this.cdr.markForCheck();
        });
      }
    );
  }

  topFunction() {
    // 'Get-top' function
    if (document.body || document.documentElement) {
      document.body.scrollTop = 0; // Для Safari
      document.documentElement.scrollTop = 0; // Для Chrome, Opera, Firefox и IE
    }
  }

  ngOnDestroy() {
    this.newsListSub.unsubscribe()
  }

}
