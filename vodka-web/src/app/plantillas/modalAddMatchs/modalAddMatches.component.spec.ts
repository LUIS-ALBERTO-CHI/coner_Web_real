import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddMatchesComponent } from './modalAddMatches.component';

describe('ModalAddMatchesComponent', () => {
  let component: ModalAddMatchesComponent;
  let fixture: ComponentFixture<ModalAddMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
