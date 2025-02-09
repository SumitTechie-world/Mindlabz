import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditPopupComponent } from './add-credit-popup.component';

describe('AddCreditPopupComponent', () => {
  let component: AddCreditPopupComponent;
  let fixture: ComponentFixture<AddCreditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCreditPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCreditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
