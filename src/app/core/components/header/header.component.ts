import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzFlexModule,
    NzInputModule,
    RouterLink,
    NzTypographyModule,
    NzIconModule,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = signal('');
  router = inject(Router);

  submit(event: KeyboardEvent) {
    if (event.key !== 'Enter' || this.title() === '') return;

    this.router.navigate(['/search'], {
      queryParams: {
        title: this.title(),
        sort: 'relevance.desc',
      },
    });
  }
}
