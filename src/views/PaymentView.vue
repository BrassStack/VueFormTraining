<template>
  <div>
    <h1>Payment</h1>

    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <h2>Shipping Information</h2>

          <AddressView :address="payment.shipping">
            <div class="form-group">
                <label for="">Name</label>
                <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Your Name"
                v-model="payment.shipping.fullName"
                />
            </div>
            <div class="form-group">
                <label for="company">Company Name</label>
                <input
                type="text"
                id="company"
                class="form-control"
                placeholder="Company Name"
                v-model="payment.shipping.companyName"
                />
            </div>
            <template #submitter>
                <div class="form-group">
                    <input type="submit" value="Next" class="btn btn-success" />
                </div>
            </template>
          </AddressView>

          <div>
            <pre>{{ payment }}</pre>
          </div>

        </div>
        <div class="col-md-6">
          <h2>Billing Information</h2>
          
          <AddressView :address="payment.billing" :isDisabled="payment.billing.sameAsShipping">
            <div class="form-check">
                <input
                type="checkbox"
                id="sameAsShipping"
                class="form-check-input"
                v-model="payment.billing.sameAsShipping"
                />
                <label for="sameAsShipping" class="form-check-label"
                >Same As Shipping?</label
                >
            </div>
            <div class="form-group">
                <label for="">Name</label>
                <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Your Name"
                v-model="payment.billing.fullName"
                :disabled="payment.billing.sameAsShipping"
                />
            </div>
            <div class="form-group">
                <label for="company">Company Name</label>
                <input
                type="text"
                id="company"
                class="form-control"
                placeholder="Company Name"
                v-model="payment.billing.companyName"
                :disabled="payment.billing.sameAsShipping"
                />
            </div>
          </AddressView>

          <h3>Credit Card Information</h3>

          <div class="border rounded p-2">
            <div class="form-group">
                <label for="cardName">Name on Card</label>
                <input type="text" class="form-control" id="cardName" v-model="payment.creditcard.name" />
            </div>
            <div class="form-group">
                <label for="cardNumber">Card Number</label>
                <input type="text" class="form-control" id="cardNumber" v-model="payment.creditcard.number" />
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                <label for="expMonth">Exp. Month</label>
                <select id="expMonth" class="form-control" v-model="payment.creditcard.expMonth">
                    <option v-for="m in months" :key="m.number" :value="m.number">{{ m.name }}</option>
                </select>
                </div>
                <div class="form-group col-md-4">
                <label for="expYear">Exp. Year</label>
                <select id="expYear" class="form-control" v-model="payment.creditcard.expYear">
                    <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                </select>
                </div>
            </div>
          </div>

        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import months from "@/lookup/months";
import AddressView from "@/views/AddressView.vue";
import state from "@/state";

export default {
  components: { AddressView },
  setup() {
    const payment = reactive( state );

    function onSave() {
      state.errorMessage.value = "We can't save yet!";

      setTimeout(() => {
        state.errorMessage.value = "";
      }, 8000);
    }

    watch(
      () => payment.billing.sameAsShipping,
      () => {
        if (payment.billing.sameAsShipping) {
          payment.copyToBilling();
        }
      }
    );

    const years = Array.from( {length: 10}, (_, i) => i + new Date().getFullYear() );

    return { payment, onSave, months, years };
  },
};
</script>
