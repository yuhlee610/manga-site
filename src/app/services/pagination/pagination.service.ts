import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  changePage(pageIndex: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: pageIndex },
      queryParamsHandling: 'merge',
      onSameUrlNavigation: 'reload',
    });
  }
}
