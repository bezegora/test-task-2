import { Component, inject } from '@angular/core';
import { CompanyItemComponent } from '../../components/company-item/company-item.component';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company-service.service';
import { CompanySortComponent } from '../../components/company-sort/company-sort.component';
import { CompanyFilterComponent } from '../../components/company-filter/company-filter.component';
import { FilterType } from '../../types/filter.type';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    CompanyItemComponent,
    CommonModule,
    CompanySortComponent,
    CompanyFilterComponent
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  providers: []
})
export class CompanyListComponent {

  private _compService = inject(CompanyService);
  public companyList$ = this._compService.filteredCompanyList$;

  constructor() { }

  public onFilterChanged(filters: FilterType): void {
    this._compService.filterCompanies(filters);
  }

  public onSortChanged(sortType: string): void {
    this._compService.sortCompanies(sortType);
  }
}
