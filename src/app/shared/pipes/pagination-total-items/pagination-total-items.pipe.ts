import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationTotalItems',
  standalone: true,
})
export class PaginationTotalItemsPipe implements PipeTransform {
  private offsetLimit = 10000;

  transform(totalItems: number) {
    return Math.min(this.offsetLimit, totalItems);
  }
}
