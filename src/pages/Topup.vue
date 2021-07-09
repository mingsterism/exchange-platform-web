<template>
  <div class="flex flex-col items-center h-screen justify-center">
    <h1 class="text-xl pb-3 font-black">Top Up</h1>
    <h1 class="text-xl font-black">Please Choose Specified Amount</h1>
      <div class="flex flex-row w-screen mt-8 gap-x-9 justify-center">
        <div>
          <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems1"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="(v) => (loading = v)"
          />
          <button @click="submit_10" class="topup-button">RM10</button>
        </div>
        <div>
          <stripe-checkout
            ref="checkoutRef2"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems2"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="(v) => (loading = v)"
          />
          <button @click="submit_20" class="topup-button">RM20</button>
        </div>
        <div>
          <stripe-checkout
            ref="checkoutRef3"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems3"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="(v) => (loading = v)"
          />
          <button @click="submit_30" class="topup-button">RM30</button>
        </div>
        <div>
          <stripe-checkout
            ref="checkoutRef4"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems4"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="(v) => (loading = v)"
          />
          <button @click="submit_50" class="topup-button">RM50</button>
      </div>
      </div>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
  name: "Topup",
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey = `${import.meta.env.VITE_APP_SPRITE_PUBLISHABLE_KEY}`;
    return {
      loading: false,
      lineItems1: [
        {
          price: "price_1J7GK6FSmpBnvXBeb8vfUn4x",
          quantity: 1,
        },
      ],
      lineItems2: [
        {
          price: "price_1J7GK6FSmpBnvXBeRJsS9wEe",
          quantity: 1,
        },
      ],
      lineItems3: [
        {
          price: "price_1J7GK6FSmpBnvXBeVlsejqEu",
          quantity: 1,
        },
      ],
      lineItems4: [
        {
          price: "price_1J7GK6FSmpBnvXBenR0Li4W7",
          quantity: 1,
        },
      ],
      successURL: `${import.meta.env.VITE_APP_BASE_URL}`,
      cancelURL: `${import.meta.env.VITE_APP_BASE_URL}/topup`,
    };
  },
  methods: {
    submit_10() {
        this.$refs.checkoutRef.redirectToCheckout();
    },
    submit_20() {
        this.$refs.checkoutRef2.redirectToCheckout();
    },
    submit_30() {
        this.$refs.checkoutRef3.redirectToCheckout();
    },
    submit_50() {
        this.$refs.checkoutRef4.redirectToCheckout();
    },
  },
};
</script>

<style lang="css">
.topup-button {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    color: white;
    background-color: #1ea7fd;
    font-size: 1.5rem;
    padding: 10px 16px;
}
</style>
