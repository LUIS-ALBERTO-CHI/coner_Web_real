import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMatchDaysComponent } from './detailsMatchDays.component';

describe('DetailsMatchDaysComponent', () => {
  let component: DetailsMatchDaysComponent;
  let fixture: ComponentFixture<DetailsMatchDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMatchDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMatchDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
