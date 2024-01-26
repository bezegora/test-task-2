import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CompanyModel } from '../../models/company.model';
import { CompanyService } from '../../services/company-service.service';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})
export class CompanyDetailComponent implements OnInit {

  public company!: CompanyModel;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _compService: CompanyService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe( (p: Params) => {
      this.company = this._compService.getCompanyById(+p['id'])
    });
  }

  onBack() {
    this._router.navigate(['/list']);
  }

}
