<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                  <span>Stripe</span>
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
                          <label for="publishable_key">Publishable key</label>
                          <input
                            id="publishable_key"
                            class="form-control"
                            v-model="stripe.publishable_key"
                            type="text"
                          />
                        </p>

                        <p>
                          <label for="secret_key">Secret key</label>
                          <input
                            id="secret_key"
                            class="form-control"
                            v-model="stripe.secret_key"
                            type="text"
                          />
                        </p>



                        <p>
                          <input
                            type="submit"
                            class="btn btn-primary float-right"
                            value="Save"
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
    export default {
      name : 'StripeConfig',
      data : function () {
        return {
          errors : null,
          stripe: {
            publishable_key: null,
            secret_key: null,
          }
        }
      },
      methods: {
        submitForm: function (e) {
          this.errors = [];
          e.preventDefault();
          if (!this.stripe.secret_key) {
            this.errors.push("Secret key required.");
          }
          if (!this.stripe.publishable_key) {
            this.errors.push("Publishable key required.");
          }

          if (!this.errors.length) {
            this.$store.dispatch('Settings/saveStripe', this.stripe);
            this.stripe = {};
          }
        }
      },
      mounted: function(){
        console.log('Add Todo mounted');
      }
    }
</script>
