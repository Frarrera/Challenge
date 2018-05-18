<template>
    <section>
        <h3>Usuarios</h3>
        <div >
            <p v-for="user in users">
                {{user.principal_name}}
            </p>
            <a href="/users/create">Agregar nuevo</a>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ShowItems",
        created(){
            const uri = 'http://localhost:4000/users';
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

</style>