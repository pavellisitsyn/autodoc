import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsDetailComponent } from './main/news-detail/news-detail.component';
import { NewsListComponent } from './main/news-list/news-list.component';
import { ContentComponent } from './shared/components/global-layout/content/content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: '', redirectTo: '/news', pathMatch: 'full' },
      {
        path: 'news',
        component: NewsListComponent,
        data: {
          title: 'Новости'
        }
      },
      {
        path: 'news/item/:url',
        component: NewsDetailComponent,
        data: {
          title: 'Просмотреть новость'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
