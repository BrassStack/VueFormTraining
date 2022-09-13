<template>
  <div>
    <h1>Payment</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <h2>Shipping Information</h2>
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
          <div class="form-group">
            <label for="address1">Address</label>
            <input
              type="text"
              id="address1"
              class="form-control"
              placeholder="Address 1"
              v-model="payment.shipping.address1"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md">
              <label for="state">State</label>
              <select
                id="state"
                v-model="payment.shipping.state"
                class="form-control"
              >
                <option
                  v-for="s in states"
                  :key="s.abbreviation"
                  :value="s.abbreviation"
                >
                  {{ stateFormat(s) }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="zip">Zip</label>
              <input
                type="text"
                id="zip"
                class="form-control"
                placeholder="Zipcode"
                v-model="zip"
              />
            </div>
          </div>
          <div class="form-group">
            <input type="submit" value="Next" class="btn btn-success" />
          </div>
          <div>
            <pre>{{ payment }}</pre>
          </div>

        </div>
        <div class="col-md-6">
          <h2>Billing Information</h2>
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
          <div class="form-group">
            <label for="address1">Address</label>
            <input
              type="text"
              id="address1"
              class="form-control"
              placeholder="Address 1"
              v-model="payment.billing.address1"
              :disabled="payment.billing.sameAsShipping"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md">
              <label for="state">State</label>
              <select
                id="state"
                v-model="payment.billing.state"
                class="form-control"
                :disabled="payment.billing.sameAsShipping"
              >
                <option
                  v-for="s in states"
                  :key="s.abbreviation"
                  :value="s.abbreviation"
                >
                  {{ stateFormat(s) }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="zip">Zip</label>
              <input
                type="text"
                id="zip"
                class="form-control"
                placeholder="Zipcode"
                v-model="payment.billing.zipcode"
                :disabled="payment.billing.sameAsShipping"
              />
            </div>
          </div>
          <h3>Credit Card Information</h3>
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
    </form>
    <br />
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import states from "@/lookup/states";
import months from "@/lookup/months";
import formatters from "@/formatters";

export default {
  setup() {
    const payment = ref({
      shipping: {
        fullName: "Konrad",
        address1: "4201 S Washington St",
        state: "IN",
        zipcode: "",
      },
      billing: {
        sameAsShipping: false,
      },
      creditcard: {

      }
    });

    const error = ref("");

    function onSave() {
      error.value = "We can't save yet!";
      setTimeout(() => {
        error.value = "";
      }, 8000);
    }

    watch(
      () => payment.value.billing.sameAsShipping,
      () => {
        if (payment.value.billing.sameAsShipping) {
          payment.value.billing.fullName    = payment.value.shipping.fullName;
          payment.value.billing.address1    = payment.value.shipping.address1;
          payment.value.billing.state       = payment.value.shipping.state;
          payment.value.billing.companyName = payment.value.shipping.companyName;
          payment.value.billing.zipcode     = payment.value.zipcode;
        }
      }
    );

    const zip = computed({
      get: () => payment.value.zipcode,
      set: (val) => {
        if (val && typeof val === "string") {
          if (val.length <= 5 || val.indexOf("-") > -1) {
            payment.value.zipcode = val;
          } else {
            payment.value.zipcode = `${val.substring(0, 5)}-${val.substring(5, 4)}`;
          }
        }
      },
    });

    const years = Array.from( {length: 10}, (_, i) => i + new Date().getFullYear() );

    return { payment, states, onSave, ...formatters, zip, error, months, years };
  },
};
</script>
