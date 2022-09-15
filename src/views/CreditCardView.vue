<template>
  <h3>Credit Card Information</h3>

  <div class="border rounded p-2">
    <div class="form-group">
      <label for="cardName">Name on Card</label>
      <input
        type="text"
        class="form-control"
        id="cardName"
        v-model="validator.name.$model"
      />
      <ValidationMessage :model="validator.name" />
    </div>
    <div class="form-group">
      <label for="cardNumber">Card Number</label>
      <input
        type="text"
        class="form-control"
        id="cardNumber"
        v-model="validator.number.$model"
      />
        <ValidationMessage :model="validator.number" />
    </div>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="expMonth">Exp. Month</label>
        <select id="expMonth" class="form-control" v-model="validator.expMonth.$model">
          <option v-for="m in months" :key="m.number" :value="m.number">
            {{ m.name }}
          </option>
        </select>
        <ValidationMessage :model="validator.expMonth" />
      </div>
      <div class="form-group col-md-4">
        <label for="expYear">Exp. Year</label>
        <select id="expYear" class="form-control" v-model="validator.expYear.$model">
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
        <ValidationMessage :model="validator.expYear" />
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import months from "@/lookup/months";
import ValidationMessage from '@/components/ValidationMessage.vue';
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { creditcard } from "@/validators";

export default {
  components: { ValidationMessage },
  emits: ["ccValidated"],
  props: {
    card: {
      type: Object,
    },
  },
  setup(props) {
    const years = Array.from(
      { length: 10 },
      (_, i) => i + new Date().getFullYear()
    );

    const rules = {
      name: { required },
      number: { required, creditcard },
      expMonth: { required },
      expYear: { required },
    };

    const validator = useVuelidate(rules, props.card);

    watch( 
      () => validator.$invalid,
      () => $emit( 'ccValidated', !validator.$invalid )
    );

    return { months, years, validator };
  },
};
</script>
