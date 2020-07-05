import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleCardsComponent } from './handle-cards.component';

describe('HandleCardsComponent', () => {
  let component: HandleCardsComponent;
  let fixture: ComponentFixture<HandleCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandleCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
