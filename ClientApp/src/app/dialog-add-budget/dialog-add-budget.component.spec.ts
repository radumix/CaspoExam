import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBudgetComponent } from './dialog-add-budget.component';

describe('DialogAddBudgetComponent', () => {
  let component: DialogAddBudgetComponent;
  let fixture: ComponentFixture<DialogAddBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
