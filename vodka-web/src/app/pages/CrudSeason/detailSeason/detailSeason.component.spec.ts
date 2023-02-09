import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSeasonComponent } from './detailSeason.component';

describe('DetailsComponent', () => {
  let component: DetailSeasonComponent;
  let fixture: ComponentFixture<DetailSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSeasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
