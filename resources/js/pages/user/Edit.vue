<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                  <span>Edit User</span>
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
                          <label for="name">Name</label>
                          <input
                            id="name"
                            class="form-control"
                            v-model="user.name"
                            type="text"
                          />
                        </p>

                        <p>
                          <label for="email">Email</label>
                          <input
                            id="email"
                            class="form-control"
                            v-model="user.email"
                            type="text"
                          />
                        </p>

                        <p>
                          <label for="password">Password</label>
                          <input
                            id="password"
                            class="form-control"
                            v-model="user.password"
                            type="password"
                          />
                        </p>
                        <div class="col-md-4 mb-4 pl-0">
                            <img :src="user.avatar" class="img-responsive">
                        </div>
                          <div class="custom-file mb-2">
                            <input type="file" ref="file" class="custom-file-input" id="customFile" v-on:change="uploadProfilePicture">
                            <label class="custom-file-label" for="customFile">Choose profile picture</label>
                          </div>



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
      name : 'EditUser',
      data : function () {
        return {
          errors : null,

        }
      },
      computed: {
        ...mapGetters({
          'user': 'User/getCurrentUser',
        }),

      },
      methods: {
        submitForm: function (e) {
          this.errors = [];
          e.preventDefault();
          if (!this.user.name) {
            this.errors.push("Name required.");
          }
          if (!this.user.email) {
            this.errors.push("Email required.");
          }else if (!this.validEmail(this.user.email)) {
            this.errors.push('Valid email required.');
          }

          if (!this.user.password) {
            this.errors.push("Password required.");
          }

          if (!this.errors.length) {
            this.$store.dispatch('User/updateUser', {...this.user});
          }
        },

        uploadProfilePicture: function(e){
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
              return;
          let reader = new FileReader();
          reader.onload = (e) => {
              this.$store.dispatch('User/changeCurrentUserAvatar', e.target.result);
          };
          reader.readAsDataURL(files[0]);

        },

        validEmail: function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        }
      },

      mounted: function(){
        this.$store.dispatch('User/getUser', this.$route.params.id);
      }
    }
</script>
