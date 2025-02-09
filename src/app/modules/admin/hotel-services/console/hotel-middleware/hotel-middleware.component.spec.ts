import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelMiddlewareComponent } from './hotel-middleware.component';

describe('HotelMiddlewareComponent', () => {
  let component: HotelMiddlewareComponent;
  let fixture: ComponentFixture<HotelMiddlewareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelMiddlewareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelMiddlewareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
