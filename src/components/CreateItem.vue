<template>
  <div>
    <h1>Create An Item</h1>
    <form v-on:submit.prevent="addItem">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Item Name:</label>
            <input type="text" class="form-control" v-model="item.name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Item Price:</label>
              <input type="text" class="form-control col-md-6" v-model="item.price">
            </div>
          </div>
        </div><br/>
        <div class="form-group">
          <button class="btn btn-primary">Add Item</button>
          <a href="/items">Items</a>
        </div>
    </form>
  </div>
</template>
<script>
    //import server from '../server/www.js';
	export default {
		mounted(){
			console.log(this.item);
			//this.fetchItems();
		},
		data() {
			return {
				item : {
					name : null,
					price : null
				},
                items : []
			};
		},
		methods: {
		    addItem () {
		        console.log(this.item);
            },
            fetchItems() {
                let uri = 'http://localhost:4000/users';
                this.axios.get(uri).then((response) => {
                    this.items = response.data;
                });
            }
		}
	}
</script>