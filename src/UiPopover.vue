<template>
    <div
        class="ui-popover" role="dialog" tabindex="-1" @keydown.esc="closeDropdown" ref="dropdown"
    >
        <slot></slot>
    </div>
</template>

<script>
import ShowsDropdown from './mixins/ShowsDropdown';
var inFocusFunction = false;

export default {
    name: 'ui-popover',

    mounted() {
        for(let event of ['opened', 'closed']){
            this.$on('dropdown-'+event, this['dropdown-'+event]);
        }
    },

    beforeDestroy() {
        for(let event of ['opened', 'closed']){
            this.$off('dropdown-'+event, this['dropdown-'+event]);
        }
    },

    methods: {
        'dropdown-opened': function() {
            if (this.containFocus) {
                document.addEventListener('focus', this.restrictFocus, true);
            }

            this.$emit('opened');

            // Bubble the event up
            return true;
        },

        'dropdown-closed': function() {
            if (this.containFocus) {
                document.removeEventListener('focus', this.restrictFocus, true);
            }

            this.$emit('closed');

            // Bubble the event up
            return true;
        },
        
        restrictFocus(e) {
            if (inFocusFunction) return;
            inFocusFunction = true;
            if (! this.$refs.dropdown.contains(e.target)) {
                e.stopPropagation();

                this.$refs.dropdown.focus();
            }
            inFocusFunction = false;
        }
    },

    mixins: [
        ShowsDropdown
    ]
};
</script>

<style lang="stylus">
@import './styles/imports';

.ui-popover {
    padding: 16px;
    outline: none;

    background-color: white;
    box-shadow: 0 2px 4px -1px alpha(black, 0.3),
                0 4px 5px 0 alpha(black, 0.15),
                0 1px 10px 0 alpha(black, 0.13);
}
</style>
