<template>
  <modal v-if="showModal" @saveModal="assignToUser" @close="closeModal()">
    <h5 class="modal-title" slot="header">Assign to user</h5>
      <div slot="body" class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" >
              <td>{{ user.id }}<input type="checkbox" :value="user.id" v-model="checkedUsers"/></td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </modal>
</template>
<script>
import modal from './../components/Modal.vue';
import { mapGetters } from 'vuex'
export default {
  name: "assigned-users-modal",
  props: {
    todo: Object
  },
  data: function(){
    return {
      checkedUsers: []
    }
  },
  components: {
    'modal' : modal,
  },
  computed: {
    ...mapGetters({
      'showModal': 'Todo/getShowModal',
      'users': 'User/getUsers',
    }),
  },
  watch: {
    todo: function(newTodo, oldTodo){
      const vm = this;
      this.checkedUsers = [];
      Object.keys(newTodo.assigned_users).forEach(function(key) {
        vm.checkedUsers.push(newTodo.assigned_users[key].id);
      });
    },
  },

  methods:{
    closeModal: function(todoID){
      this.$store.dispatch('Todo/closeModal');
      this.checkedUsers = [];
    },
    assignToUser: function(){
      const tmpUsers = this.users.filter(user => this.checkedUsers.includes(user.id));
      const data = {
        todoID: this.todo.id,
        users: tmpUsers
      };
      this.$store.dispatch('Todo/assignUsers', data);
      this.$store.dispatch('Todo/closeModal');
      
    },
  },
  mounted() {
    this.$store.dispatch('User/fetchUsers');
  }
}
</script>
