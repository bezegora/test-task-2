import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company-service.service';

@Component({
  selector: 'app-company-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})
export class CompanyFilterComponent implements OnInit {

  @Output()
  filterChanged: EventEmitter<any> = new EventEmitter<any>();

  filterForm!: FormGroup;

  types!: Set<string>;
  industries!: Set<string>;

  constructor(
    private _fb: FormBuilder,
    private _compService: CompanyService
  ) { }

  ngOnInit(): void {
    this._compService.companyList$.subscribe(
      comps => {
        this.types = new Set<string>(comps?.map(c => c.type));
        this.industries = new Set<string>(comps?.map(c => c.industry));
      });
    this.filterForm = this._fb.group({
      name: [''],
      type: ['All'],
      industry: ['All'],
    });
    this.filterForm.valueChanges.subscribe(
      (values: { name: string, type: string, industry: string }) => {
        this.filterChanged.emit(values);
      }
    );
  }

}
