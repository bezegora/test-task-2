import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyItemComponent } from '../../components/company-item/company-item.component';
import { CommonModule } from '@angular/common';
import { CompanyModel } from '../../models/company.model';
import { CompanyService } from '../../services/company-service.service';
import { Observable, Subscription, fromEvent, map, tap, throttleTime } from 'rxjs';
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
export class CompanyListComponent implements OnInit, OnDestroy {

  onSortChanged($sortType: string) {

  }

  public companies$!: Observable<CompanyModel[]>;
  public sortedCompanies$!: Observable<CompanyModel[]>;
  private sub!: Subscription;

  constructor(
    private _compService: CompanyService
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.companies$ = this._compService.getObservableCompanies();
    this.sub = this._compService.sort$.subscribe((sortOrder: string) => {
      this.companies$ = this._compService.sortCompanies(sortOrder);
    })
  }

}
