import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TodoItem from './../components/TodoItem';

export const todo = {
  id: '1',
  title: 'Test Todo',
  status: 0,
  description: 'Test Description',
  assigned_users: {
      1: {
          name: 'David',
        },
      2: {
            name: 'Petros',
          },
    },
};

export const methods = {
  onArchiveTodo: action('onArchiveTodo'),
  onDeleteTodo: action('onDeleteTodo'),
  onAssignTodoUser: action('onAssignTodoUser'),
  onEditTodo: action('onEditTodo'),
};

storiesOf('Todo Item', module)
  .add('default', () => {
    return {
      components: { TodoItem },
      template: `<todo-item :todo="todo"
      @onEditTodo="onEditTodo"
      @onAssignTodoUser="onAssignTodoUser"
      @onDeleteTodo="onDeleteTodo"
      @onArchiveTodo="onArchiveTodo" ></todo-item>`,
      data: () => ({ todo }),
      methods,
    };
  })
  .add('archived', () => {
    return {
        components: { TodoItem },
        template: `<todo-item :todo="todo"
        @onEditTodo="onEditTodo"
        @onAssignTodoUser="onAssignTodoUser"
        @onDeleteTodo="onDeleteTodo"
        @onArchiveTodo="onArchiveTodo" ></todo-item>`,
        data: () => ({ todo: { ...todo, status: 1 } }),
        methods,
      };
  });
