<template>
    <div class="ui-collapsible">
        <button
            class="ui-collapsible-header" :class="{ 'disabled': disabled }" :aria-controls="id"
            :aria-expanded="open ? 'true' : 'false'" @click="toggleMenu" v-disabled="disabled"
            ref="button"
        >
            <div class="ui-collapsible-header-content">
                <slot name="header">
                    <div v-text="header"></div>
                </slot>
            </div>

            <ui-icon class="ui-collapsible-header-icon" :icon="icon" v-if="!hideIcon"></ui-icon>

            <ui-ripple-ink
                v-if="!hideRippleInk && !disabled && isReady" :trigger="() => $refs.button"
            ></ui-ripple-ink>
        </button>

        <div
            class="ui-collapsible-body-wrapper" :transition="transition"
            :style="{ 'height': calculatedHeight }" v-show="currentOpen"ref="body"
        >
            <div class="ui-collapsible-body" :id="rid" :aria-hidden="currentOpen ? null : 'true'">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

import UUID from './helpers/uuid';
import disabled from './directives/disabled';

import ShowsRippleInk from './mixins/ShowsRippleInk';
import ReceivesTargetedEvent from './mixins/ReceivesTargetedEvent';

export default {
    name: 'ui-collapsible',

    props: {
        id: String,
        open: {
            type: Boolean,
            default: false
        },
        header: String,
        transition: {
            type: String,
            default: 'ui-collapsible-toggle'
        },
        hideIcon: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            height: 0,
            isReady: false,
            rid: this.id,
            currentOpen: this.open,
        };
    },

    computed: {
        icon() {
            return this.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
        },

        calculatedHeight() {
            if (this.height === 0) {
                return 'initial';
            }

            return this.height + 'px';
        }
    },

    watch: {
        currentOpen() {
            this.$emit('toggled', this.currentOpen);
        },
        open() {
            if(this.open != this.currentOpen){
                this.currentOpen = this.open;
            }
        },
    },

    created() {
        // Set default ID
        this.rid = this.id || UUID.short('ui-collapsible-');
    },

    ready() {
        this.isReady = true;
        this.setHeight();
    },

    mounted() {
        this.$nextTick(() => {
            for(let event of ['reset']){
                this.$on('ui-input::'+event, this['ui-input::'+event]);
            }
        });
    },

    beforeDestroy() {
        for(let event of ['reset']){
            this.$off('ui-input::'+event, this['ui-input::'+event]);
        }
    },

    methods: {
        'ui-collapsible::refresh-height': function(id) {
            // Abort if refresh event isn't meant for this component
            if (!this.eventTargetsComponent(id)) {
                return;
            }

            this.$nextTick(this.setHeight);
        },
        
        toggleMenu() {
            if (this.disabled) {
                return;
            }

            this.currentOpen = !this.currentOpen;
        },

        setHeight() {
            var body = this.$refs.body;

            body.style.display = 'block';
            this.height = body.scrollHeight;

            if (!this.currentOpen) {
                body.style.display = 'none';
            }
        }
    },

    components: {
        UiIcon
    },

    directives: {
        disabled
    },

    mixins: [
        ShowsRippleInk,
        ReceivesTargetedEvent
    ],

    transitions: {
        'ui-collapsible-toggle': {
            afterEnter() {
                this.$emit('opened');
                this.setHeight();
            },

            afterLeave() {
                this.$emit('closed');
            }
        }
    }
};
</script>

<style lang="stylus">
@import './styles/imports';

.ui-collapsible {
    font-family: $font-stack;
    width: 100%;
    margin-bottom: 8px;
}

.ui-collapsible-header {
    position: relative;

    margin: 0;
    width: 100%;
    border: none;
    line-height: 1;
    text-align: left;
    font-family: $font-stack;

    display: flex;
    height: 0; // IE
    min-height: 48px;
    padding: 8px 16px;
    align-items: center;
    touch-action: manipulation; // IE

    cursor: pointer;
    font-size: 16px;
    background-color: $md-grey-200;

    &:hover:not(.disabled),
    body[modality="keyboard"] &:focus {
        background-color: $md-grey-300;
    }

    &.disabled {
        opacity: 0.6;
        cursor: default;

        .ui-icon {
            cursor: default;
        }
    }

    .ui-icon {
        cursor: pointer;
    }

    .ui-ripple-ink .ripple.held {
        opacity: 0.01;
    }
}

.ui-collapsible-header-content {
    @extends $truncate-text;
    line-height: 1.25em;
}

.ui-collapsible-header-icon {
    margin-left: auto;
    margin-right: -4px;
    color: $md-dark-secondary;
}

.ui-collapsible-body-wrapper {
    overflow: hidden;
    height: initial;
}

.ui-collapsible-body {
    width: 100%;
    padding: 16px;
    display: block;
    border: 1px solid $md-grey-200;
    border-top: 0;
}

.ui-collapsible-toggle-transition {
    transition: height 0.2s ease;
}

.ui-collapsible-toggle-enter,
.ui-collapsible-toggle-leave {
    height: 0!important;
}
</style>
