import Drop from 'tether-drop';

import classlist from '../helpers/classlist';
import ReceivesTargetedEvent from './ReceivesTargetedEvent';

export default {
    props: {
        id: String,
        trigger: Element,
        containFocus: {
            type: Boolean,
            default: true
        },
        dropdownPosition: {
            type: String,
            default: 'bottom left'
        },
        openOn: {
            type: String,
            default: 'click' // 'click', 'hover', 'focus', 'always'
        }
    },

    data() {
        return {
            drop: null,
            lastFocussedElement: null
        };
    },

    mounted() {
        this.$nextTick(() => {
            for(let event of ['open','close','toggle']){
                this.$on('ui-dropdown::'+event, this['ui-dropdown::'+event]);
            }
            if (this.trigger) {
                this.initializeDropdown();
            };
        });
    },

    beforeDestroy() {
        if (this.drop) {
            this.drop.remove();
            this.drop.destroy();
        }
        for(let event of ['open','close','toggle']){
            this.$off('ui-dropdown::'+event, this['ui-dropdown::'+event]);
        }
    },

    methods: {
        'ui-dropdown::open' (id) {
            // Abort if event isn't meant for this component
            if (!this.eventTargetsComponent(id)) {
                return;
            }

            this.openDropdown();
        },

        'ui-dropdown::close' (id) {
            // Abort if event isn't meant for this component
            if (!this.eventTargetsComponent(id)) {
                return;
            }

            this.closeDropdown();
        },

        'ui-dropdown::toggle' (id) {
            // Abort if event isn't meant for this component
            if (!this.eventTargetsComponent(id)) {
                return;
            }

            this.toggleDropdown();
        },

        initializeDropdown() {
            this.drop = new Drop({
                target: this.trigger,
                content: this.$refs.dropdown,
                position: this.dropdownPosition,
                constrainToWindow: true,
                openOn: this.openOn
            });

            // TO FIX: Hacky workaround for Tether not positioning
            // correctly for positions other than 'bottom left'
            if (this.dropdownPosition !== 'bottom left') {
                this.drop.open();
                this.drop.close();
                this.drop.open();
                this.drop.close();
            }

            this.drop.on('open', this.positionDrop);
            this.drop.on('open', this.dropdownOpened);
            this.drop.on('close', this.dropdownClosed);
        },

        openDropdown() {
            if (this.drop) {
                this.drop.open();
            }
        },

        /**
         * Ensures drop is horizontally within viewport (vertical is already solved by drop.js).
         * https://github.com/HubSpot/drop/issues/16
         */
        positionDrop() {
            const drop = this.drop;
            const windowWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

            let dropWidth = drop.drop.getBoundingClientRect().width;
            let left = drop.target.getBoundingClientRect().left;
            let availableSpace = windowWidth - left;

            if (dropWidth > availableSpace) {
                let direction = dropWidth > availableSpace ? 'right' : 'left';

                drop.tether.attachment.left = direction;
                drop.tether.targetAttachment.left = direction;

                drop.position();
            }
        },

        closeDropdown() {
            if (this.drop) {
                this.drop.close();
            }
        },

        toggleDropdown(e) {
            if (this.drop) {
                this.drop.toggle(e);
            }
        },

        dropdownOpened() {
            classlist.add(this.trigger, 'dropdown-open');

            this.lastFocussedElement = document.activeElement;
            this.$refs.dropdown.focus();

            this.$emit('dropdown-opened');
        },

        dropdownClosed() {
            classlist.remove(this.trigger, 'dropdown-open');

            if (this.lastFocussedElement) {
                this.lastFocussedElement.focus();
            }

            this.$emit('dropdown-closed');
        }
    },

    mixins: [
        ReceivesTargetedEvent
    ]
};
