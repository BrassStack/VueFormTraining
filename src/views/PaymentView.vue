<template>
  <div>
    <h1>Payment</h1>

    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <AddressView :address="payment.shipping" addressType="Shipping">
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
          <AddressView :address="payment.billing" :isDisabled="payment.billing.sameAsShipping" addressType="Billing">
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
          </AddressView>

          <CreditCardView :card="payment.creditcard" />

        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import AddressView from "@/views/AddressView.vue";
import CreditCardView from "@/views/CreditCardView.vue"
import state from "@/state";

export default {
  components: { AddressView, CreditCardView },
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

    return { payment, onSave };
  },
};
</script>
