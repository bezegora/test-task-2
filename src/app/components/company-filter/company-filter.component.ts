import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company-service.service';
import { FilterType } from '../../types/filter.type';

@Component({
  selector: 'app-company-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})
export class CompanyFilterComponent implements OnInit {

  private _compService = inject(CompanyService);
  @Output()
  public filterChanged: EventEmitter<any> = new EventEmitter<any>();

  public filterForm!: FormGroup;

  public types!: Set<string>;
  public industries!: Set<string>;
  private _fb = inject(FormBuilder);

  constructor() { }

  ngOnInit(): void {
    this._compService.companyList$.subscribe(
      comps => {
        this.types = new Set<string>(comps?.map(c => c.type));
        this.industries = new Set<string>(comps?.map(c => c.industry));
      }
    );
    this.filterForm = this._fb.group(this._compService.filterType);
    this.filterForm.valueChanges.subscribe(
      (values: FilterType) => {
        this.filterChanged.emit(values);
      }
    );
  }

}
