<template>
  <h3>Credit Card Information</h3>

  <div class="border rounded p-2">
    <div class="form-group">
      <label for="cardName">Name on Card</label>
      <input
        type="text"
        class="form-control"
        id="cardName"
        v-model="card.name.$model"
      />
      <ValidationMessage :model="card.name" />
    </div>
    <div class="form-group">
      <label for="cardNumber">Card Number</label>
      <input
        type="text"
        class="form-control"
        id="cardNumber"
        v-model="card.number.$model"
      />
        <ValidationMessage :model="card.number" />
    </div>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="expMonth">Exp. Month</label>
        <select id="expMonth" class="form-control" v-model="card.expMonth.$model">
          <option v-for="m in months" :key="m.number" :value="m.number">
            {{ m.name }}
          </option>
        </select>
        <ValidationMessage :model="card.expMonth" />
      </div>
      <div class="form-group col-md-4">
        <label for="expYear">Exp. Year</label>
        <select id="expYear" class="form-control" v-model="card.expYear.$model">
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
        <ValidationMessage :model="card.expYear" />
      </div>
    </div>
  </div>
</template>

<script>
import months from "@/lookup/months";
import ValidationMessage from '@/components/ValidationMessage.vue';

export default {
  components: { ValidationMessage },
  props: {
    card: {
      type: Object,
    },
  },
  setup() {
    const years = Array.from(
      { length: 10 },
      (_, i) => i + new Date().getFullYear()
    );

    return { months, years };
  },
};
</script>
