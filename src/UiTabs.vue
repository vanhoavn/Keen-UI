<template>
    <div class="ui-tabs" :class="styleClasses">
        <div class="ui-tabs-header" :class="[backgroundColorComputed]">
            <ul
                class="ui-tabs-header-items" :class="[textColorComputed, textColorActiveComputed]" role="tablist"
                ref="tabs-container"
            >
                <div :is="TabHeaderItem"
                    :type="type" :id="tab.id" :icon="tab.icon" :text="tab.header"
                    :active="activeTab === tab.id" :disabled="tab.disabled"
                    :hide-ripple-ink="hideRippleInk"

                    @click="select($event, tab)" @keydown.left="selectPrev(index)"
                    @keydown.right="selectNext($index)"

                    v-for="(tab, index) in children" ref="tab-elements"
                ></div>
            </ul>

            <div
                class="ui-tabs-active-tab-indicator" :class="[indicatorColorComputed]"
                :style="{ 'left': indicatorLeft, 'right': indicatorRight }"
            ></div>
        </div>

        <div class="ui-tabs-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import UUID from './helpers/uuid';

import UiTabHeaderItem from './UiTabHeaderItem.vue';

import disabled from './directives/disabled';
import ReceivesTargetedEvent from './mixins/ReceivesTargetedEvent';

export default {
    name: 'ui-tabs',

    props: {
        type: {
            type: String,
            default: 'text', // 'text', 'icon', or 'icon-and-text'
        },
        activeTab: String,
        TabHeaderItem: {
            default: UiTabHeaderItem,
        },
        backgroundColor: {
            type: String,
            default: 'default', // 'default', 'primary', 'accent', or 'clear'
        },
        textColor: {
            type: String,
            default: 'black', // 'black', or 'white'
        },
        textColorActive: {
            type: String,
            default: 'primary', // 'primary', 'accent', or 'white'
        },
        indicatorColor: {
            type: String,
            default: 'primary', // 'primary', 'accent', or 'white'
        },
        fullwidth: {
            type: Boolean,
            default: false
        },
        raised: {
            type: Boolean,
            default: false
        },
        hideRippleInk: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            activeTabElement: null
        };
    },

    computed: {
        backgroundColorComputed() {
            return 'background-color-' + this.backgroundColor;
        },
        textColorComputed() {
            return 'text-color-' + this.textColor;
        },
        textColorActiveComputed() {
            return 'text-color-active-' + this.textColorActive;
        },
        indicatorColorComputed() {
            return 'color-' + this.indicatorColor;
        },
        styleClasses() {
            let classes = ['ui-tabs-type-' + this.type];

            if (this.raised) {
                classes.push('raised');
            }

            if (this.fullwidth) {
                classes.push('fullwidth');
            }

            return classes;
        },

        indicatorLeft() {
            if (this.activeTabElement) {
                return this.activeTabElement.offsetLeft + 'px';
            }

            return 0;
        },

        indicatorRight() {
            if (this.activeTabElement) {
                let left = this.activeTabElement.offsetLeft;
                let width = this.activeTabElement.offsetWidth;
                let tabContainerWidth = this.$refs['tabs-container'].offsetWidth;

                return (tabContainerWidth - (left + width)) + 'px';
            }
        },

        children() {
            return this.$children.filter( (x) => x.visible );
        },
    },

    ready() {
        // Setup default ids
        for (let i = 0; i < this.$children.length; i++) {
            this.$children[i].id = this.$children[i].id || UUID.short('ui-tab-');
        }

        // Set the active tab
        this.activeTab = this.activeTab || this.$children[0].id;

        // Set the active tab element (to show indicator)
        this.$nextTick(() => {
            if (this.$refs['tabs-container']) {
                this.activeTabElement = this.$refs['tabs-container'].querySelector('.active');
            }
        });
    },

    mounted() {
        this.$nextTick(() => {
            for(let event of ['select']){
                this.$on('ui-tabs::'+event, this['ui-tabs::'+event]);
            }
        });
    },

    beforeDestroy() {
        for(let event of ['select']){
            this.$off('ui-tabs::'+event, this['ui-tabs::'+event]);
        }
    },

    methods: {
        'ui-tabs::select': function(tabId, id) {
            // Abort if event isn't meant for this component
            if (!this.eventTargetsComponent(id)) {
                return;
            }

            let tab = this.findTabById(tabId);

            if (tab) {
                this.select(tab.$el, tab);
            }
        },

        select(e, tab) {
            // e can be Element (if called by selectPrev or selectNext) or Event
            // (if called by click listener)
            let newTabElement = e.currentTarget ? e.currentTarget : e;

            if (tab.disabled || this.activeTabElement === newTabElement) {
                return;
            }

            this.activeTabElement = newTabElement;
            this.activeTab = tab.id;

            this.$emit('active-tab-changed', tab.id);
        },

        selectPrev(currentTabIndex) {
            // Abort if the current tab is the first tab
            if (currentTabIndex === 0) {
                return;
            }

            let prevTab = this.findTab(currentTabIndex);
            this.select(prevTab.$el, prevTab);

            this.activeTabElement.focus();
        },

        selectNext(currentTabIndex) {
            // Abort if the current tab is the last tab
            if (currentTabIndex === this.$refs['tab-elements'].length - 1) {
                return;
            }

            let nextTab = this.findTab(currentTabIndex, true);
            this.select(nextTab.$el, nextTab);

            this.activeTabElement.focus();
        },

        findTab(currentTabIndex, next) {
            let tab;

            if (next) {
                for (let i = currentTabIndex + 1; i < this.$refs['tab-elements'].length; i++) {
                    if (!this.$refs['tab-elements'][i].disabled) {
                        tab = this.$refs['tab-elements'][i];
                        break;
                    }
                }
            } else {
                for (let i = currentTabIndex - 1; i >= 0; i--) {
                    if (!this.$refs['tab-elements'][i].disabled) {
                        tab = this.$refs['tab-elements'][i];
                        break;
                    }
                }
            }

            tab = tab || this.$refs['tab-elements'][currentTabIndex];

            return tab;
        },

        findTabById(id) {
            let tab = null;

            let numOfTabs = this.$refs['tab-elements'].length;

            for (let i = 0; i <= numOfTabs; i++) {
                if (id === this.$refs['tab-elements'][i].id) {
                    tab = this.$refs['tab-elements'][i];
                    break;
                }
            }

            return tab;
        }
    },

    components: {
        UiTabHeaderItem
    },

    directives: {
        disabled
    },

    mixins: [
        ReceivesTargetedEvent
    ]
};
</script>

<style lang="stylus">
@import './styles/imports';

.ui-tabs {
    width: 100%;
    margin-bottom: 24px;

    &.fullwidth {
        .ui-tab-header-item {
            flex-grow: 1;
        }
    }

    &.raised {
        border: none;
        box-shadow: 0 0 2px alpha(black, 0.12), 0 2px 2px alpha(black, 0.2);

        .ui-tabs-body {
            border: none;
        }
    }
}

.ui-tabs-header {
    position: relative;
    width: 100%;

    &.background-color-default {
        background-color: $md-grey-200;

        .ui-tab-header-item {
            body[modality="keyboard"] &:focus {
                outline: 1px solid $md-brand-primary;
            }
        }
    }

    &.background-color-primary,
    &.background-color-accent,
    &.background-color-clear {
        .ui-tab-header-item {
            body[modality="keyboard"] &:focus {
                outline: 1px solid white;
            }

            .ui-ripple-ink .ripple.held {
                opacity: 0.7;
            }
        }
    }

    &.background-color-primary {
        background-color: $md-brand-primary;
    }

    &.background-color-accent {
        background-color: $md-brand-accent;
    }

    &.background-color-clear {
        background-color: transparent;
    }
}

.ui-tabs-header-items {
    position: relative;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    &.text-color-black {
        color: alpha(black, 0.54);

        .ui-tab-header-item-icon {
            color: alpha(black, 0.54);
        }
    }

    &.text-color-white {
        color: alpha(white, 0.65);

        .ui-tab-header-item-icon {
            color: alpha(white, 0.65);
        }
    }

    &.text-color-active-primary {
        .ui-tab-header-item.active {
            color: $md-brand-primary;

            .ui-tab-header-item-icon {
                color: $md-brand-primary;
            }
        }
    }

    &.text-color-active-accent {
        .ui-tab-header-item.active {
            color: $md-brand-accent;

            .ui-tab-header-item-icon {
                color: $md-brand-accent;
            }
        }
    }

    &.text-color-active-white {
        .ui-tab-header-item.active {
            color: white;

            .ui-tab-header-item-icon {
                color: white;
            }
        }
    }
}

.ui-tabs-active-tab-indicator {
    position: absolute;
    height: 2px;
    bottom: 0;

    transition: all 0.2s ease;
    box-shadow: 0 -1px 2px alpha(black, 0.05);

    &.color-primary {
        background-color: $md-brand-primary;
    }

    &.color-accent {
        background-color: $md-brand-accent;
    }

    &.color-white {
        background-color: white;
    }
}

.ui-tabs-body {
    background-color: white;
    border-radius: 0;
    border: 1px solid $md-grey-200;
    border-top: 0;
    padding: 16px;
    margin: 0;
}
</style>
