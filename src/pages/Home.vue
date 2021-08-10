<template>
<div>
  <div className="text-left p-10 pt-24 pl-14">
    <p className="text-5xl font-semibold">MarketPlace</p>
  </div>
  <div className="flex flex-col md:flex-row">
    <div className="pl-11">
      <FilterBox />
    </div>
    <div className="px-20 pb-10 flex flex-wrap gap-9 justify-evenly">
      <Card2 :post="post" v-for="post, index in store.apparel" :key="index" />
    </div>
  </div>
</div>
</template>

<script>
import { onBeforeMount } from 'vue'
import FilterBox from '/@/components/organism/FilterBox/FilterBox.vue'
import Card2 from '/@/components/organism/Card/Card2.vue'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { usersStore } from '../store/users.store';

export default {
  name: "Home",
  components: {
    FilterBox,
    Card2,
  },
  data() {
    return {
      // TODO: Create a function:
      // TODO: To access every available products from every user and
      // TODO: and randomly pick 20(?) to displace at Home page.
      // * for now, just display all user products
    //   productShowcase: [
    //   {
    //     name: "Product A",
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    //   },
    //   {
    //     name: "Product B",
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    //   },
    //   {
    //     name: "Product C",
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    //   },
    //   {
    //     name: "Product D",
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    //   },
    //   {
    //     name: "Product E",
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    //   },
    //   {
    //     name: "Product F",
    //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    //   },
    // ]
    }
  },
  methods: {
    handleClick() {
      this.$router.push("/profile")
    }
  },
  setup() {
    onBeforeMount(() => {
      const route = new URLSearchParams(window.location.search);

      if (route.get("success")) {
        Swal.fire({

                  title: "Payment Success",
                  text: "You may continue shopping :D",
                  icon: "success",
                  confirmButtonColor: "#1ea7fd"

              })
      }
    })

    const store = usersStore()
    const showAllProducts = store.displayAllProducts

    return { store, showAllProducts }

  }
}
</script>

<style scoped>

</style>
