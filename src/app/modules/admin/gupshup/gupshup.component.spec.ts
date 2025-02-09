import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GupshupComponent } from './gupshup.component';

describe('GupshupComponent', () => {
  let component: GupshupComponent;
  let fixture: ComponentFixture<GupshupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GupshupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GupshupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
