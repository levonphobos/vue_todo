<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                  <span>Settings</span>
                </div>
                <div class="card-body">
                  <div class="container">
                    <div class="row vertical-align" >
                      <div class="col-sm">
                        <img src="/images/strip.png" class="img-fluid" alt="Responsive image"/>
                      </div>
                      <div class="col-sm text-center ">
                        Inactive
                      </div>
                      <div class="col-sm text-center ">
                        <a class="btn btn-secondary" href="#/settings/config-stripe" >Config</a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
      name : 'Settings',
      data : function () {
        return {
          errors : null,
          todo: {
            title : null,
            description : null,
          }
        }
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
            this.$store.dispatch('Todo/addTodo', this.todo);
            this.todo = {};
          }
        }
      },
      mounted: function(){
        console.log('Add Todo mounted');
      }
    }
</script>
