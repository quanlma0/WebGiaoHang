import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyphuongthucvanchuyenComponent } from './quanlyphuongthucvanchuyen.component';

describe('QuanlyphuongthucvanchuyenComponent', () => {
  let component: QuanlyphuongthucvanchuyenComponent;
  let fixture: ComponentFixture<QuanlyphuongthucvanchuyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlyphuongthucvanchuyenComponent]
    });
    fixture = TestBed.createComponent(QuanlyphuongthucvanchuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
