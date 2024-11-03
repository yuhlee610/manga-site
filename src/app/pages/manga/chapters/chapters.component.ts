import { Component, computed, inject, input, signal } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { GB, VN } from 'country-flag-icons/string/3x2';
import { DomSanitizer } from '@angular/platform-browser';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SpaceDirective } from '../../../directives/space/space.directive';
import { Chapter } from '../../../models/mangadex';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ChapterNamePipe } from '../../../pipes/chapter-name/chapter-name.pipe';

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
  ],
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.scss',
})
export class ChaptersComponent {
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  chapters = input.required<Chapter[]>();
  lang = input<string>();
  isVietNamFlag = computed(() => (this.lang() === 'en' ? false : true));

  VNFlag = this.sanitizer.bypassSecurityTrustHtml(VN);
  GBFlag = this.sanitizer.bypassSecurityTrustHtml(GB);

  click() {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: { lang: this.lang() === 'vi' ? 'en' : 'vi' },
      queryParamsHandling: 'merge',
      onSameUrlNavigation: 'reload',
    });
  }
}
