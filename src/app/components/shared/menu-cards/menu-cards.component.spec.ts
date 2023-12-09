import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCardsComponent } from './menu-cards.component';

describe('MenuCardsComponent', () => {
  let component: MenuCardsComponent;
  let fixture: ComponentFixture<MenuCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCardsComponent]
    });
    fixture = TestBed.createComponent(MenuCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
