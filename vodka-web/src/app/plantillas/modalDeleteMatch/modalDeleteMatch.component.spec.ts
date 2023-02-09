import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteMatchComponent } from './modalDeleteMatch.component';

describe('ModalDeleteMatchComponent', () => {
  let component: ModalDeleteMatchComponent;
  let fixture: ComponentFixture<ModalDeleteMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
