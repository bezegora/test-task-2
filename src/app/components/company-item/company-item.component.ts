import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from '../../models/company.model';

@Component({
  selector: 'app-company-item',
  standalone: true,
  imports: [],
  templateUrl: './company-item.component.html',
  styleUrl: './company-item.component.scss'
})
export class CompanyItemComponent {

  @Input()
  public company!: CompanyModel;

  constructor(
    private _router: Router
  ) { }

  onCompanyClick() {
    this._router.navigate(['detail', this.company.id]);
  }
}
