import { required } from "@vuelidate/validators";
import { creditcard } from "@/validators";
import useVuelidate from "@vuelidate/core";

export default class CreditCardModel {
    name     = "";
    number   = "";
    expMonth = "";
    expYear  = "";
    
    get rules() {
        return {
            name: { required },
            number: { required, creditcard },
            expMonth: { required },
            expYear: { required },
        };
    }

    getValidator() {
        return useVuelidate( this.rules, this );
    }
}