import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankMangaCardComponent } from './rank-manga-card.component';

describe('RankMangaCardComponent', () => {
  let component: RankMangaCardComponent;
  let fixture: ComponentFixture<RankMangaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankMangaCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RankMangaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
