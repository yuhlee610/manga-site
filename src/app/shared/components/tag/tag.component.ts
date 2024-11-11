import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [NzTagModule, RouterLink],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  tagId = input();
}
