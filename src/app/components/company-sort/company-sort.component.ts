import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CompanyService } from '../../services/company-service.service';

@Component({
  selector: 'app-company-sort',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './company-sort.component.html',
  styleUrl: './company-sort.component.scss'
})
export class CompanySortComponent {
  @Output()
  sortChanged: EventEmitter<string> = new EventEmitter<string>();
  selectedSort: string = '';

  constructor(
    private _companySortService: CompanyService
  ) {}

  onSortChange() {
    this.sortChanged.emit(this.selectedSort);
  }

}
