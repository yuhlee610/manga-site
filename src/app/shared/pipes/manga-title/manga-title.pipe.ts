import { Pipe, PipeTransform } from '@angular/core';
import { Manga } from '../../../models/mangadex';

@Pipe({
  name: 'mangaTitle',
  standalone: true,
})
export class MangaTitlePipe implements PipeTransform {
  transform(value: Manga, maxWordsCount: number = Number.MAX_SAFE_INTEGER) {
    const title =
      value.attributes.title['en'] ||
      value.attributes.title['ja-ro'] ||
      value.attributes.title['ja'];
    const words = title.split(' ');
    const truncatedTitle = words.slice(0, maxWordsCount);

    return `${truncatedTitle.join(' ')}${words.length > truncatedTitle.length ? '...' : ''}`;
  }
}
