import { ICompany } from '../interfaces/company.interface';

export class CompanyModel {
  bs_company_statement: string
  business_name: string
  buzzword: string
  catch_phrase: string
  duns_number: string
  employee_identification_number: string
  full_address: string
  id: number
  industry: string
  latitude: number
  logo: string
  longitude: number
  phone_number: string
  suffix: string
  type: string
  uid: string
  russian: boolean

  constructor(comp: ICompany) {
    this.bs_company_statement = comp.bs_company_statement;
    this.business_name = comp.business_name;
    this.buzzword = comp.buzzword;
    this.catch_phrase = comp.catch_phrase;
    this.duns_number = comp.duns_number;
    this.employee_identification_number = comp.employee_identification_number;
    this.full_address = comp.full_address;
    this.id = comp.id;
    this.industry = comp.industry;
    this.latitude = comp.latitude;
    this.logo = comp.logo;
    this.longitude = comp.longitude;
    this.phone_number = comp.phone_number;
    this.suffix = comp.suffix;
    this.type = comp.type;
    this.uid = comp.uid;
    this.russian = comp.russian ? comp.russian : false;

  }
}
