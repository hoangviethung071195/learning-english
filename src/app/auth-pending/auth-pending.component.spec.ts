import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPendingComponent } from './auth-pending.component';

describe('AuthPendingComponent', () => {
  let component: AuthPendingComponent;
  let fixture: ComponentFixture<AuthPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
