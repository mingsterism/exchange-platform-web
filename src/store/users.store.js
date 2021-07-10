import {defineStore} from 'pinia'

// useStore could be anything like useUser, useCart
export const usersStore = defineStore({
    // unique id of the store across your application
    id: Math.random(),
    state() {
        return {
            role: "",
            apparel: []
        }
    },
    getters: {
        numberOfApparel(state) {
            return state.apparel.length
        }
    },
    actions: {
        addApparel(name) {
            console.log("ADD APPAREL")
            console.log([...this.apparel, name])
            // this.apparel = ['heello', 'sdfsdf']
            this.apparel.push(name)
            // this.apparel = [...this.apparel, name]
        }
    },
})
