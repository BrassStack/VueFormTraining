<template>
  <div>
    <h1>Payment</h1>

    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <AddressView :address="payment.shipping" addressType="Shipping">
            <template #submitter>
              <div class="form-group">
                <input type="submit" value="Next" class="btn btn-success" :disabled="validator.$invalid" />
              </div>
            </template>
          </AddressView>

          <div>
            <pre>
              {{ payment }}
            </pre>
          </div>
        </div>
        <div class="col-md-6">
          <AddressView
            :address="payment.billing"
            :isDisabled="payment.billing.sameAsShipping"
            addressType="Billing"
          >
            <div class="form-check">
              <input
                type="checkbox"
                id="sameAsShipping"
                class="form-check-input"
                v-model="payment.billing.sameAsShipping"
              />
              <label for="sameAsShipping" class="form-check-label">
                Same As Shipping?
              </label>
            </div>
          </AddressView>

          <CreditCardView :card="payment.creditcard" @ccValidated="(valid) => validations.cc = valid" />
        </div>
      </div>
    </form>
    <div>
      <pre>{{ validator}}</pre>
    </div>

  </div>
</template>

<script>
import { reactive, watch } from "vue";
import AddressView from "@/views/AddressView.vue";
import CreditCardView from "@/views/CreditCardView.vue";
import state from "@/state";
import useVuelidate from "@vuelidate/core";

export default {
  components: { AddressView, CreditCardView },
  setup() {
    const payment = reactive(state);

    async function onSave() {
      if ( await validator.value.$validate() ) {
        state.errorMessage.value = "We can't save yet!";
        setTimeout(() => {
          state.errorMessage.value = "";
        }, 8000);
      }
    }

    const validator = useVuelidate( {}, payment );

    watch(
      () => payment.billing.sameAsShipping,
      () => {
        if (payment.billing.sameAsShipping) {
          payment.copyToBilling();
        }
      }
    );

    return { payment, onSave, validator };
  },
};
</script>
