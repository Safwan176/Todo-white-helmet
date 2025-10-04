import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoScreen } from './todo-screen';

describe('TodoScreen', () => {
  let component: TodoScreen;
  let fixture: ComponentFixture<TodoScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
