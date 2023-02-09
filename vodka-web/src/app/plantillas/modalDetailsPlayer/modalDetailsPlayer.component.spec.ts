import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsPlayerComponent } from './modalDetailsPlayer.component';

describe('ModalDetailsPlayerComponent', () => {
  let component: ModalDetailsPlayerComponent;
  let fixture: ComponentFixture<ModalDetailsPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailsPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
