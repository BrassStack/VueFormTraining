import useVuelidate from "@vuelidate/core";
import { ref, reactive } from "vue";
import AddressModel from "../models/AddressModel";
import BillingAddressModel from "../models/BillingAddressModel";
import CreditCardModel from "../models/CreditCardModel";

const b = reactive( new BillingAddressModel() );
const s = reactive( new AddressModel() );
const c = reactive( new CreditCardModel() );
export default {
    billing: b,
    shipping: s,
    creditcard: c,
    sameAsShipping: ref( false ),
    errorMessage: ref( "" ),

    getValidator() {
        const rules = {
            billing: this.billing.rules,
            shipping: this.shipping.rules,
            creditcard: this.creditcard.rules
        };

        return useVuelidate( rules, this );
    }
}