import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesBreakupComponent } from './messages-breakup.component';

describe('MessagesBreakupComponent', () => {
  let component: MessagesBreakupComponent;
  let fixture: ComponentFixture<MessagesBreakupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesBreakupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
