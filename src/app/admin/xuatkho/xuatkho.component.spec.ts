import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhoComponent } from './xuatkho.component';

describe('XuatkhoComponent', () => {
  let component: XuatkhoComponent;
  let fixture: ComponentFixture<XuatkhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XuatkhoComponent]
    });
    fixture = TestBed.createComponent(XuatkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
