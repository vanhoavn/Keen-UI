<template>
    <div
        class="ui-tab" :id="id" role="tabpanel" :tabindex="active ? '0' : null"
        :aria-hidden="!active ? 'true' : null" v-show="active"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ui-tab',

    props: {
        id: String,
        header: String,
        icon: String,
        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        active() {
            return this.$parent.activeTab === this.id;
        }
    },

    watch: {
        active() {
            if (this.active) {
                this.$emit('selected', this.id);
            } else {
                this.$emit('deselected', this.id);
            }
        }
    }
};
</script>

<style lang="stylus">
@import './styles/imports';

.ui-tab {
    outline: none;
}
</style>
