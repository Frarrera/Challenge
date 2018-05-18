<template>
    <section>
        <h3>Usuarios</h3>
        <div>
            <table class="table" ="loading">
                <tbody>
                <tr v-for="user in users">
                    <td>{{ user.principal_name }}</td>
                    <td>{{ user.rfc }}</td>
                    <td>{{ user.phone }}</td>
                    <td>
                        <div class="btn-group">
                            <a class="btn btn-sm btn-default" :href="'/users/edit/'+user.id">edit</a>
                            <button class="btn btn-sm btn-default" @click="deleteUser(user.id)">delete</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <a class="btn btn-sm btn-primary" href="/users/create">Agregar nuevo</a>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ShowItems",
        created(){
            this.fetchUsers();
        },
        data(){
            return {
                loading : false,
                users : []
            }
        },
        methods : {
            fetchUsers(){
                const uri = 'http://localhost:4000/api/v1/users';
                const self = this;
                self.loading = true;
                this.axios.get(uri).then((response)=>{
                    self.users = response.data;
                    self.loading = false;
                }).catch((error)=>{
                    console.log(error);
                    self.loading = false;
                })
            },
            deleteUser(id){
                const self = this;
                self.loading = true;
                let destroy = confirm('¿Eliminar usuario?');
                if(destroy){
                    self.axios.delete('http://localhost:4000/api/v1/users/'+id).then((response)=>{
                        this.fetchUsers();
                    })
                }
            }
        }
    }
</script>

<style scoped>
    table td {
        line-height: 20px;
    }
</style>