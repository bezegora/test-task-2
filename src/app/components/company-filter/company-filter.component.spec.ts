import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFilterComponent } from './company-filter.component';

describe('CompanyFilterComponent', () => {
  let component: CompanyFilterComponent;
  let fixture: ComponentFixture<CompanyFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
