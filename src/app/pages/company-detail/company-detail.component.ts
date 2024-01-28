import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CompanyModel } from '../../models/company.model';
import { CompanyService } from '../../services/company-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})
export class CompanyDetailComponent implements OnInit {

  private _compService = inject(CompanyService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  public company: CompanyModel | null = null;

  constructor() { }

  ngOnInit(): void {
    this._route.params.subscribe((p: Params) => {
      this.company = this._compService.getCompanyById(+p['id']);
      if (!this.company) this.onBack();
    });
  }

  public onBack(): void {
    this._router.navigate(['/list']);
  }

}
