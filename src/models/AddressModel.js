import { required, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default class AddressModel {
    fullName    = "";
    companyName = "";
    address1    = "";
    state       = "";
    zipcode     = "";
    
    setFrom( address ) {
        this.fullName    = address.fullName;
        this.companyName = address.companyName;
        this.address1    = address.address1;
        this.state       = address.state;
        this.zipcode     = address.zipcode;
    }

    get rules() {
        return {
            fullName: { required, minLength: minLength( 3 ) },
            companyName: {},
            address1: { required, minLength: minLength( 5 ) },
            state: { required },
            zipcode: { required, minLength: minLength( 4 ) }
        };
    }

    getValidator() {
        return useVuelidate( this.rules, this );
    }
}