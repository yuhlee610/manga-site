import { Component, computed, inject, input, output } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { GB, VN } from 'country-flag-icons/string/3x2';
import { DomSanitizer } from '@angular/platform-browser';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SpaceDirective } from '../../../../shared/directives/space/space.directive';
import { ChapterNamePipe } from '../../../../shared/pipes/chapter-name/chapter-name.pipe';
import { Chapter } from '../../../../models/mangadex';

@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [
    NzFlexModule,
    NzIconModule,
    NzTypographyModule,
    NzSwitchModule,
    FormsModule,
    NzGridModule,
    SpaceDirective,
    DatePipe,
    ChapterNamePipe,
    RouterLink,
  ],
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.scss',
})
export class ChaptersComponent {
  private sanitizer = inject(DomSanitizer);

  chapters = input.required<Chapter[]>();
  lang = input<string>();
  isVietNamFlag = computed(() => (this.lang() === 'en' ? false : true));
  changeLang = output();

  VNFlag = this.sanitizer.bypassSecurityTrustHtml(VN);
  GBFlag = this.sanitizer.bypassSecurityTrustHtml(GB);

  click() {
    this.changeLang.emit();
  }
}
