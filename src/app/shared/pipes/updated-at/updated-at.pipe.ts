import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'updatedAt',
  standalone: true,
})
export class UpdatedAtPipe implements PipeTransform {
  transform(value?: string): unknown {
    if (!value) return '';

    const minutes = dayjs().diff(value, 'm');
    if (minutes < 60) return `khoảng ${minutes} phút`;

    const hour = dayjs().diff(value, 'h');
    if (hour < 24) return `khoảng ${hour} giờ`;

    const days = dayjs().diff(value, 'd');
    return `${days} ngày`;
  }
}
