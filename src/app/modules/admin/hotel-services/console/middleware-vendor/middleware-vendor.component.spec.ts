import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlewareVendorComponent } from './middleware-vendor.component';

describe('MiddlewareVendorComponent', () => {
  let component: MiddlewareVendorComponent;
  let fixture: ComponentFixture<MiddlewareVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiddlewareVendorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiddlewareVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
