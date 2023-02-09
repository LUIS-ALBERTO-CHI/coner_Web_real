import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsMatchComponent } from './modaldetailsmatch.component';

describe('ModalDetailsMatchComponent', () => {
  let component: ModalDetailsMatchComponent;
  let fixture: ComponentFixture<ModalDetailsMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailsMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailsMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
