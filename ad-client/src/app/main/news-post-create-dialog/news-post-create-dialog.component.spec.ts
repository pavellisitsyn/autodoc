import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPostCreateDialogComponent } from './news-post-create-dialog.component';

describe('NewsPostCreateDialogComponent', () => {
  let component: NewsPostCreateDialogComponent;
  let fixture: ComponentFixture<NewsPostCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsPostCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPostCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
