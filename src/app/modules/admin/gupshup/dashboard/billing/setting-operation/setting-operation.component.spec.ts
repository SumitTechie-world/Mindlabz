import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingOperationComponent } from './setting-operation.component';

describe('SettingOperationComponent', () => {
  let component: SettingOperationComponent;
  let fixture: ComponentFixture<SettingOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingOperationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
