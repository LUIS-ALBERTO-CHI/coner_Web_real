import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSpinnerComponent } from './modalSpinner.component';

describe('ModalSpinnerComponent', () => {
  let component: ModalSpinnerComponent;
  let fixture: ComponentFixture<ModalSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
