import { Component, OnInit } from '@angular/core';
import { CompanyItemComponent } from '../../components/company-item/company-item.component';
import { CommonModule } from '@angular/common';
import { CompanyModel } from '../../models/company.model';
import { CompanyService } from '../../services/company-service.service';
import { Observable, fromEvent, map, tap, throttleTime } from 'rxjs';
import { CompanySortComponent } from '../../components/company-sort/company-sort.component';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    CompanyItemComponent,
    CommonModule,
    CompanySortComponent
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  providers: []
})
export class CompanyListComponent implements OnInit {

  onSortChanged($sortType: string) {

  }

  public companies$!: Observable<CompanyModel[]>;
  public sortedCompanies$!: Observable<CompanyModel[]>;

  constructor(
    private _compService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companies$ = this._compService.getObservableCompanies();
    this._compService.sort$.subscribe((sortOrder: string) => {
      this.sortCompanies(sortOrder);
    })
  }

  sortCompanies(sortOrder: string) {
    this.companies$ = this.companies$.pipe(
      tap(result => {
        result.sort((a, b) => a.business_name.localeCompare(b.business_name))
      })
    )
  }

}
