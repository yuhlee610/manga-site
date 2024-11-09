import { Pipe, PipeTransform } from '@angular/core';
import { Relationship } from '../../../models/mangadex';

@Pipe({
  name: 'relationship',
  standalone: true,
})
export class RelationshipPipe implements PipeTransform {
  transform(relationships: Relationship[], type: string) {
    return relationships.find(relationship => relationship.type === type);
  }
}
