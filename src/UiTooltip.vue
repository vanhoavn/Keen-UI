<template>
    <div class="ui-tooltip" v-text="content"></div>
</template>

<script>
import Tooltip from 'tether-tooltip';

export default {
    name: 'ui-tooltip',

    props: {
        content: String,
        trigger: {
            type: [Element, Function],
            required: false
        },
        position: {
            type: String,
            default: 'bottom center'
        },
        openOn: {
            type: String,
            default: 'hover focus'
        }
    },

    data() {
        return {
            tooltip: null,
            currentTrigger: null,
        };
    },

    computed: {
        triggerComputed() {
            if(this.trigger instanceof Function){
                return this.trigger();
            } else {
                return this.trigger;
            }
        }
    },

    watch: {
        trigger() {
            this.initialize(this.triggerComputed);
        }
    },

    mounted() {
        this.initialize(this.triggerComputed);
    },

    beforeDestroy() {
        this.destroyCurrentTooltip();
    },

    methods: {
        initialize(el) {
            if (el !== this.currentTrigger) {
                this.destroyCurrentTooltip();
            } else return;

            if (el) {
                this.tooltip = new Tooltip({
                    target: el,
                    content: this.$el,
                    classes: 'ui-tooltip-theme',
                    position: this.position,
                    openOn: 'hover focus'
                });
            }
        },
        destroyCurrentTooltip() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip.destroy();
                this.tooltip = null;
            };
            this.currentTrigger = null;
        },
    }
};
</script>

<style lang="stylus">
@import './styles/imports';
@require './styles/components/tooltip';

$tooltip-content-margin = 4px;

.ui-tooltip {
    line-height: 1;
}

.tooltip-element.ui-tooltip-theme {
    max-width: 100%;
    max-height: 100%;
    pointer-events: none;
    z-index: $z-index-tooltip;

    .tooltip-content {
        display: flex;
        align-items: center;

        position: relative;
        border-radius: 2px;
        padding: 0 8px;
        height: 26px;

        font-family: inherit;
        font-size: 13px;
        line-height: 1;

        background: $md-grey-900;
        opacity: 0.9;
        color: white;
    }

    &.tooltip-element-attached-bottom.tooltip-element-attached-center .tooltip-content {
        margin-bottom: $tooltip-content-margin;
    }

    &.tooltip-element-attached-top.tooltip-element-attached-center .tooltip-content {
        margin-top: $tooltip-content-margin;
    }

    &.tooltip-element-attached-right.tooltip-element-attached-middle .tooltip-content {
        margin-right: $tooltip-content-margin;
    }

    &.tooltip-element-attached-left.tooltip-element-attached-middle .tooltip-content {
        margin-left: $tooltip-content-margin;
    }

    &.tooltip-element-attached-top.tooltip-element-attached-left.tooltip-target-attached-bottom .tooltip-content {
        margin-top: $tooltip-content-margin;
    }

    &.tooltip-element-attached-top.tooltip-element-attached-right.tooltip-target-attached-bottom .tooltip-content {
        margin-top: $tooltip-content-margin;
    }

    &.tooltip-element-attached-bottom.tooltip-element-attached-left.tooltip-target-attached-top .tooltip-content {
        margin-bottom: $tooltip-content-margin;
    }

    &.tooltip-element-attached-bottom.tooltip-element-attached-right.tooltip-target-attached-top .tooltip-content {
        margin-bottom: $tooltip-content-margin;
    }

    &.tooltip-element-attached-top.tooltip-element-attached-right.tooltip-target-attached-left .tooltip-content {
        margin-right: $tooltip-content-margin;
    }

    &.tooltip-element-attached-top.tooltip-element-attached-left.tooltip-target-attached-right .tooltip-content {
        margin-left: $tooltip-content-margin;
    }

    &.tooltip-element-attached-bottom.tooltip-element-attached-right.tooltip-target-attached-left .tooltip-content {
        margin-right: $tooltip-content-margin;
    }

    &.tooltip-element-attached-bottom.tooltip-element-attached-left.tooltip-target-attached-right .tooltip-content {
        margin-left: $tooltip-content-margin;
    }
}
</style>
