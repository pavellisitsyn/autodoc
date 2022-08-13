import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedLibsModule } from './shared-libs/shared-libs.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedLibsModule,
    FontAwesomeModule,
  ],
  exports: [
    HttpClientModule,
    SharedLibsModule,
    FontAwesomeModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru-RU" }
  ]
})
export class SharedModule { }
