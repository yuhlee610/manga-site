import { Component, effect, inject, input, output } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  MangaOrderOptions,
  MangaPublicationDemographicOptions,
  StatusOptions,
  Tag,
} from '../../../models/mangadex';
import { SpaceDirective } from '../../../directives/space/space.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';

type SearchFormType = Partial<{
  title: string;
  status: string;
  sort: string;
  publicationDemographic: string;
  tags: string[];
}>;

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    SpaceDirective,
    NzButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  private formBuild = inject(FormBuilder);
  statusOptions = StatusOptions;
  mangaOrderOptions = MangaOrderOptions;
  publicationDemographicOptions = MangaPublicationDemographicOptions;

  tagList = input<Tag[]>();
  initialValues = input<SearchFormType>();
  search = output<SearchFormType>();

  searchForm = this.formBuild.group({
    title: [''],
    status: [''],
    sort: ['updatedAt.desc'],
    publicationDemographic: [''],
    includedTags: [['']],
  });

  constructor() {
    effect(() => {
      this.searchForm.patchValue({
        ...this.initialValues(),
      });
    });
  }

  onSubmit() {
    this.search.emit(
      this.searchForm.value as Record<string, string | string[]>
    );
  }
}