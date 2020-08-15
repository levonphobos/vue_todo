<template>
<div class="container">
    <div class="row justify-content-center">
      <div class="container mb-3">
        <router-link class="btn btn-primary float-right" to="/users/add">Add</router-link>
      </div>

        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Picture</th>
                <th>Register Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" >
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td >
                  <div style="width:80px; height:80px">
                      <img :src="user.avatar ? user.avatar : 'uploads/avatars/default.jpg'" class="img-responsive">
                  </div></td>
                <td>{{ user.created_at | moment("ddd, MMM D YYYY") }}</td>
                <td>
                  <router-link title="Edit" class="fa fa-edit" style="color:red" :to="'/users/edit/' + user.id"></router-link>
                  <a href="/" v-on:click.prevent="deleteUser(user.id)" title="Delete" class="fa fa-close"  style="color:#000"></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
    export default {
      name : 'users',
      data: function() {
        return {

        }
      },
      computed: {
        ...mapGetters({
          'users': 'User/getUsers',
        }),
      },
      methods: {
        deleteUser(id){
          this.$store.dispatch('User/deleteUser', id);
        }
      },
      mounted() {
        this.$store.dispatch('User/fetchUsers');
      },
    }
</script>
