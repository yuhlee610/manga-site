import { Pipe, PipeTransform } from '@angular/core';
import { Chapter } from '../../../models/mangadex';

@Pipe({
  name: 'chapterName',
  standalone: true,
})
export class ChapterNamePipe implements PipeTransform {
  transform(chapter: Chapter): unknown {
    const chapterTitle = chapter.attributes.title;
    return `Chương ${chapter.attributes.chapter}${chapterTitle ? ` - ${chapterTitle}` : ''}`;
  }
}
