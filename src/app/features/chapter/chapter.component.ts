import { Component, inject, input, OnInit } from '@angular/core';
import { ChapterService } from '../../shared/services/chapter/chapter.service';
import { Observable } from 'rxjs';
import { GetAtHomeServerChapterIdResponse } from '../../models/atHome';
import { AsyncPipe } from '@angular/common';
import { ChapterImagePipe } from '../../shared/pipes/chapter-image/chapter-image.pipe';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [AsyncPipe, ChapterImagePipe],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss',
})
export class ChapterComponent implements OnInit {
  private chapterService = inject(ChapterService);

  chapterId = input.required<string>();
  content$?: Observable<GetAtHomeServerChapterIdResponse>;

  ngOnInit(): void {
    this.content$ = this.chapterService.getChapterDetail(this.chapterId());
  }
}
