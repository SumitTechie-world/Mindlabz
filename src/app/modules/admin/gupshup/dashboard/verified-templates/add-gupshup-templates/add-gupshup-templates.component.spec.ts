import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGupshupTemplatesComponent } from './add-gupshup-templates.component';

describe('AddGupshupTemplatesComponent', () => {
  let component: AddGupshupTemplatesComponent;
  let fixture: ComponentFixture<AddGupshupTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGupshupTemplatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGupshupTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
