<template>
    <div className="absolute shadow-lg rounded-lg bg-white w-60 -ml-48 mt-3">
        <div className="pt-1">
            <div v-for="(item, i) in menu_items" :key="i" className="font-semibold pt-2 pb-2">
                <router-link :to="item.component_name">
                    <p>{{item.title}}</p>
                </router-link>
            </div>
            <Button label="Logout" v-on:click="logout" className="border-opacity-0 font-semibold pb-2"/>
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
    data() {
        return {
            menu_items: [
                {
                    title: "Home",
                    component_name: "/"
                },
                {
                    title: "Profile",
                    component_name: "/profile"
                },
                {
                    title: "Top Up",
                    component_name: "/topup"
                }
            ]
        }
    },
    methods: {
        logout: function() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        Swal.fire({

                            title: "You Have Logged Out!",
                            icon: "success",
                            confirmButtonColor: "#1ea7fd"

                        })

                        this.$router.push('/login')


                        })
                    .catch(err => {
                        Swal.fire({

                            title: "Uh Oh!",
                            text: err.message,
                            icon: "error",
                            confirmButtonColor: "#1ea7fd"

                        })
                    })
        }
    }
}
</script>

<style scoped>

</style>
