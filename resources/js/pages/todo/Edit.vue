<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                  <span>Edit Todo</span>
                </div>
                <div class="card-body">
                  <div class="container">
                    <form
                      id="app"
                      @submit="submitForm"
                      action=""
                      method="post"
                      >
                      <div class="form-group">
                        <p v-if="errors  && errors.length">
                          <b>Please correct the following error(s):</b>
                          <ul>
                            <li v-for="error in errors">{{ error }}</li>
                          </ul>
                        </p>

                        <p>
                          <label for="title">Task</label>
                          <input
                            id="title"
                            class="form-control"
                            v-model="todo.title"
                            type="text"
                          />
                        </p>

                        <p>
                          <label for="description">Description</label>
                          <textarea
                            id="description"
                            class="form-control"
                            v-model="todo.description"></textarea>
                        </p>
                        
                        <p>
                          <input
                            type="submit"
                            class="btn btn-primary float-right"
                            value="Add"
                          >
                        </p>
                        </div>
                      </form>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
      name : 'EditTodo',
      data : function () {
        return {
          errors : null,

        }
      },
      computed: {
        ...mapGetters({
          'todo': 'Todo/getCurrentTodo',
        }),
      },
      methods: {
        submitForm: function (e) {
          this.errors = [];
          e.preventDefault();
          if (!this.todo.title) {
            this.errors.push("Title required.");
          }
          if (!this.todo.description) {
            this.errors.push("Description required.");
          }

          if (!this.errors.length) {
            this.$store.dispatch('Todo/updateTodo', this.todo);
          }
        }
      },

      mounted: function(){
        this.$store.dispatch('Todo/getTodo', this.$route.params.id);
      }
    }
</script>
