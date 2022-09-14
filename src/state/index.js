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
    errorMessage: ref( "" ),
    copyToBilling: () => {
        b.fullName    = s.fullName;
        b.address1    = s.address1;
        b.state       = s.state;
        b.companyName = s.companyName;
        b.zipcode = s.zipcode;
        c.name = s.fullName;
    }
}