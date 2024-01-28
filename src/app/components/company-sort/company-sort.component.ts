import { Component, EventEmitter, Output, inject } from '@angular/core';
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

  private _compService = inject(CompanyService);
  @Output()
  public sortChanged: EventEmitter<string> = new EventEmitter<string>();
  public selectedSort: string = this._compService.sortType;

  constructor() { }

  public onSortChange(): void {
    this.sortChanged.emit(this.selectedSort);
  }

}
