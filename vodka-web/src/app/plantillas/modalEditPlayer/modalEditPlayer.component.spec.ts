import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPlayerComponent } from './modal-edit-player.component';

describe('ModalEditPlayerComponent', () => {
  let component: ModalEditPlayerComponent;
  let fixture: ComponentFixture<ModalEditPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
