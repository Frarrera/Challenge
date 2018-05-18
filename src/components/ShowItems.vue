<template>
    <section>
        <h3>Usuarios</h3>
        <div>
            <table class="table">
                <tbody>
                <tr v-for="user in users">
                    <td>{{ user.principal_name }}</td>
                    <td>{{ user.rfc }}</td>
                    <td>{{ user.phone }}</td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-default">edit</button>
                            <button class="btn btn-sm btn-default">delete</button>
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
            const uri = 'http://localhost:4000/api/v1/users';
            const self = this;
            this.axios.get(uri).then((response)=>{
                console.log(response)
                self.users = response.data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        data(){
            return {
                users : []
            }
        }
    }
</script>

<style scoped>
    table td {
        line-height: 20px;
    }
</style>