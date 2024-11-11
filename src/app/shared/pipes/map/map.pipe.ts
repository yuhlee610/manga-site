import { Pipe, PipeTransform } from '@angular/core';
import { Relationship } from '../../../models/mangadex';
import _ from 'lodash';

@Pipe({
  name: 'map',
  standalone: true,
})
export class MapPipe implements PipeTransform {
  transform(value: Relationship | undefined, key: string) {
    return _.get(value, key) ?? '';
  }
}
