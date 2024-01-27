import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})
export class CompanyFilterComponent {

  @Output()
  filterChanged: EventEmitter<any> = new EventEmitter<any>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      type: [''],
      industry: [''],
    });
  }

  applyFilter() {
    this.filterChanged.emit(this.filterForm.value);
  }

}
