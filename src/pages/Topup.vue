<template>
  <div class="flex flex-col items-center h-screen justify-center">
    <h1 class="text-xl font-black">Top Up</h1>
    <div>
      <div class="mt-8">
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
          <button @click="submit_10">Pay now!</button>
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
          <button @click="submit_20">Pay now!</button>
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
          <button @click="submit_30">Pay now!</button>
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
          <button @click="submit_50">Pay now!</button>
        </div>
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

<style></style>
