import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GupshupTemplatesComponent } from './gupshup-templates.component';

describe('GupshupTemplatesComponent', () => {
  let component: GupshupTemplatesComponent;
  let fixture: ComponentFixture<GupshupTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GupshupTemplatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GupshupTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
