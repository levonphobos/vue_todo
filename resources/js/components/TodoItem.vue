<template>

    <tr class="container">
      <td>{{ this.todo.id }}</td>
      <td>{{ this.todo.title }}</td>
      <td>
        <a href="#" v-on:click.prevent="" v-for="user in this.todo.assigned_users">
          <i class="fa fa-user"></i>
          {{ user.name }}
        </a>

      </td>
      <td v-if="this.todo.status == 0">
        <i class="fa fa-ban" style="color:red"></i>
      </td>
      <td v-else="this.todo.status == 1">
        <i class="fa fa-check" style="color:green"></i>
      </td>
      <td>{{ todo.description | truncate }}</td>
      <td>
        <a href="/" @click="$emit('changeTodoStatus', this.todo.id)"
        :title="[this.todo.status ? 'Make complete' : 'Make uncompleted']"
        v-bind:class="todoStatusClass"
        class="fa fa-check"
        :style="this.todo.status ? 'color:green' : 'color:red'"></a>
        <a title="Edit" class="fa fa-edit" style="color:red" :href="'/todos/edit/' + this.todo.id"></a>
        <a href="/" @click="$emit('deleteTodo', this.todo.id)" title="Delete" class="fa fa-close"  style="color:#000"></a>
        <a href="/" @click="$emit('openUsersModal', this.todo.id)" title="Assign todo user" class="fa fa-user-plus"  ></a>
      </td>
    </tr>

</template>
<script>
export default{
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true,
          },
    },
    filters: {
      truncate: (string, maxLength = 50) => {
        if (!string) return null;
        const showDots = string.length > maxLength;
        return `${string.substring(0, maxLength)}${showDots ? '...' : ''}`;
      }
    },
    methods: {
        todoStatusClass: function () {
            return !this.todo.status ? 'fa-check' : 'fa-close';
        }
    },
}
</script>
