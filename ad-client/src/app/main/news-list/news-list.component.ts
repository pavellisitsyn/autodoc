import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';
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
  faLevelUpAlt = faLevelUpAlt
  posts$: Observable<NewsPost[]>
  news: NewsPost[] | (NewsPost[] & NewsPostCreateForm[]) = [];
  color = 'accent';
  mode = 'indeterminate';
  newsListSub: Subscription
  pageNumber: number = 1;
  itemsPerPage: number = 10;


  constructor(
    private newsApi: NewsApiService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private scrollService: ScrollingHandlerService,
  ) {
    this.posts$ = this.newsApi.getAllNews(this.pageNumber);
  }

  ngOnInit(): void {
    this.getNews(this.pageNumber)

    if (localStorage.getItem('userNews')) {
      const userNews = JSON.parse(localStorage.getItem('userNews'))
      userNews.forEach(element => {
        this.news = [element, ...this.news]
      });
    }

    // this.newsListSub = this.newsApi.getAllNews(this.pageNumber).subscribe(
    //   data => {
    //     this.news = data;
    //     if (localStorage.getItem('userNews')) {
    //       const userNews = JSON.parse(localStorage.getItem('userNews'))
    //       userNews.forEach(element => {
    //         return this.news = [element, ...this.news]
    //       });
    //     } else {
    //       return this.news
    //     }
    //   },
    //   error => {
    //     console.log(error)
    //   },
    // )

    this.scrollService.getObservable().subscribe(status => {
      if (status) {
        this.pageNumber = this.pageNumber + 1;
        this.getNews(this.pageNumber);
      }
    })
  }

  getNews(pageNumber: number) {
    this.newsListSub = this.newsApi.getAllNews(pageNumber).subscribe(response => {
      this.news = this.news.concat(response);
      let clear = setInterval(() => {
        let target = document.querySelector(`#target${pageNumber * this.itemsPerPage}`);
        if (target) {
          console.log("last element found")
          clearInterval(clear);
          this.scrollService.setObserver().observe(target);
        }
      }, 500)
    },
      err => {
        console.log(err);
      })
  }

  // @HostListener("window:scroll", [])
  // onScroll(): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
  //     this.pageNumber = this.pageNumber + 1
  //     this.newsListSub = this.newsApi.getAllNews(this.pageNumber).subscribe(
  //       newPortion => {
  //         this.news = this.news.concat(newPortion);
  //       })
  //   }
  // }

  addNews() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(NewsPostCreateDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      res => {
        res.data.forEach(element => {
          this.news = [element, ...this.news];
          this.cdr.markForCheck();
        });
      }
    );
  }

  topFunction() {
    if (document.body || document.documentElement) {
      document.body.scrollTop = 0; // Для Safari
      document.documentElement.scrollTop = 0; // Для Chrome, Opera, Firefox и IE
    }
  }

  ngOnDestroy() {
    this.newsListSub.unsubscribe()
  }

}
