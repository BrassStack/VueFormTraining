<template>
  <div class="border rounded p-2">
    <h2>{{ addressType }} Address</h2>

    <slot />

    <div class="form-group">
        <label for="">Name</label>
        <input
        type="text"
        id="name"
        class="form-control"
        placeholder="Your Name"
        v-model="address.fullName.$model"
        :disabled="isDisabled"
        />
        <ValidationMessage :model="address.fullName" />
    </div>
    <div class="form-group">
        <label for="company">Company Name</label>
        <input
        type="text"
        id="company"
        class="form-control"
        placeholder="Company Name"
        v-model="address.companyName.$model"
        :disabled="isDisabled"
        />
        <ValidationMessage :model="address.companyName" />
    </div>
    <div class="form-group">
      <label for="address1">Address</label>
      <input
        type="text"
        id="address1"
        class="form-control"
        placeholder="Address 1"
        v-model="address.address1.$model"
        :disabled="isDisabled"
      />
      <ValidationMessage :model="address.address1" />
    </div>
    <div class="form-row">
      <div class="form-group col-md">
        <label for="state">State</label>
        <select
          id="state"
          v-model="address.state.$model"
          class="form-control"
          :disabled="isDisabled"
        >
          <option
            v-for="s in states"
            :key="s.abbreviation"
            :value="s.abbreviation"
          >
            {{ stateFormat(s) }}
          </option>
        </select>
        <ValidationMessage :model="address.state" />
      </div>
      <div class="form-group col-md-4">
        <label for="zip">Zip</label>
        <input
          type="text"
          id="zip"
          class="form-control"
          placeholder="Zipcode"
          v-model="zip"
          :disabled="isDisabled"
        />
        <ValidationMessage :model="address.zipcode" />
      </div>
    </div>

    <slot name="submitter" />
    
  </div>
</template>

<script>
import { computed } from "vue";
import ValidationMessage from '@/components/ValidationMessage';
import states from "@/lookup/states";
import formatters from "@/formatters";

export default {
  components: { ValidationMessage },
  props: {
    addressType: {
        type: String
    },
    address: {
      type: Object,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  setup(props) {
    const zip = computed({
      get: () => props.address.zipcode.$model,
      set: (val) => {
        if (val && typeof val === "string") {
          if (val.length <= 5 || val.indexOf("-") > -1) {
            props.address.zipcode.$model = val;
          } else {
            props.address.zipcode.$model = `${val.substring(0, 5)}-${val.substring(5, 4)}`;
          }
        }
      },
    });

    return {
      zip,
      states,
      ...formatters,
    };
  },
};
</script>