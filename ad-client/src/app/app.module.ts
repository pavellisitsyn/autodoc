import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './main/news-list/news-list.component';
import { NewsDetailComponent } from './main/news-detail/news-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
