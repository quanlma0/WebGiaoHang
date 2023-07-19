import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlythanhtoanComponent } from './quanlythanhtoan.component';

describe('QuanlythanhtoanComponent', () => {
  let component: QuanlythanhtoanComponent;
  let fixture: ComponentFixture<QuanlythanhtoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlythanhtoanComponent]
    });
    fixture = TestBed.createComponent(QuanlythanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
