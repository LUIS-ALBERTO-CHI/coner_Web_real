import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditMatchComponent } from './modalEditMatch.component';

describe('ModalEditMatchComponent', () => {
  let component: ModalEditMatchComponent;
  let fixture: ComponentFixture<ModalEditMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
