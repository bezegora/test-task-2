import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyModel } from '../models/company.model';
import { BehaviorSubject, Subject, first, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _API = 'https://random-data-api.com/api/company/random_company';
  public companyListSubj = new BehaviorSubject<CompanyModel[] | null>([]);
  public filteredCompaniesSubj = new BehaviorSubject<CompanyModel[] | null>(null);
  public filteredCompanyList$ = this.filteredCompaniesSubj.asObservable();
  public companyList$ = this.companyListSubj.asObservable();

  public sortCompanies(sortOrder: string) {
    let comps = this.filteredCompaniesSubj.value;
    switch (sortOrder) {
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
    this.companyListSubj.next(comps);
  }

  public filterCompanies(filters: { name: string, type: string, industry: string }) {
    let comps = this.companyListSubj.value;
    if (comps === null) {
      return;
    }
    let test = comps.filter((value: CompanyModel) => {
      return (value.type === filters.type || filters.type === 'All')
        && (value.industry === filters.industry || filters.industry === 'All')
        && ((value.suffix + " \"" + value.business_name + "\" ").toLowerCase().includes(filters.name.toLowerCase()) || filters.name === '');
    });

    this.filteredCompaniesSubj.next(test);
  }

  public getCompanyById(id: number): CompanyModel | null {
    let comps = this.companyListSubj.value;
    if (comps) {
      return comps.find((a: CompanyModel) => a.id == id) ?? null;
    }
    return null;
  }

  constructor(
    private _httpClient: HttpClient,
  ) {
    this.filteredCompanyList$.pipe(
      first())
      .subscribe(
        comps => {
          if (comps === null) {
            this.get50Companies();
          }
        }
      );
  }

  public get50Companies() {
    this._httpClient.get<CompanyModel[]>(this._API + '?size=50').subscribe(
      (comps: CompanyModel[]) => {
        this.companyListSubj.next(comps);
        this.filteredCompaniesSubj.next(comps);
      }
    );
  }
}
