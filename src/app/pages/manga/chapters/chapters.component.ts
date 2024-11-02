import { Component, signal } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [
    NzFlexModule,
    NzIconModule,
    NzTypographyModule,
    NzSwitchModule,
    FormsModule,
  ],
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.scss',
})
export class ChaptersComponent {
  isVi = signal(true);
}
