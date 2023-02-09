import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTeamComponent } from './detailsTeam.component';

describe('DetailsComponent', () => {
  let component: DetailsTeamComponent;
  let fixture: ComponentFixture<DetailsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
