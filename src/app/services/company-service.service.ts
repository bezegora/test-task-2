import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyModel } from '../models/company.model';
import { Subject, map, of } from 'rxjs';

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

  public getCompanyById(id: number): CompanyModel {
    const findedComp: CompanyModel = (this._mockCompanies || {}).find((c: CompanyModel) => c.id === id)!;
    if (findedComp === undefined || findedComp === null) {
      throw new TypeError();
    }
    return findedComp;
  }

  constructor(
    private _hhtpClient: HttpClient,
  ) { }

  public getObservableCompanies() {
    return !this._mockCompanies
      ? this._hhtpClient.get<CompanyModel[]>(this._API + '?size=20').pipe(map(value => {
        this._mockCompanies = value;
        return value;
      }))
      : of((this._mockCompanies || {}));
  }

  public getOneRandomCompany() {
    return this._hhtpClient.get<CompanyModel>(this._API);
  }

  public getRandomCompanies() {
    return this._hhtpClient.get<CompanyModel[]>(this._API + '?size=20');
  }

  public getListOfCompanies(): CompanyModel[] {
    return this._mockCompanies || {};
  }

  public setCompanies(companies: CompanyModel[]) {
    this._mockCompanies = companies;
  }

  public addCompanies(value: CompanyModel[]) {
    this._mockCompanies = this._mockCompanies.concat(value);
  }

}
