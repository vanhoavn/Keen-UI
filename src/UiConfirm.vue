<template>
    <div class="ui-confirm">
        <ui-modal role="alertdialog" :header="header" @opened="opened" show-close-button
            :dismissible="!loading" :backdrop-dismissible="backdropDismissible"
        >
            <div class="ui-confirm-message">
                <slot></slot>
            </div>

            <div slot="footer">
                <ui-button
                    :color="type" :text="confirmButtonText" :icon="confirmButtonIcon"
                    @click="confirm" :loading="loading" ref="confirm-button"
                ></ui-button>

                <ui-button
                    :text="denyButtonText" :icon="denyButtonIcon" @click="deny"
                    :disabled="loading" ref="deny-button"
                ></ui-button>
            </div>
        </ui-modal>
    </div>
</template>

<script>
import classlist from './helpers/classlist';

import UiModal from './UiModal.vue';
import UiButton from './UiButton.vue';

export default {
    name: 'ui-confirm',

    props: {
        show: {
            type: Boolean,
            required: true
        },
        type: {
            type: String,
            default: 'primary', // any of the color prop values of UiButton
        },
        header: {
            type: String,
            default: 'UiConfirm'
        },
        confirmButtonText: {
            type: String,
            default: 'OK'
        },
        confirmButtonIcon: String,
        denyButtonText: {
            type: String,
            default: 'Cancel'
        },
        denyButtonIcon: String,
        autofocus: {
            type: String,
            default: 'deny-button', // 'confirm-button', 'deny-button' or 'none'
        },
        closeOnConfirm: {
            type: Boolean,
            default: false
        },
        backdropDismissible: {
            type: Boolean,
            default: true
        },
        loading: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        confirm() {
            this.$emit('confirmed');

            if (this.closeOnConfirm) {
                this.show = false;
            }
        },

        deny() {
            this.show = false;
            this.$emit('denied');
        },

        opened() {
            let button;

            if (this.autofocus === 'confirm-button') {
                button = this.$refs.confirmButton;
            } else if (this.autofocus === 'deny-button') {
                button = this.$refs.denyButton;
            }

            if (button) {
                classlist.add(button, 'autofocus');
                button.addEventListener('blur', this.removeAutoFocus);

                button.focus();
            }

            // Bubble event up
            return true;
        },

        removeAutoFocus() {
            let button;

            if (this.autofocus === 'confirm-button') {
                button = this.$refs.confirmButton;
            } else if (this.autofocus === 'deny-button') {
                button = this.$refs.denyButton;
            }

            if (button) {
                // This listener should run only once
                button.removeEventListener('blur', this.removeAutoFocus);

                classlist.remove(button, 'autofocus');
            }
        }
    },

    components: {
        UiModal,
        UiButton
    }
};
</script>

<style lang="stylus">
@import './styles/imports';

.ui-confirm-message {
    font-family: $font-stack;
    font-size: 15px;
}
</style>
