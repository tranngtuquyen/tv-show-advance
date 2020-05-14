import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiringShowsComponent } from './airing-shows.component';

describe('AiringShowsComponent', () => {
  let component: AiringShowsComponent;
  let fixture: ComponentFixture<AiringShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiringShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiringShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
