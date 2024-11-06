import { Pipe, PipeTransform } from '@angular/core';
import { Manga } from '../../../models/mangadex';

@Pipe({
  name: 'coverArt',
  standalone: true,
})
export class CoverArtPipe implements PipeTransform {
  transform(manga: Manga, size: 'md' | 'lg' = 'md') {
    const coverArt = manga.relationships.find(
      relationship => relationship.type === 'cover_art'
    );

    return `https://mangadex.org/covers/${manga.id}/${coverArt?.attributes.fileName}.${size === 'md' ? '256' : '512'}.jpg`;
  }
}
