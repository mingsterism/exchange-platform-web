<template>
    <div className="absolute shadow-lg rounded-lg bg-white w-60 -ml-48 mt-3">
        <div class>
            <!-- <div v-for="(item, i) in menu_items" :key="i">
                <router-link :to="{name: item.component.name}">
                    <p>{{item.title}}</p>
                </router-link>
            </div> -->
            <Button label="Logout" v-on:click="logout" className="border-opacity-0 font-semibold pt-2 pb-2"/>
        </div>
    </div>
</template>

<script>
import Button from '/@/components/molecule/Button/Button.vue'
import firebase from 'firebase';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    name: 'UserMenu',
    components: {
        Button
    },
    methods: {
        logout: function() {

            Swal.fire({

                title: "You Have Logged Out!",
                icon: "success",
                confirmButtonColor: "#1ea7fd"

            }).then((result) => {
                if (result.isConfirmed) {
                    firebase
                        .auth()
                        .signOut()
                        .then(() => this.$router.push('/login'))
                        .catch(err => alert(err.message))
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
