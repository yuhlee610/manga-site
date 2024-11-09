import { Pipe, PipeTransform } from '@angular/core';
import { LocalizedString, Manga } from '../../../models/mangadex';

@Pipe({
  name: 'mangaTitle',
  standalone: true,
})
export class MangaTitlePipe implements PipeTransform {
  transform<T extends LocalizedString>(
    value: T,
    maxWordsCount: number = Number.MAX_SAFE_INTEGER
  ) {
    console.log(value)
    const title = value['en'] || value['ja-ro'] || value['ja'];
    const words = title.split(' ');
    const truncatedTitle = words.slice(0, maxWordsCount);

    return `${truncatedTitle.join(' ')}${words.length > truncatedTitle.length ? '...' : ''}`;
  }
}
