import { ref, reactive } from "vue";
import AddressModel from "../models/AddressModel";
import BillingAddressModel from "../models/BillingAddressModel";
import CreditCardModel from "../models/CreditCardModel";

const b = reactive( new BillingAddressModel() );
const s = reactive( new AddressModel() );

export default {
    billing: b,
    shipping: s,
    creditcard: reactive( new CreditCardModel() ),
    errorMessage: ref( "" ),
    copyToBilling: () => {
        b.fullName    = s.fullName;
        b.address1    = s.address1;
        b.state       = s.state;
        b.companyName = s.companyName;
        b.zipcode     = s.zipcode;
    }
}