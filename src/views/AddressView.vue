<template>
  <div class="border rounded p-2">
    <slot />
    <div class="form-group">
      <label for="address1">Address</label>
      <input
        type="text"
        id="address1"
        class="form-control"
        placeholder="Address 1"
        v-model="address.address1"
        :disabled="isDisabled"
      />
    </div>
    <div class="form-row">
      <div class="form-group col-md">
        <label for="state">State</label>
        <select
          id="state"
          v-model="address.state"
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
      </div>
    </div>
    <slot name="submitter" />
  </div>
</template>

<script>
import { computed } from "vue";
import states from "@/lookup/states";
import formatters from "@/formatters";

export default {
  props: {
    address: {
      type: Object,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  setup(props) {
    const zip = computed({
      get: () => props.address.zipcode,
      set: (val) => {
        if (val && typeof val === "string") {
          if (val.length <= 5 || val.indexOf("-") > -1) {
            props.address.zipcode = val;
          } else {
            props.address.zipcode = `${val.substring(0, 5)}-${val.substring(5, 4)}`;
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