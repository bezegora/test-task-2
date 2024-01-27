import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyItemComponent } from '../../components/company-item/company-item.component';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company-service.service';
import { CompanySortComponent } from '../../components/company-sort/company-sort.component';
import { CompanyFilterComponent } from '../../components/company-filter/company-filter.component';

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

  onFilterChanged(filters: { name: string, type: string, industry: string }) {
    this._compService.filterCompanies(filters);
  }

  onSortChanged(sortType: string) {
    this._compService.sortCompanies(sortType);
  }

  public companyList$ = this._compService.filteredCompaniesSubj;

  constructor(
    private _compService: CompanyService
  ) { }

}
