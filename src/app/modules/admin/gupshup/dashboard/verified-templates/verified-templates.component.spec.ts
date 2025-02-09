import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedTemplatesComponent } from './verified-templates.component';

describe('VerifiedTemplatesComponent', () => {
  let component: VerifiedTemplatesComponent;
  let fixture: ComponentFixture<VerifiedTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifiedTemplatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifiedTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
