<template>
  <div>
    <Error :message="errorMessage" />
    <PaymentView />
  </div>
</template>

<script>
import PaymentView from "@/views/PaymentView";
import Error from "@/components/Error";
import state from "@/state";

export default {
  components: {
    PaymentView,
    Error
  },
  setup() {
    return {
      errorMessage: state.errorMessage
    };
  }
};
</script>
