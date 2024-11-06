import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chapterImage',
  standalone: true,
})
export class ChapterImagePipe implements PipeTransform {
  transform(value: string, baseUrl: string, chapterHash: string): unknown {
    return `${baseUrl}/data/${chapterHash}/${value}`;
  }
}
