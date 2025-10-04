import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTable } from './todo-table';

describe('TodoTable', () => {
  let component: TodoTable;
  let fixture: ComponentFixture<TodoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
