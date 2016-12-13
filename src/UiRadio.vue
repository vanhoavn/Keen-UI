<template>
    <label
        class="ui-radio"
        :class="{ 'disabled': disabled, 'checked': active, 'label-left': labelLeft }"
    >
        <div class="ui-radio-input-wrapper">
            <input
                class="ui-radio-input" type="radio" :id="id" :name="name" :value="value"
                @focus="focus" @blur="blur" v-model="currentModel" v-disabled="disabled"
            >

            <span class="ui-radio-border"></span>
            <span class="ui-radio-inner-dot"></span>
        </div>

        <div class="ui-radio-label-text" v-if="!hideLabel">
            <slot>
                <span v-text="label"></span>
            </slot>
        </div>
    </label>
</template>

<script>
import disabled from './directives/disabled';

export default {
    name: 'ui-radio',

    props: {
        id: String,
        name: String,
        model: {
            type: String,
            default: ''
        },
        value: String,
        label: String,
        hideLabel: {
            type: Boolean,
            default: false
        },
        labelLeft: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    watches: {
        model() {
            this.currentModel = this.model;
        },
        currentModel() {
            this.$emit('input',this.currentModel);
        },
    },

    data() {
        return {
            active: false,
            currentModel: this.model
        };
    },

    methods: {
        focus() {
            this.active = true;

            this.$emit('focussed');
        },

        blur() {
            this.active = false;

            this.$emit('blurred');
        }
    },

    directives: {
        disabled
    }
};
</script>

<style lang="stylus">
@import './styles/imports';

$size = 20px;
$border-width = 2px;
$transition-duration = 0.3s;

.ui-radio {
    font-family: $font-stack;
    display: flex;
    align-items: center;
    height: $size;
    font-size: 15px;
    margin: 0;

    &:hover:not(.disabled) {
        .ui-radio-input:not(:checked) {
            & ~ .ui-radio-border {
                border: $border-width solid $md-dark-secondary;
            }
        }
    }

    &.label-left {
        .ui-radio-label-text {
            order: -1;
            margin-right: auto;
            margin-left: 0;
        }
    }

    &.disabled {
        opacity: 0.5;
    }

    &:not(.disabled) {
        .ui-radio-label-text {
            cursor: pointer;
        }
    }
}

.ui-radio-input-wrapper {
    position: relative;
    width: $size;
    height: $size;
}

.ui-radio-input {
    appearance: none;
    outline: none;
    margin: 0;
    padding: 0;

    position: absolute;
    height: 1px;
    width: 1px;
    left: 0;
    top: 0;

    opacity: 0;

    &:checked {
        & ~ .ui-radio-border {
            border-color: $md-brand-primary;
        }

        & ~ .ui-radio-inner-dot {
            background-color: $md-brand-primary;
            transform: scale(0.5);
            opacity: 1;
            z-index: 0;
        }
    }
}

.ui-radio-border {
    position: absolute;
    top: 0;
    left: 0;

    width: $size;
    height: $size;
    border-radius: 50%;
    border: $border-width solid $md-dark-hint;
    background-color: transparent;

    transition: border-color 0.2s;
}

.ui-radio-inner-dot {
    position: absolute;
    top: 0;
    left: 0;

    width: $size;
    height: $size;
    border-radius: 50%;

    background-color: $md-dark-hint;

    opacity: 0;
    z-index: -1;
    transform: scale(1.2);

    transition-property: transform, opacity, background-color;
    transition-duration: $transition-duration;
}

.ui-radio-label-text {
    margin-left: 16px;
    font-size: 15px;
}
</style>
