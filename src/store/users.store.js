import {defineStore} from 'pinia'

// useStore could be anything like useUser, useCart
export const usersStore = defineStore({
    // unique id of the store across your application
    id: Math.random(),
    state() {
        return {
            role: "",
            apparel: [],
            rounds: 0
        }
    },
    getters: {
        numberOfApparel(state) {
            return state.apparel.length
        }
    },
    actions: {
        addApparel(name) {
            console.log([...this.apparel, name])
            this.rounds += 1
            this.apparel = [...this.apparel, name]
        }
    },
})
