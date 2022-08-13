import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsPost } from 'src/app/shared/interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  baseUrl = "https://webapi.autodoc.ru";
  pageNumber = 1;
  newsPerPage = 10;

  httpHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });

  constructor(private http: HttpClient) { }

  getAllNews(pageNumber: number): Observable<NewsPost[]> {
    return this.http.get(`${this.baseUrl}/api/news/${pageNumber}/${this.newsPerPage}`, { headers: this.httpHeaders })
      .pipe(map((response: { [news: string]: any }) => {
        return Object
          .keys(response.news)
          .map(news => ({
            ...response.news[news],
          })
          )
      }))
  }

  getByNewsUrl(url: string): Observable<NewsPost> {
    return this.http.get<NewsPost>(`${this.baseUrl}/api/news/item/${url}`, { headers: this.httpHeaders })
      .pipe(map((post: NewsPost) => {
        return {
          ...post,
        }
      }))
  }

}
