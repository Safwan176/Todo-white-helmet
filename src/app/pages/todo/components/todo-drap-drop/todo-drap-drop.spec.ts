import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDrapDrop } from './todo-drap-drop';

describe('TodoDrapDrop', () => {
  let component: TodoDrapDrop;
  let fixture: ComponentFixture<TodoDrapDrop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoDrapDrop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDrapDrop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
