import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyModel } from '../models/company.model';
import { Subject, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _API = 'https://random-data-api.com/api/company/random_company';
  private _mockCompanies!: CompanyModel[];
  private _sortSubject = new Subject<string>();
  public sort$ = this._sortSubject.asObservable();

  public setSort(sortOrder: string) {
    this._sortSubject.next(sortOrder);
  }

  public sortCompanies(sortOrder: string) {
    switch (sortOrder) {
      case 'name':
        this._mockCompanies.sort((a: CompanyModel, b: CompanyModel) => (a.suffix + a.business_name).localeCompare(b.suffix + b.business_name));
        break;
      case 'type':
        this._mockCompanies.sort((a: CompanyModel, b: CompanyModel) => (a.type).localeCompare(b.type));
        break;
      case 'industry':
        this._mockCompanies.sort((a: CompanyModel, b: CompanyModel) => (a.industry).localeCompare(b.industry));
        break;
    }
    return of(this._mockCompanies);
  }

  public getCompanyById(id: number): CompanyModel {
    const findedComp: CompanyModel = (this._mockCompanies || {}).find((c: CompanyModel) => c.id === id)!;
    if (findedComp === undefined || findedComp === null) {
      throw new TypeError();
    }
    return findedComp;
  }

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public getObservableCompanies() {

    this._httpClient.get<CompanyModel[]>(this._API + '?size=20').pipe(
      tap((v: CompanyModel[]) => this._mockCompanies = v)
    );

    return !this._mockCompanies
      ? this._httpClient.get<CompanyModel[]>(this._API + '?size=20').pipe(
        map(value => {
          this._mockCompanies = value;
          return value;
        }))
      : of((this._mockCompanies || {}));
  }

}
