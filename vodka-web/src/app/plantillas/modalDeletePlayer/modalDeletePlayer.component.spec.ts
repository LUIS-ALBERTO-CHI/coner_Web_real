import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePlayerComponent } from './modalDeletePlayer.component';

describe('ModalDeletePlayerComponent', () => {
  let component: ModalDeletePlayerComponent;
  let fixture: ComponentFixture<ModalDeletePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeletePlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeletePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
