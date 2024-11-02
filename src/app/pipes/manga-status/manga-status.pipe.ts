import { Pipe, PipeTransform } from '@angular/core';
import { Manga } from '../../models/mangadex';

@Pipe({
  name: 'mangaStatus',
  standalone: true,
})
export class MangaStatusPipe implements PipeTransform {
  transform(value: Manga) {
    switch (value.attributes.status) {
      case 'completed':
        return 'Hoàn thành';
      case 'ongoing':
        return 'Đang ra';
      case 'hiatus':
        return 'Tạm dừng';
      case 'cancelled':
        return 'Bị hủy';
      default:
        return '';
    }
  }
}
