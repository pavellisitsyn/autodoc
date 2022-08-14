import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './main/news-list/news-list.component';
import { NewsDetailComponent } from './main/news-detail/news-detail.component';
import { NewsPostComponent } from './main/news-post/news-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/modules/shared.module';
import { NewsPostCreateDialogComponent } from './main/news-post-create-dialog/news-post-create-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from './shared/components/global-layout/content/content.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


registerLocaleData(ruLocale, 'ru')

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsDetailComponent,
    NewsPostComponent,
    NewsPostCreateDialogComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
