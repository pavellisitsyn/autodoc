import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NewsPost, NewsPostCreateForm } from 'src/app/shared/interfaces/news.interface';
import { NewsApiService } from 'src/app/shared/services/news-api.service';


@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  postSub: Subscription
  post: NewsPost | NewsPostCreateForm;

  constructor(
    private route: ActivatedRoute,
    private newsApi: NewsApiService,
  ) { }

  ngOnInit(): void {
    this.postSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.newsApi.getByNewsUrl(params['url'])
      })
    ).subscribe((post: NewsPost) => {
      this.post = post
    })
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe()
    }
  }

}
