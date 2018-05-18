<template>
  <div>
      <h1>Create An User</h1>
      <form v-on:submit.prevent="addOrUpdateItem">
          <div class="row">
              <div class="col-md-3">
                  <div class="form-group">
                      <label>RFC:</label>
                      <input name="rfc"
                             type="text"
                             :class="{ 'form-control show-upper-case' : true}"
                             v-model="item.rfc"
                             v-validate="formRules.rfc" />
                      <label class="alert alert-danger" style="width: 100%;" v-if="errors.has('rfc')">
                          {{ errors.first('rfc') }}
                      </label>
                  </div>
                  <div class="form-group">
                      <label>Principal Name:</label>
                      <input name="name"
                             type="text"
                             :class="{ 'form-control' : true}"
                             v-model="item.name"
                             v-validate="formRules.name" />
                      <label class="alert alert-danger" style="width: 100%;" v-if="errors.has('name')">
                          {{ errors.first('name') }}
                      </label>
                  </div>
                  <div class="form-group">
                      <label>Business Name:</label>
                      <input name="business"
                             type="text"
                             :class="{ 'form-control' : true}"
                             v-model="item.business"
                             v-validate="formRules.business" />
                      <label class="alert alert-danger" style="width: 100%;" v-if="errors.has('business')">
                          {{ errors.first('business') }}
                      </label>
                  </div>
                  <div class="form-group">
                      <label>Phone:</label>
                      <input name="phone"
                             type="text"
                             :class="{ 'form-control' : true}"
                             v-model="item.phone"
                             v-validate="formRules.phone" />
                      <label class="alert alert-danger" style="width: 100%;" v-if="errors.has('phone')">
                          {{ errors.first('phone') }}
                      </label>
                  </div>
                  <div class="form-group">
                      <label>Email:</label>
                      <input name="email"
                             type="text"
                             :class="{ 'form-control' : true}"
                             v-model="item.email"
                             v-validate="formRules.email" />
                      <label class="alert alert-danger" style="width: 100%;" v-if="errors.has('email')">
                          {{ errors.first('email') }}
                      </label>
                  </div>
                  <br>
                  <br>
                  <div class="form-group">
                      <a class="btn btn-default" href="javascript:void(0)" @click="leavePage">Cancel</a>
                      <button class="btn btn-primary">Add Item</button>
                  </div>
              </div>
          </div>
    </form>
  </div>
</template>
<script>
	export default {
		data() {
			return {
			    exists : false,
                current_id : null,
				item : {
					name : null,
					business : null,
                    rfc : null,
                    phone : null,
                    email : null
				},
                formRules : {
				    rfc : 'max:18',
				    name : 'required|max:50',
                    business : 'max:80',
                    phone : 'required|max:10|numeric',
                    email : 'required|email|max:80'
                }
			};
		},
        created(){
		    this.loadUser();
        },
		methods: {
		    loadUser(){
		        let user_id = this.$route.params.id;
		        const self = this;
		        if(user_id){
		            self.axios.get('http://localhost:4000/api/v1/users/'+user_id)
                        .then((response)=>{
                            let current_user = response.data;
                            self.item.name = current_user.principal_name;
                            self.item.rfc = current_user.rfc;
                            self.item.business = current_user.business_name;
                            self.item.phone = current_user.phone;
                            self.item.email = current_user.email;
                            self.exists = true;
                            self.current_id = user_id;
                        })
                        .catch((error)=>{});
                }
            },
		    addOrUpdateItem () {
		        const self = this;
		        let uri = 'http://localhost:4000/api/v1/users' + (self.exists ? "/"+self.current_id : "");
		        self.$validator.validateAll(self.item).then((resolve)=>{
		            if(resolve){
		                self
                            .axios.post(uri,self.item)
                            .then((response)=>{
                                this.$router.push('/');
                            })
                            .catch((error)=>{

                            });
                    }else{

                    }
                }).catch((error)=>{
                    throw error;
                });
            },
            leavePage(){
		        console.log(this.$route.name)
		        if(Object.values(this.item).every((value)=>{ return !value; }) || this.$route.name == 'editUser'){
		            this.$router.replace('/');
                }else{
		            let salir = confirm('Aun no ha guardado sus cambios, ¿Salir?');
		            if(salir)
                        this.$router.replace('/');
                }
            },
		}
	}
</script>

<style type="text/css">
    .show-upper-case {
        text-transform: uppercase;
    }
    .alert {
        padding: 0.5rem;
        margin-bottom: 5px;
    }
</style>