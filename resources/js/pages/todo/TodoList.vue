<template>
<div >
    <div class="row justify-content-center">
      <div class="container mb-3">
        <router-link class="btn btn-primary float-right" to="/todos/add">Add</router-link>
      </div>

        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Assigned to</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="todo in todos" >
                <td>{{ todo.id }}</td>
                <td>{{ todo.title }}</td>
                <td>
                  <a href="#" v-on:click.prevent="" v-for="user in todo.assigned_users">
                    <i class="fa fa-user"></i>
                    {{ user.name }}
                  </a>

                </td>
                <td >
                    <font-awesome-icon :icon="['fas', todo.status ? 'check' : 'times']" flip="horizontal" /></a>
                  <i class="fa fa-ban" style="color:red"></i>
                </td>
                <td>{{ todo.description | truncate }}</td>
                <td>
                  <a href="/" v-on:click.prevent="changeTodoStatus(todo.id)"
                  :title="[todo.status ? 'Make complete' : 'Make uncompleted']"
                  :style="todo.status ? 'color:green' : 'color:#CC1100'">
                    <font-awesome-icon :icon="['fas', todo.status ? 'times' : 'check']" flip="horizontal" /></a>
                  <router-link title="Edit" class="fa fa-edit" style="color:red" :to="'/todos/edit/' + todo.id">
                      <font-awesome-icon :icon="['fas', 'edit']" flip="horizontal" /></router-link>
                  <a href="/" v-on:click.prevent="deleteTodo(todo.id)" title="Delete" class="fa fa-close"  style="color:#000">
                      <font-awesome-icon :icon="['fas', 'trash']" flip="horizontal" />
                  </a>
                  <a href="/" v-on:click.prevent="openUsersModal(todo.id)" title="Assign todo user" class="fa fa-user-plus"  >
                      <font-awesome-icon :icon="['fas', 'user-plus']" flip="horizontal" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <assigned-users-modal v-bind:todo="this.currentTodo"></assigned-users-modal>
</div>
</template>

<script>
import TodoItem from './../../components/TodoItem.vue';
import assignedUsersModal from './../../hoc/assigned-users-modal.vue';
import { mapGetters, mapActions } from 'vuex'
    export default {
      name : 'todos',
      data: function() {
        return {
          currentTodo: {}
        }
      },
      components: {
        'assigned-users-modal' : assignedUsersModal,
        'todo-item' : TodoItem,
      },
      computed: {
        ...mapGetters({
          'todos': 'Todo/getTodos',
        }),
      },
      methods: {
        changeTodoStatus: function (todoID) {
          const todo = this.todos[this.todos.findIndex(item => item.id == todoID)];
          this.$store.dispatch('Todo/changeTodoStatus', {...todo});
        },
        ...mapActions({
          'deleteTodo': 'Todo/deleteTodo'
        }),

        openUsersModal: function(todoID){
          this.currentTodo = this.todos.filter(item => item.id === todoID)[0];
          this.$store.dispatch('Todo/showModal', todoID);
        },


      },
      filters: {
        truncate: (string, maxLength = 50) => {
          if (!string) return null;
          const showDots = string.length > maxLength;
          return `${string.substring(0, maxLength)}${showDots ? '...' : ''}`;
        }
      },
      mounted() {
        this.$store.dispatch('Todo/fetchTodos');
      }
    }
</script>
