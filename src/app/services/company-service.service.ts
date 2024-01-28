import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CompanyModel } from '../models/company.model';
import { BehaviorSubject, first } from 'rxjs';
import { FilterType } from '../types/filter.type';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _API = 'https://random-data-api.com/api/company/random_company';
  private _httpClient = inject(HttpClient);
  private _sortType: string = '';
  private _filterType: FilterType = {
    name: '',
    type: 'All',
    industry: 'All'
  }
  private _filteredCompaniesSubj = new BehaviorSubject<CompanyModel[] | null>([]);
  public filteredCompanyList$ = this._filteredCompaniesSubj.asObservable();

  private _companyListSubj = new BehaviorSubject<CompanyModel[] | null>([]);
  public companyList$ = this._companyListSubj.asObservable();

  public get sortType(): string {
    return this._sortType;
  }

  public get filterType(): FilterType {
    return this._filterType;
  }

  constructor() {
    this.filteredCompanyList$.pipe(
      first())
      .subscribe(
        comps => {
          if (comps === null) {
            this.getCompanies(50);
          }
        }
      );
  }

  public sortCompanies(sortOrder: string): void {
    let comps = this._filteredCompaniesSubj.value;
    this._sortType = sortOrder;
    switch (this._sortType) {
      case 'name':
        comps?.sort((a: CompanyModel, b: CompanyModel) => (a.suffix + a.business_name).localeCompare(b.suffix + b.business_name));
        break;
      case 'type':
        comps?.sort((a: CompanyModel, b: CompanyModel) => (a.type).localeCompare(b.type));
        break;
      case 'industry':
        comps?.sort((a: CompanyModel, b: CompanyModel) => (a.industry).localeCompare(b.industry));
        break;
    }
    this._filteredCompaniesSubj.next(comps);
  }

  public filterCompanies(filters: FilterType): void {
    let comps = this._companyListSubj.value;
    this._filterType = filters;
    if (comps === null) {
      return;
    }
    let test = comps.filter((value: CompanyModel) => {
      return (value.type === filters.type || filters.type === 'All')
        && (value.industry === filters.industry || filters.industry === 'All')
        && ((value.suffix + " \"" + value.business_name + "\" ").toLowerCase().includes(filters.name.toLowerCase()) || filters.name === '');
    });
    this._filteredCompaniesSubj.next(test);
    this.sortCompanies(this._sortType);
  }

  public getCompanyById(id: number): CompanyModel | null {
    let comps = this._companyListSubj.value;
    if (comps) {
      return comps.find((a: CompanyModel) => a.id == id) ?? null;
    }
    return null;
  }

  public getCompanies(count: number): void {
    this._httpClient.get<CompanyModel[]>(this._API + `?size=${count}`).subscribe(
      (comps: CompanyModel[]) => {
        this._companyListSubj.next(comps);
        this._filteredCompaniesSubj.next(comps);
      }
    );
  }
}
