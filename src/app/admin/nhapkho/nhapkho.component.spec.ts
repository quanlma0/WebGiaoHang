import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhoComponent } from './nhapkho.component';

describe('NhapkhoComponent', () => {
  let component: NhapkhoComponent;
  let fixture: ComponentFixture<NhapkhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhapkhoComponent]
    });
    fixture = TestBed.createComponent(NhapkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
