<template>
    <div
        class="ui-modal ui-modal-mask" v-show="show" :transition="transition" :class="[typeComputed]"
        :role="role" @transitionend="transitionEnd"
    >
        <div class="ui-modal-wrapper" @click="close" ref="modal-mask">
            <div
                class="ui-modal-container" tabindex="-1" @keydown.esc="close"
                ref="modal-container"
            >
                <div class="ui-modal-header">
                    <slot name="header">
                        <h1 v-text="header" class="ui-modal-header-text"></h1>
                    </slot>

                    <ui-icon-button
                        type="clear" :icon="'\ue5cd'" class="ui-modal-close-button" @click="close"
                        :disabled="!dismissible" v-if="showCloseButton" ref="close-button"
                    ></ui-icon-button>
                </div>

                <div class="ui-modal-body">
                    <slot>
                        <div v-text="body"></div>
                    </slot>
                </div>

                <div class="ui-modal-footer" v-if="!hideFooter">
                    <slot name="footer">
                        <ui-button @click="close" v-if="dismissible">Close</ui-button>
                    </slot>
                </div>

                <div class="focus-redirector" @focus="redirectFocus" tabindex="0"></div>
            </div>
        </div>
    </div>
</template>

<script>
import classlist from './helpers/classlist';

import UiIconButton from './UiIconButton.vue';
import UiButton from './UiButton.vue';

import _ from 'lodash';
var inFocusFunction = false;

export default {
    name: 'ui-modal',

    props: {
        type: {
            type: String,
            default: 'normal', // 'small', 'normal', or 'large'
        },
        header: {
            type: String,
            default: 'UiModal Header'
        },
        body: {
            type: String,
            default: 'UiModal body'
        },
        role: {
            type: String,
            default: 'dialog', // 'dialog' or 'alertdialog'
        },
        transition: {
            type: String,
            default: 'ui-modal-scale', // 'ui-modal-scale', or 'ui-modal-fade'
        },
        showCloseButton: {
            type: Boolean,
            default: true
        },
        hideFooter: {
            type: Boolean,
            default: false
        },
        dismissible: {
            type: Boolean,
            default: true
        },
        backdropDismissible: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            show: false,
            lastFocussedElement: null
        };
    },

    watch: {
        show() {
            this.$nextTick(() => {
                if (this.show) {
                    this.opened();
                } else {
                    this.closed();
                }
            });
        }
    },

    computed: {
        typeComputed() {
            return 'ui-modal-' + this.type;
        }
    },

    methods: {
        close(e) {
            if (!this.dismissible) {
                return;
            }

            // Make sure the element clicked was the modal mask and not a child
            // whose click event has bubbled up
            if (e.currentTarget === this.$refs['modal-mask'] && e.target !== e.currentTarget) {
                return;
            }

            // Don't close if this event was triggered by the modal mask
            // and this.backdropDismissible is false
            if (e.currentTarget === this.$refs['modal-mask'] && !this.backdropDismissible) {
                return;
            }

            this.show = false;
        },

        opened() {
            this.lastFocussedElement = document.activeElement;
            this.$refs['modal-container'].focus();

            classlist.add(document.body, 'ui-modal-open');

            document.addEventListener('focus', this.restrictFocus, true);

            this.$emit('opened');
        },

        closed() {
            this.tearDown();
            this.$emit('closed');
        },

        redirectFocus(e) {
            e.stopPropagation();

            this.$refs['modal-container'].focus();
        },

        restrictFocus(e) {
            if (inFocusFunction) return;
            inFocusFunction = true;
            if (!this.$refs['modal-container'].contains(e.target)) {
                e.stopPropagation();
                this.$refs['modal-container'].focus();
            }
            inFocusFunction = false;
        },

        tearDown() {
            classlist.remove(document.body, 'ui-modal-open');

            document.removeEventListener('focus', this.restrictFocus, true);

            if (this.lastFocussedElement) {
                this.lastFocussedElement.focus();
            }
        },

        transitionEnd() {
            return  _.debounce(() => {
                if (this.show) {
                    this.$emit('revealed');
                } else {
                    this.$emit('hidden');
                }
            }, 100);
        }
    },

    components: {
        UiIconButton,
        UiButton
    }
};
</script>

<style lang="stylus">
@import './styles/imports';

$transition-duration = 0.2s;

.ui-modal {
    font-family: $font-stack;
    font-size: 14px;

    &.ui-modal-small {
        .ui-modal-container {
            width: 320px;
        }
    }
}

body.ui-modal-open {
    overflow: hidden;
}

.ui-modal-mask {
    position: fixed;
    z-index: $z-index-modal;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: alpha(black, 0.5);
    display: table;
    transition: opacity $transition-duration ease;
}

.ui-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.ui-modal-container {
    outline: none;
    width: 528px;
    margin: 0px auto;
    padding: 0;
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 2px 8px alpha(black, 0.33);
    transition: all $transition-duration ease;

    max-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
}

.ui-modal-header {
    display: flex;
    align-items: center;
    padding: 24px 24px 8px;

    .ui-modal-header-text {
        flex-grow: 1;
        font-size: 22px;
        display: flex;
        align-items: center;
        margin: 0;
        font-weight: normal;
    }

    .ui-modal-close-button {
        margin-top: -12px;
        margin-right: -8px;
        margin-left: auto;

        &:hover:not([disabled]),
        body[modality="keyboard"] &:focus {
            .ui-icon {
                color: alpha(black, 0.8);
            }
        }

        .ui-icon {
            font-size: 20px;
            color: alpha(black, 0.4);
        }

        &[disabled] {
            opacity: 0.5;
        }
    }
}

.ui-modal-body {
    padding: 16px 24px 24px;
}

.ui-modal-footer {
    margin-top: -8px;
    padding: 24px;
    padding-top: 8px;

    &,
    [slot] {
        display: flex;
        justify-content: flex-end;
    }

    .ui-modal-footer-left,
    [slot].ui-modal-footer-left {
        justify-content: flex-start;
    }

    .ui-button {
        margin-left: 8px;

        &:first-child {
            margin-left: 0;
        }
    }
}

.ui-modal-fade-enter,
.ui-modal-fade-leave {
    opacity: 0;
}

.ui-modal-scale-enter,
.ui-modal-scale-leave {
    opacity: 0;
}

.ui-modal-scale-enter .ui-modal-container,
.ui-modal-scale-leave .ui-modal-container {
    transform: scale(1.1);
}
</style>
