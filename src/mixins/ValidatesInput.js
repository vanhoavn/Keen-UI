import Validator from 'validatorjs';

export default {
    props: {
        hideValidationErrors: {
            type: Boolean,
            default: false
        },
        validationRules: [String, Array],
        validationMessages: Object
    },

    data() {
        return {
            validationError: '',
            valid: true,
            dirty: false,
        };
    },

    mounted() {
        this.$nextTick(() => {
            for(let event of ['set-validity']){
                this.$on('ui-input::'+event, this['ui-input::'+event]);
            }
        });
    },

    beforeDestroy() {
        for(let event of ['set-validity']){
            this.$off('ui-input::'+event, this['ui-input::'+event]);
        }
    },

    methods: {
        'ui-input::set-validity': function(valid, error, id) {
            // Abort if event isn't meant for this component
            if (!this.eventTargetsComponent(id)) {
                return;
            }

            this.setValidity(valid, error);
        },
        validate() {
            if (!this.validationRules || !this.dirty) {
                return;
            }

            let data = {
                value: this.currentValue
            };

            let rules = {
                value: this.validationRules
            };

            let validation = new Validator(data, rules, this.validationMessages);

            validation.setAttributeNames({ value: this.name.replace(/_/g, ' ') });

            this.setValidity(validation.passes(), validation.errors.first('value'));
        },

        setValidity(valid, error) {
            this.valid = valid;

            if (!valid && error && error.length) {
                this.validationError = error;
            }
        }
    }
};
