import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexMatchDayComponent } from './indexMatchDay.component';

describe('IndexComponent', () => {
  let component: IndexMatchDayComponent;
  let fixture: ComponentFixture<IndexMatchDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexMatchDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexMatchDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
