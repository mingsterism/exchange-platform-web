<template>
    <div className="absolute shadow-lg rounded-lg bg-white w-60 -ml-48 mt-3">
        <div class>
            <!-- <div v-for="(item, i) in menu_items" :key="i">
                <router-link :to="{name: item.component.name}">
                    <p>{{item.title}}</p>
                </router-link>
            </div> -->
            <Button label="Logout" @click="logout" className="border-opacity-0 font-semibold pt-2 pb-2"/>
        </div>
    </div>
</template>

<script>
import Button from '/@/components/molecule/Button/Button.vue'
import firebase from 'firebase';

export default {
    name: 'UserMenu',
    components: {
        Button
    },
    methods: {
        logout: function() {

            firebase
                .auth()
                .signOut()
                .then(() => this.$router.push('/login'))
                .catch(err => alert(err.message))
        }
    }
}
</script>

<style scoped>

</style>
