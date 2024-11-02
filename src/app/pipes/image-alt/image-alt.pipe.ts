import { Pipe, PipeTransform } from '@angular/core';
import { Manga } from '../../models/mangadex';

@Pipe({
  name: 'imageAlt',
  standalone: true,
})
export class ImageAltPipe implements PipeTransform {
  transform(manga: Manga, lang = 'en') {
    const alt = manga.attributes.altTitles.find((altTitle) => altTitle[lang]);
    return alt?.[lang];
  }
}
